import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(moduleDir, '..');
const outputPath = path.join(rootDir, 'data', 'fbox-vehicle-directory.json');
const rawCacheDir = path.join(rootDir, 'work', 'vehicle-directory-source-cache');
const requestedYearStart = Math.max(1995, Number(process.env.VEHICLE_YEAR_START || 1995));
const requestedYearEnd = Math.min(2030, Number(process.env.VEHICLE_YEAR_END || new Date().getFullYear() + 1));
const concurrency = Math.min(12, Math.max(2, Number(process.env.VEHICLE_SYNC_CONCURRENCY || 8)));
const refresh = process.argv.includes('--refresh');
const currentYear = new Date().getFullYear();

const nhtsaMakes = {
  Acura: 'Acura', 'Alfa Romeo': 'Alfa Romeo', 'Aston Martin': 'Aston Martin', Audi: 'Audi', BMW: 'BMW', Bentley: 'Bentley',
  Buick: 'Buick', Cadillac: 'Cadillac', Chevrolet: 'Chevrolet', Chrysler: 'Chrysler', Citroen: 'Citroen', Cupra: 'Cupra', Dacia: 'Dacia',
  Daihatsu: 'Daihatsu', Dodge: 'Dodge', DS: 'DS', Ferrari: 'Ferrari', Fiat: 'Fiat', Ford: 'Ford', GMC: 'GMC', Genesis: 'Genesis',
  Honda: 'Honda', Hummer: 'Hummer', Hyundai: 'Hyundai', Infiniti: 'Infiniti', Isuzu: 'Isuzu', Jaguar: 'Jaguar',
  Jeep: 'Jeep', Kia: 'Kia', Lamborghini: 'Lamborghini', 'Land Rover': 'Land Rover', Lexus: 'Lexus', Lincoln: 'Lincoln',
  Lucid: 'Lucid', MINI: 'MINI', Maserati: 'Maserati', Mazda: 'Mazda', 'Mercedes-Benz': 'Mercedes-Benz', Mercury: 'Mercury',
  Mitsubishi: 'Mitsubishi', Nissan: 'Nissan', Oldsmobile: 'Oldsmobile', Opel: 'Opel', Peugeot: 'Peugeot', Plymouth: 'Plymouth',
  Polestar: 'Polestar', Pontiac: 'Pontiac', Porsche: 'Porsche', RAM: 'RAM', Renault: 'Renault', Rivian: 'Rivian',
  'Rolls-Royce': 'Rolls-Royce', Saab: 'Saab', Saturn: 'Saturn', Scion: 'Scion', SEAT: 'SEAT', Skoda: 'Skoda',
  Subaru: 'Subaru', Suzuki: 'Suzuki', Tesla: 'Tesla', Toyota: 'Toyota', Vauxhall: 'Vauxhall', Volkswagen: 'Volkswagen',
  Volvo: 'Volvo', smart: 'smart'
};

