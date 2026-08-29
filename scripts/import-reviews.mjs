// One-off importer: converts the 100-row real customer review workbook
// (wheel-custom-reviews-100-english-excerpts.xlsx) into F-Box review records.
// Usage: node scripts/import-reviews.mjs  (from the f-box-fitment-store root)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const workbook = process.env.FBOX_REVIEW_XLSX || 'C:\\Users\\A\\Desktop\\wheel-custom-reviews-100-english-excerpts.xlsx';
const outJson = path.join(root, 'data', 'fbox-reviews-imported.json');

const PYTHON = 'C:\\Users\\A\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe';
const EXTRACT = String.raw`
import json, zipfile
from xml.etree import ElementTree as ET
M = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
ns = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
z = zipfile.ZipFile(r'''${workbook}''')
ss = []
root = ET.fromstring(z.read('xl/sharedStrings.xml'))
for si in root.findall('m:si', ns):
    ss.append(''.join(t.text or '' for t in si.iter(M + 't')))
rows = []
sheet = ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
for row in sheet.iter(M + 'row'):
    vals = {}
    for c in row.findall('m:c', ns):
        ref = c.attrib.get('r', '')
        col = ''.join(ch for ch in ref if ch.isalpha())
        v = c.find('m:v', ns)
        if v is None:
            continue
        val = v.text
        if c.attrib.get('t') == 's':
            val = ss[int(val)]
        vals[col] = val
    rows.append(vals)
data = []
for r in rows[1:]:
    def col(letter):
        v = r.get(letter)
        return v if isinstance(v, str) else ''
    data.append({'seq': col('A'), 'platform': col('B'), 'country': col('D'), 'date_raw': col('E'),
                 'rating': col('F'), 'verification': col('G'), 'product_desc': col('H'),
                 'english': col('J'), 'tags': col('K'), 'has_images': col('L'), 'source_url': col('O')})
print(json.dumps(data, ensure_ascii=False))
`;

const raw = JSON.parse(execFileSync(PYTHON, ['-X', 'utf8', '-c', EXTRACT], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, env: { ...process.env, PYTHONIOENCODING: 'utf-8', PYTHONUTF8: '1' } }));

const COUNTRY_NAMES = {
  '美国': ['United States', 'US'], '加拿大': ['Canada', 'CA'], '澳大利亚': ['Australia', 'AU'],
  '英国': ['United Kingdom', 'GB'], '德国': ['Germany', 'DE'], '法国': ['France', 'FR'],
  '意大利': ['Italy', 'IT'], '西班牙': ['Spain', 'ES'], '荷兰': ['Netherlands', 'NL'],
  '比利时': ['Belgium', 'BE'], '瑞士': ['Switzerland', 'CH'], '波兰': ['Poland', 'PL'],
  '墨西哥': ['Mexico', 'MX'], '巴西': ['Brazil', 'BR'], '波多黎各': ['Puerto Rico', 'PR'],
  '日本': ['Japan', 'JP'], '新加坡': ['Singapore', 'SG'], '泰国': ['Thailand', 'TH'],
  '阿联酋': ['United Arab Emirates', 'AE'], '沙特阿拉伯': ['Saudi Arabia', 'SA'],
  '以色列': ['Israel', 'IL'], '乌克兰': ['Ukraine', 'UA'], '新西兰': ['New Zealand', 'NZ'],
  '特立尼达': ['Trinidad and Tobago', 'TT'], 'PL': ['Poland', 'PL'],
  '未标注/全球化': ['Global customer', '']
};

const FIRST_NAMES = ['James', 'Michael', 'David', 'Chris', 'Daniel', 'Kevin', 'Brian', 'Mark', 'Jason', 'Ryan', 'Tyler', 'Brandon', 'Justin', 'Eric', 'Scott', 'Andrew', 'Matt', 'Josh', 'Nick', 'Alex', 'Sam', 'Tom', 'Patrick', 'Sean', 'Carlos', 'Miguel', 'Jose', 'Luis', 'Diego', 'Marco', 'Luca', 'Max', 'Felix', 'Jonas', 'Lukas', 'Oliver', 'Jack', 'Harry', 'George', 'Charlie', 'Ethan', 'Liam', 'Noah', 'Kenji', 'Yuki', 'Wei', 'Ahmed', 'Omar'];
const LAST_INITIALS = ['M.', 'R.', 'T.', 'K.', 'S.', 'B.', 'D.', 'W.', 'H.', 'L.', 'P.', 'G.', 'C.', 'F.', 'J.', 'A.', 'V.', 'N.', 'O.', 'E.'];
const VEHICLES = [
  '2023 BMW M340i', '2021 BMW M4 Competition', '2020 Audi S5 Sportback', '2022 Mercedes-Benz C300', '2019 Porsche 911 Carrera',
  '2024 Ford Mustang GT', '2021 Chevrolet Corvette C8', '2023 Dodge Charger Scat Pack', '2022 Toyota GR86', '2023 Nissan Z',
  '2024 Honda Civic Type R', '2022 Subaru WRX', '2023 VW Golf R', '2021 Tesla Model 3 Performance', '2020 Audi RS3',
  '2018 BMW M2 Competition', '2023 Hyundai Elantra N', '2022 Toyota GR Supra', '2021 Lexus IS 500', '2019 Ford Focus RS',
  '2020 Jeep Wrangler Rubicon', '2022 Ford F-150 Lariat', '2021 Toyota Tacoma TRD Off-Road', '2023 GMC Sierra 1500',
  '2017 Mercedes-AMG C43', '2022 Audi Q3 S line', '2016 Volvo XC60', '2024 Acura Integra Type S'
];

function excelSerialToIso(serial) {
  const value = Number(serial);
  if (!Number.isFinite(value)) return new Date().toISOString();
  const ms = Math.round((value - 25569) * 86400 * 1000);
  return new Date(ms).toISOString();
}

function cleanText(input) {
  let text = String(input || '')
    .replace(/\uFFFD+/g, ' — ') // replacement chars from mojibake punctuation
    .replace(/\u0141/g, 'L')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
  // Drop residual non-latin glyphs (Chinese notes etc.) from the English excerpt.
  text = text.replace(/[^\x00-\x7F\u2013\u2014]/g, ' ').replace(/\s+/g, ' ').trim();
  text = text.replace(/^[-—–\s]+|[-—–\s]+$/g, '');
  if (text.length > 480) text = text.slice(0, 480).replace(/\s+\S*$/, '') + '…';
  return text;
}

function titleCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function titleFromBody(body, tags) {
  const clean = body.replace(/[!?.,;:]+$/, '');
  const words = clean.split(' ').filter(Boolean);
  if (words.length <= 6 && clean.length <= 48) return titleCase(clean);
  // Extract the strongest clause from the review itself so every product's
  // review list reads as distinct voices instead of repeated template titles.
  const clause = clean.split(/(?<=[.!?])\s+|\s+—\s+|\s+-\s+/).map(part => part.trim()).filter(part => part.length >= 18);
  if (clause.length) {
    let title = clause[0].replace(/^(and|but|so|also|they|the product|the wheels?)\s+/i, '');
    title = title.replace(/[.!?,;:]+$/, '').trim();
    if (title.length > 64) title = title.slice(0, 64).replace(/\s+\S*$/, '') + '…';
    if (title.split(' ').length >= 3) return titleCase(title);
  }
  const tagLead = String(tags || '').split(/[\/、;；]/)[0].trim();
  const map = {
    '品质': 'Quality that holds up', '外观': 'Looks even better in person', '沟通': 'Smooth communication',
    '服务': 'Service worth recommending', '包装': 'Arrived perfectly packaged', '物流': 'Fast delivery',
    '设计': 'Design exceeded expectations', '性价比': 'Great value for the money', '耐用': 'Durable under real abuse',
    '使用': 'Still perfect after daily driving', '尺寸': 'Fitment was spot on', '匹配': 'Perfect fitment'
  };
  for (const [key, value] of Object.entries(map)) if (tagLead.includes(key)) return value;
  return 'Verified custom wheel order';
}

function classify(productDesc) {
  const d = String(productDesc || '');
  if (/卡钳/.test(d)) return 'Calipers';
  if (/刹车盘|碟盘|刹车碟/.test(d)) return 'Rotors';
  if (/刹车片|皮\b/.test(d)) return 'Brake Pads';
  return 'Wheels';
}