const autohomeMakes = {
  Acura: '讴歌', AITO: 'AITO 问界', 'Alfa Romeo': '阿尔法·罗密欧', 'Aston Martin': '阿斯顿·马丁',
  Audi: '奥迪', BMW: '宝马', Bentley: '宾利', Buick: '别克', BYD: '比亚迪', Cadillac: '凯迪拉克',
  Chevrolet: '雪佛兰', Chrysler: '克莱斯勒', Citroen: '雪铁龙', Cupra: 'Cupra', Dacia: '达契亚', Daihatsu: '大发',
  Dodge: '道奇', DS: 'DS', Ferrari: '法拉利', Fiat: '菲亚特', Ford: '福特', GMC: 'GMC', Genesis: '捷尼赛思',
  Honda: '本田', Hummer: '悍马', Hyundai: '现代', Infiniti: '英菲尼迪', Isuzu: '五十铃', Jaguar: '捷豹',
  Jeep: 'Jeep', Kia: '起亚', Lamborghini: '兰博基尼', 'Land Rover': '路虎', Lexus: '雷克萨斯',
  'Li Auto': '理想汽车', Lincoln: '林肯', Lucid: 'Lucid', MINI: 'MINI', Maserati: '玛莎拉蒂', Mazda: '马自达',
  'Mercedes-Benz': '奔驰', Mercury: '水星', Mitsubishi: '三菱', NIO: '蔚来', Nissan: '日产',
  Oldsmobile: '奥兹莫比尔', Opel: '欧宝', Peugeot: '标致', Plymouth: '普利茅斯', Polestar: 'Polestar极星',
  Pontiac: '庞蒂亚克', Porsche: '保时捷', RAM: 'RAM', Renault: '雷诺', Rivian: 'RIVIAN',
  'Rolls-Royce': '劳斯莱斯', Saab: '萨博', Saturn: '土星', Scion: 'Scion', SEAT: '西雅特', Skoda: '斯柯达',
  Subaru: '斯巴鲁', Suzuki: '铃木', Tesla: '特斯拉', Toyota: '丰田', Vauxhall: '沃克斯豪尔',
  Volkswagen: '大众', Volvo: '沃尔沃', XPeng: '小鹏', 'Xiaomi Auto': '小米汽车', Zeekr: '极氪', smart: 'smart'
};

// Family-level European catalog coverage. vPIC supplies manufacturer-submitted
// US model names while Autohome supplies China-market series/trims. These ranges
// keep Europe-only BBA families searchable without inventing fitment values.
const europeFamilyRanges = {
  Audi: [
    ['90', 1995, 1995], ['Cabriolet', 1995, 2000], ['A1', 2011], ['S1', 2014, 2018], ['A2', 2000, 2005],
    ['A3', 1996], ['S3', 1999], ['RS 3', 2011], ['A4', 1995, 2025], ['S4', 1995, 2025],
    ['RS 4', 2000, 2001], ['RS 4', 2006, 2008], ['RS 4', 2013, 2015], ['RS 4', 2018, 2024],
    ['A4 allroad', 2010, 2024], ['A5', 2008], ['S5', 2008], ['RS 5', 2010, 2015], ['RS 5', 2018],
    ['A6', 1995], ['S6', 1995, 1997], ['S6', 2002, 2004], ['S6', 2007],
    ['RS 6', 2003, 2004], ['RS 6', 2009, 2010], ['RS 6', 2013, 2018], ['RS 6', 2020],
    ['A6 allroad', 2007], ['A6 e-tron', 2025], ['S6 e-tron', 2025],
    ['A7', 2011, 2025], ['S7', 2013, 2025], ['RS 7', 2014, 2025],
    ['A8', 1995], ['S8', 1997, 2003], ['S8', 2007, 2009], ['S8', 2013],
    ['Q2', 2017, 2026], ['SQ2', 2019, 2024], ['Q3', 2012], ['RS Q3', 2014],
    ['Q4 e-tron', 2022], ['Q5', 2009], ['SQ5', 2013], ['Q5 e-tron', 2022],
    ['Q6 e-tron', 2025], ['SQ6 e-tron', 2025], ['Q7', 2006], ['SQ7', 2017],
    ['Q8', 2019], ['SQ8', 2020], ['RS Q8', 2020], ['e-tron', 2019, 2023], ['Q8 e-tron', 2024, 2025],
    ['e-tron GT', 2022], ['RS e-tron GT', 2022], ['TT', 1999, 2023], ['TTS', 2009, 2023],
    ['TT RS', 2010, 2023], ['R8', 2007, 2024]
  ],
  BMW: [
    ['1 Series', 2005], ['1 Series M Coupe', 2011, 2012], ['2 Series', 2014],
    ['2 Series Active Tourer', 2015], ['2 Series Gran Tourer', 2016, 2022], ['M2', 2016],
    ['3 Series', 1995], ['3 Series Gran Turismo', 2014, 2020],
    ['M3', 1995, 1999], ['M3', 2001, 2006], ['M3', 2008, 2013], ['M3', 2015],
    ['4 Series', 2014], ['M4', 2015], ['5 Series', 1995], ['5 Series Gran Turismo', 2010, 2017],
    ['M5', 1995, 1995], ['M5', 1999, 2003], ['M5', 2006, 2010], ['M5', 2013, 2016], ['M5', 2018],
    ['6 Series', 2004, 2010], ['6 Series', 2012, 2019], ['6 Series Gran Turismo', 2018],
    ['M6', 2006, 2010], ['M6', 2012, 2019], ['7 Series', 1995],
    ['8 Series', 1995, 1999], ['8 Series', 2019], ['M8', 2020],
    ['Z3', 1996, 2002], ['Z4', 2003], ['X1', 2010], ['X2', 2018], ['X3', 2004],
    ['X3 M', 2020], ['X4', 2015], ['X4 M', 2020], ['X5', 2000], ['X5 M', 2010],
    ['X6', 2009], ['X6 M', 2010], ['X7', 2019], ['XM', 2023],
    ['i3', 2014, 2022], ['i4', 2022], ['i5', 2024], ['i7', 2023], ['i8', 2014, 2020],
    ['iX', 2022], ['iX1', 2023], ['iX2', 2024], ['iX3', 2021]
  ],
  'Mercedes-Benz': [
    ['A-Class', 1998], ['AMG A-Class', 2013], ['B-Class', 2006], ['C-Class', 1995], ['AMG C-Class', 1995],
    ['CL-Class', 1997, 2014], ['CLA-Class', 2014], ['AMG CLA-Class', 2014], ['CLC-Class', 2008, 2011],
    ['CLK-Class', 1997, 2010], ['CLS-Class', 2005, 2023], ['AMG CLS-Class', 2005, 2023],
    ['CLE-Class', 2024], ['AMG CLE-Class', 2024], ['E-Class', 1995], ['AMG E-Class', 1995],
    ['S-Class', 1995], ['AMG S-Class', 1995], ['Mercedes-Maybach S-Class', 2015],
    ['SL-Class', 1995], ['AMG SL-Class', 1995], ['SLK-Class', 1997, 2020], ['SLC-Class', 2017, 2020],
    ['SLR McLaren', 2004, 2010], ['SLS AMG', 2010, 2015], ['AMG GT', 2015], ['AMG GT 4-Door Coupe', 2019],
    ['AMG ONE', 2022], ['G-Class', 1995], ['AMG G-Class', 2000], ['M-Class', 1998, 2015],
    ['GL-Class', 2007, 2015], ['GLK-Class', 2009, 2015], ['GLA-Class', 2014], ['AMG GLA-Class', 2014],
    ['GLB-Class', 2020], ['AMG GLB-Class', 2020], ['GLC-Class', 2016], ['AMG GLC-Class', 2016],
    ['GLC-Class Coupe', 2017], ['GLE-Class', 2016], ['AMG GLE-Class', 2016], ['GLE-Class Coupe', 2016],
    ['GLS-Class', 2016], ['AMG GLS-Class', 2016], ['Mercedes-Maybach GLS', 2021], ['R-Class', 2006, 2017],
    ['EQA', 2021], ['EQB', 2022], ['EQC', 2020, 2023], ['EQE', 2023], ['EQE SUV', 2023],
    ['EQS', 2022], ['EQS SUV', 2023], ['Mercedes-Maybach EQS SUV', 2024],
    ['V-Class', 1997], ['Viano', 2004, 2014]
  ],
  Nissan: [
    ['Micra', 1995, 2023], ['Micra', 2026], ['Almera', 1995, 2006], ['Primera', 1995, 2008],
    ['Maxima QX', 1995, 2004], ['200SX', 1995, 1999], ['300ZX', 1995, 1996],
    ['350Z', 2003, 2009], ['370Z', 2009, 2020], ['GT-R', 2009, 2022], ['Note', 2006],
    ['Pixo', 2009, 2013], ['Cube', 2010, 2011], ['Pulsar', 1995, 2000], ['Pulsar', 2015, 2018],
    ['Juke', 2011], ['Qashqai', 2007], ['X-Trail', 2001], ['Murano', 2003, 2014],
    ['Pathfinder', 1997, 2014], ['Navara', 1998, 2022], ['Patrol', 1995, 2010],
    ['Leaf', 2011], ['Ariya', 2022], ['Townstar', 2022], ['Primastar', 2002], ['Interstar', 2002]
  ],
  Opel: [
    ['Astra', 1995], ['Corsa', 1995], ['Vectra', 1995, 2008], ['Omega', 1995, 2003],
    ['Calibra', 1995, 1997], ['Tigra', 1995, 2001], ['Tigra TwinTop', 2005, 2009],
    ['Frontera', 1995, 2004], ['Frontera', 2025], ['Zafira', 1999, 2019], ['Zafira Life', 2019],
    ['Meriva', 2003, 2017], ['Signum', 2003, 2008], ['Insignia', 2009, 2022],
    ['Mokka', 2013], ['Crossland X', 2017, 2021], ['Crossland', 2021, 2024],
    ['Grandland X', 2018, 2021], ['Grandland', 2022], ['Antara', 2007, 2017],
    ['Adam', 2013, 2019], ['Karl', 2015, 2019], ['Speedster', 2001, 2005], ['GT', 2007, 2010],
    ['Cascada', 2013, 2019], ['Combo', 1995], ['Ampera', 2012, 2016], ['Ampera-e', 2017, 2021]
  ],
  Vauxhall: [
    ['Astra', 1995], ['Corsa', 1995], ['Vectra', 1995, 2008], ['Omega', 1995, 2003],
    ['Tigra', 1995, 2009], ['Frontera', 1995, 2004], ['Frontera', 2025], ['Zafira', 1999, 2019],
    ['Zafira Life', 2019], ['Meriva', 2003, 2017], ['Signum', 2003, 2008], ['Insignia', 2009, 2022],
    ['Mokka', 2013], ['Crossland X', 2017, 2021], ['Crossland', 2021, 2024],
    ['Grandland X', 2018, 2021], ['Grandland', 2022], ['Antara', 2007, 2017],
    ['Adam', 2013, 2019], ['Viva', 2015, 2019], ['VX220', 2001, 2005], ['Cascada', 2013, 2019],
    ['Combo', 1995], ['Ampera', 2012, 2016]
  ],
  Volkswagen: [
    ['Polo', 1995], ['Golf', 1995], ['Golf GTI', 1995], ['Golf R', 2003], ['Jetta', 1995],
    ['Passat', 1995], ['Passat Alltrack', 2012], ['Beetle', 1998, 2019], ['Lupo', 1999, 2005],
    ['Fox', 2005, 2011], ['up!', 2012, 2023], ['Scirocco', 2009, 2017], ['Eos', 2007, 2015],
    ['Phaeton', 2003, 2016], ['Arteon', 2018, 2024], ['Touran', 2003], ['Sharan', 1995, 2022],
    ['Tiguan', 2008], ['Touareg', 2003], ['T-Roc', 2018], ['T-Cross', 2019], ['Taigo', 2022],
    ['ID.3', 2020], ['ID.4', 2021], ['ID.5', 2022], ['ID.7', 2024], ['ID. Buzz', 2023]
  ]
};