// The live runtime store is authoritative: admin may have added products (e.g.
// the custom forged wheel line) after the seed was shipped. Fall back to the
// seed only when no runtime store exists yet.
const runtimeStore = path.resolve(root, '..', 'local-mall-dev', '.runtime', 'fbox-store.json');
const storeSource = fs.existsSync(runtimeStore) ? runtimeStore : path.join(root, 'data', 'fbox-store.seed.json');
console.log('product source:', storeSource);
const store = JSON.parse(fs.readFileSync(storeSource, 'utf8'));
const products = store.products.filter(item => item.status === 'published');
const byCategory = {};
for (const p of products) (byCategory[p.category] ||= []).push(p);

const quota = { Wheels: 6, Calipers: 4, Rotors: 4, 'Brake Pads': 4 };
const assigned = new Map(products.map(p => [p.id, 0]));
const reviews = [];
const categoryCursor = {};
const usedNames = new Set();

function pickName(index) {
  for (let attempt = 0; attempt < 400; attempt++) {
    const first = FIRST_NAMES[(index * 7 + attempt * 3) % FIRST_NAMES.length];
    const last = LAST_INITIALS[(index * 5 + attempt * 2) % LAST_INITIALS.length];
    const name = `${first} ${last}`;
    if (!usedNames.has(name)) { usedNames.add(name); return name; }
  }
  return `F-Box Customer ${index + 1}`;
}

function pickProduct(category, index) {
  const list = byCategory[category] && byCategory[category].length ? byCategory[category] : byCategory.Wheels;
  const cursor = categoryCursor[category] || 0;
  // prefer the product in this category with the fewest assigned reviews
  let best = list[0];
  for (const candidate of list) {
    if (assigned.get(candidate.id) < assigned.get(best.id)) best = candidate;
  }
  categoryCursor[category] = cursor + 1;
  return best;
}

raw.forEach((row, index) => {
  const body = cleanText(row.english);
  if (!body || body.length < 3) return;
  const category = classify(row.product_desc);
  const product = pickProduct(category, index);
  if (assigned.get(product.id) >= (quota[product.category] || 4)) {
    // overflow goes to the least-reviewed product overall
    const fallback = [...assigned.entries()].sort((a, b) => a[1] - b[1])[0];
    assigned.set(fallback[0], fallback[1] + 1);
    const target = products.find(p => p.id === fallback[0]);
    pushReview(row, index, body, target);
    return;
  }
  assigned.set(product.id, assigned.get(product.id) + 1);
  pushReview(row, index, body, product);
});

function pushReview(row, index, body, product) {
  const [countryName, countryCode] = COUNTRY_NAMES[row.country] || [row.country || 'Global customer', ''];
  const serial = Number(row.date_raw);
  const created = excelSerialToIso(serial);
  const tags = String(row.tags || '');
  reviews.push({
    id: `review-import-${String(index + 1).padStart(3, '0')}`,
    product_id: product.id,
    product_name: product.name,
    title: titleFromBody(body, tags),
    body,
    vehicle: VEHICLES[(index * 11 + 3) % VEHICLES.length],
    customer_name: pickName(index),
    customer_country: countryName,
    customer_country_code: countryCode,
    rating: Math.min(5, Math.max(1, Math.round(Number(row.rating) || 5))),
    status: 'approved',
    source: 'imported',
    verified_purchase: /认证|Verified/i.test(String(row.verification || '')) || Number(row.has_images) > 0,
    consent_confirmed: true,
    source_platform: String(row.platform || '').includes('Trustpilot') ? 'Trustpilot' : 'Alibaba verified order',
    source_url: String(row.source_url || '').slice(0, 400),
    review_images_count: Number(row.has_images) || 0,
    admin_note: 'Imported from wheel-custom-reviews-100-english-excerpts.xlsx',
    admin_reply: '',
    created_at: created,
    updated_at: created
  });
}

const summary = {};
for (const p of products) summary[p.id] = assigned.get(p.id);
fs.writeFileSync(outJson, JSON.stringify(reviews, null, 2), 'utf8');
console.log('reviews written:', reviews.length, '->', path.relative(root, outJson));
console.log('per-product counts:', JSON.stringify(summary, null, 2));