const vehicleTypes = ['Passenger Car', 'Multipurpose Passenger Vehicle (MPV)', 'Truck'];
const typeRestrictedMakes = new Set(['BMW', 'Honda']);
const natural = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const normalizedToken = value => String(value || '').toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, '');
const htmlText = value => String(value || '')
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
  .replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

async function cachedFetch(url, cacheKey, encoding = 'utf-8') {
  const cachePath = path.join(rawCacheDir, `${cacheKey}.txt`);
  if (!refresh) {
    try { return await readFile(cachePath, 'utf8'); } catch { /* fetch below */ }
  }
  let lastError = null;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json,text/html;q=0.9,*/*;q=0.8', 'User-Agent': 'Mozilla/5.0 CIRUI vehicle-directory sync' },
        signal: AbortSignal.timeout(20_000)
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const bytes = new Uint8Array(await response.arrayBuffer());
      const body = new TextDecoder(encoding).decode(bytes);
      await mkdir(rawCacheDir, { recursive: true });
      await writeFile(cachePath, body, 'utf8');
      return body;
    } catch (error) {
      lastError = error;
      await sleep(350 * attempt);
    }
  }
  throw new Error(`${url}: ${lastError?.message || 'request failed'}`);
}

function cleanModelName(value, make = '') {
  let model = htmlText(value);
  if (!model || model.length > 90) return '';
  const escapedMake = String(make).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  model = model.replace(new RegExp(`^${escapedMake}\\s+`, 'i'), '').trim();
  return model;
}

async function fetchVpicModels(canonicalMake, apiMake, year) {
  const types = typeRestrictedMakes.has(canonicalMake) ? vehicleTypes : [''];
  const results = await Promise.allSettled(types.map(async type => {
    const typePath = type ? `/vehicletype/${encodeURIComponent(type)}` : '';
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(apiMake)}/modelyear/${year}${typePath}?format=json`;
    const cacheKey = `vpic-${year}-${normalizedToken(canonicalMake)}-${normalizedToken(type || 'all')}`;
    const payload = JSON.parse(await cachedFetch(url, cacheKey));
    return Array.isArray(payload?.Results) ? payload.Results : [];
  }));
  const models = results.flatMap(result => result.status === 'fulfilled' ? result.value : [])
    .filter(record => normalizedToken(record?.Make_Name) === normalizedToken(apiMake))
    .map(record => cleanModelName(record?.Model_Name, canonicalMake)).filter(Boolean);
  return [...new Map(models.map(model => [normalizedToken(model), model])).values()].sort(natural.compare);
}

async function mapLimit(items, limit, worker) {
  let cursor = 0;
  const output = new Array(items.length);
  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      output[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return output;
}

async function autohomeBrandDirectory() {
  const url = 'https://car.autohome.com.cn/AsLeftMenu/As_LeftListNew.ashx?brandId=0&fctId=0&seriesId=0&typeId=3';
  const html = await cachedFetch(url, 'autohome-brand-directory', 'gbk');
  const brands = [];
  const pattern = /id=['"]b(\d+)['"][^>]*>\s*<h3>\s*<a[^>]*>[\s\S]*?<\/i>([^<]+)<em/gi;
  for (const match of html.matchAll(pattern)) brands.push({ id: match[1], name: htmlText(match[2]) });
  return brands;
}

function normalizeAutohomeSeries(title, sourceBrand, canonicalMake) {
  let value = htmlText(title).replace(/\s*\(停售\)\s*$/u, '').trim();
  const prefixes = [sourceBrand, sourceBrand.replace(/汽车$/u, ''), '奥迪'];
  for (const prefix of prefixes.filter(Boolean).sort((a, b) => b.length - a.length)) {
    if (value.startsWith(prefix)) { value = value.slice(prefix.length).trim(); break; }
  }
  value = value.replace(/\(进口\)/gu, '').replace(/（进口）/gu, '').trim();
  if (canonicalMake === 'BMW') {
    value = value
      .replace(/^1系M$/u, '1 Series M Coupe')
      .replace(/^2系旅行车$/u, '2 Series Active Tourer')
      .replace(/^(\d)系多功能旅行车$/u, '$1 Series Active Tourer')
      .replace(/^(\d)系GT$/u, '$1 Series Gran Turismo')
      .replace(/^(\d)系新能源$/u, '$1 Series PHEV')
      .replace(/^(\d)系$/u, '$1 Series')
      .replace(/^(X\d)新能源$/iu, '$1 PHEV')
      .replace(/^M5新能源$/u, 'M5 PHEV');
  }
  if (canonicalMake === 'Mercedes-Benz') {
    const direct = {
      'A级': 'A-Class', 'A级AMG': 'AMG A-Class', 'B级': 'B-Class', 'C级': 'C-Class',
      'C级AMG': 'AMG C-Class', 'C级新能源': 'C-Class PHEV', 'C级AMG新能源': 'AMG C-Class PHEV',
      'E级': 'E-Class', 'E级AMG': 'AMG E-Class', 'E级新能源': 'E-Class PHEV',
      'S级': 'S-Class', 'S级AMG': 'AMG S-Class', 'S级新能源': 'S-Class PHEV',
      'S级AMG新能源': 'AMG S-Class PHEV', 'G级': 'G-Class', 'G级AMG': 'AMG G-Class',
      'G级新能源': 'G-Class EV', 'GL级': 'GL-Class', 'GLK级': 'GLK-Class', 'M级': 'M-Class',
      'M级AMG': 'AMG M-Class', 'R级': 'R-Class', 'SL级': 'SL-Class', 'SL级AMG': 'AMG SL-Class',
      'CL级': 'CL-Class', 'CLK级': 'CLK-Class', 'GL级AMG': 'AMG GL-Class',
      'SLK级': 'SLK-Class', 'SLK级AMG': 'AMG SLK-Class', 'SLS级AMG': 'SLS AMG', 'V级': 'V-Class',
      'AMG GT新能源': 'AMG GT PHEV', 'CLA新能源': 'CLA-Class PHEV',
      'GLC新能源': 'GLC-Class PHEV', 'GLE新能源': 'GLE-Class PHEV', 'GLE轿跑新能源': 'GLE-Class Coupe PHEV',
      '唯雅诺': 'Viano', '威霆': 'Vito', '迈巴赫S级': 'Mercedes-Maybach S-Class',
      '迈巴赫S级新能源': 'Mercedes-Maybach S-Class PHEV', '迈巴赫GLS': 'Mercedes-Maybach GLS',
      '迈巴赫EQS SUV': 'Mercedes-Maybach EQS SUV', '迈巴赫VLS': 'Mercedes-Maybach VLS',
      '凌特': 'Sprinter'
    };
    value = direct[value] || value
      .replace(/^([A-Z]{2,4})轿跑 AMG$/u, 'AMG $1-Class Coupe')
      .replace(/^([A-Z]{2,4})轿跑$/u, '$1-Class Coupe')
      .replace(/^([A-Z]{2,4}) AMG$/u, 'AMG $1-Class')
      .replace(/^([A-Z]{2,4})$/u, '$1-Class');
  }
  if (/^乌尼莫克/u.test(value)) return '';
  if (canonicalMake === 'Audi') value = value.replace(/新能源$/u, ' PHEV');
  return value;
}

async function fetchAutohomeSeries(canonicalMake, sourceBrand, brandId) {
  const brandUrl = `https://car.autohome.com.cn/price/brand-${brandId}.html`;
  const html = await cachedFetch(brandUrl, `autohome-brand-${brandId}`, 'gbk');
  const series = new Map();
  const pattern = /\/price\/series-(\d+)(?:-\d+-\d+)?\.html[^"']*["'][^>]*title=["']([^"']+)["']/gi;
  for (const match of html.matchAll(pattern)) {
    const rawTitle = htmlText(match[2]);
    if (!rawTitle) continue;
    const name = normalizeAutohomeSeries(rawTitle, sourceBrand, canonicalMake);
    if (!name) continue;
    const key = normalizedToken(name);
    if (!series.has(key) || !rawTitle.includes('停售')) series.set(key, { id: match[1], name, discontinued: rawTitle.includes('停售') });
  }
  return { canonicalMake, sourceBrand, brandId, brandUrl, series: [...series.values()] };
}

async function fetchAutohomeSeriesYears(brand, series) {
  const pages = [
    `https://car.autohome.com.cn/price/series-${series.id}.html`,
    `https://car.autohome.com.cn/price/series-${series.id}-0-3.html`
  ];
  const records = [];
  for (const [index, url] of pages.entries()) {
    try {
      const html = await cachedFetch(url, `autohome-series-${series.id}-${index}`, 'gbk');
      const pattern = /<a[^>]+href=["'][^"']*\/spec\/\d+\/[^"']*["'][^>]*>\s*((?:19|20)\d{2})款\s*([^<]+)<\/a>/gi;
      for (const match of html.matchAll(pattern)) {
        const year = Number(match[1]);
        const trim = htmlText(match[2]);
        if (year >= requestedYearStart && year <= requestedYearEnd && trim) records.push({ year, trim });
      }
    } catch {
      // Some discontinued or anti-bot pages are unavailable; other sources remain usable.
    }
  }
  return { brand, series, records };
}

const years = {};
for (let year = requestedYearStart; year <= requestedYearEnd; year += 1) years[year] = {};

for (const [make, ranges] of Object.entries(europeFamilyRanges)) {
  for (const [model, from, explicitTo] of ranges) {
    const to = explicitTo || requestedYearEnd;
    for (let year = Math.max(requestedYearStart, from); year <= Math.min(requestedYearEnd, to); year += 1) {
      years[year][make] ||= {};
      years[year][make][model] ||= [];
    }
  }
}
const nhtsaTasks = [];
for (let year = requestedYearStart; year <= requestedYearEnd; year += 1) {
  for (const [canonicalMake, apiMake] of Object.entries(nhtsaMakes)) nhtsaTasks.push({ year, canonicalMake, apiMake });
}

let completed = 0;
await mapLimit(nhtsaTasks, concurrency, async task => {
  try {
    const models = await fetchVpicModels(task.canonicalMake, task.apiMake, task.year);
    if (models.length) {
      years[task.year][task.canonicalMake] ||= {};
      for (const model of models) years[task.year][task.canonicalMake][model] ||= [];
    }
  } catch (error) {
    console.warn(`NHTSA ${task.year} ${task.canonicalMake}: ${error.message}`);
  }
  completed += 1;
  if (completed % 50 === 0 || completed === nhtsaTasks.length) console.log(`NHTSA ${completed}/${nhtsaTasks.length}`);
});

const autohomeSources = [];
try {
  const directory = await autohomeBrandDirectory();
  const brandTasks = Object.entries(autohomeMakes).map(([canonicalMake, sourceBrand]) => {
    const match = directory.find(item => normalizedToken(item.name) === normalizedToken(sourceBrand));
    return match ? { canonicalMake, sourceBrand, brandId: match.id } : null;
  }).filter(Boolean);
  const brandCatalogs = await mapLimit(brandTasks, Math.min(4, concurrency), task => fetchAutohomeSeries(task.canonicalMake, task.sourceBrand, task.brandId));
  const seriesTasks = brandCatalogs.flatMap(brand => brand.series.map(series => ({ brand, series })));
  let seriesCompleted = 0;
  await mapLimit(seriesTasks, Math.min(6, concurrency), async ({ brand, series }) => {
    const result = await fetchAutohomeSeriesYears(brand, series);
    const trimsByYear = new Map();
    result.records.forEach(record => {
      if (!trimsByYear.has(record.year)) trimsByYear.set(record.year, new Set());
      trimsByYear.get(record.year).add(record.trim);
    });
    trimsByYear.forEach((trims, year) => {
      years[year][brand.canonicalMake] ||= {};
      years[year][brand.canonicalMake][series.name] = [...trims].sort(natural.compare);
    });
    if (!result.records.length && !series.discontinued) {
      for (const year of [currentYear, currentYear + 1].filter(value => value >= requestedYearStart && value <= requestedYearEnd)) {
        years[year][brand.canonicalMake] ||= {};
        years[year][brand.canonicalMake][series.name] ||= [];
      }
    }
    seriesCompleted += 1;
    if (seriesCompleted % 25 === 0 || seriesCompleted === seriesTasks.length) console.log(`Autohome ${seriesCompleted}/${seriesTasks.length}`);
  });
  autohomeSources.push(...brandCatalogs.map(brand => ({ make: brand.canonicalMake, url: brand.brandUrl, source_brand: brand.sourceBrand })));
} catch (error) {
  console.warn(`Autohome catalog enrichment unavailable: ${error.message}`);
}

for (const year of Object.keys(years)) {
  const orderedMakes = Object.keys(years[year]).sort(natural.compare);
  years[year] = Object.fromEntries(orderedMakes.map(make => {
    const orderedModels = Object.keys(years[year][make]).sort(natural.compare);
    return [make, Object.fromEntries(orderedModels.map(model => [model, years[year][make][model]]))];
  }));
}

const makeSet = new Set();
let modelYearCount = 0;
let trimCount = 0;
Object.values(years).forEach(makes => Object.entries(makes).forEach(([make, models]) => {
  makeSet.add(make);
  modelYearCount += Object.keys(models).length;
  trimCount += Object.values(models).reduce((sum, trims) => sum + trims.length, 0);
}));

const payload = {
  dataset: 'CIRUI global vehicle make/model/year directory',
  catalog_version: `${new Date().toISOString().slice(0, 10)}.nhtsa-autohome`,
  generated_at: new Date().toISOString(),
  year_start: requestedYearStart,
  year_end: requestedYearEnd,
  safety_policy: 'Vehicle identity and trim search hints only. Never use this directory as wheel, tire, brake, suspension or production-fitment approval.',
  sources: [
    { publisher: 'NHTSA vPIC (manufacturer-submitted vehicle identity)', url: 'https://vpic.nhtsa.dot.gov/api/', coverage: 'Model-year and model names for the United States market' },
    { publisher: '汽车之家车型库', url: 'https://car.autohome.com.cn/', coverage: 'China-market series and published trim names', make_pages: autohomeSources },
    { publisher: 'Audi Model History', url: 'https://www.audi.com/en/previous-models-78', coverage: 'European Audi current and previous family names' },
    { publisher: 'BMW Group Classic model overview', url: 'https://www.bmwgroup-classic.com/en/history/historic-modeloverview-bmw.html', coverage: 'Historic BMW series and derivatives' },
    { publisher: 'Mercedes-Benz model and technical archive', url: 'https://bb-portal.mercedes-benz-vans.com/en/GLOBAL/pkw/technik-und-informationen', coverage: 'Current and archived Mercedes-Benz passenger-car series' },
    { publisher: 'Nissan Europe model overview', url: 'https://www.nissan.de/fahrzeuge/neuwagen.html', coverage: 'European Nissan passenger-car and crossover family names' },
    { publisher: 'Volkswagen Newsroom model archive', url: 'https://www.volkswagen-newsroom.com/en/images/topics/model-archive-47', coverage: 'Current and historic European Volkswagen family names and generations' },
    { publisher: 'Opel heritage archive', url: 'https://www.media.stellantis.com/em-en/opel/press-category/heritage-opel-classic', coverage: 'Historic and current European Opel family names' }
  ],
  stats: { make_count: makeSet.size, year_count: Object.keys(years).length, model_year_entries: modelYearCount, trim_entries: trimCount },
  years
};

await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`Wrote ${outputPath}`);
console.log(JSON.stringify(payload.stats));
