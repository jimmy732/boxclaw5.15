import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workspace = path.resolve(root, '..');
const read = async p => JSON.parse(await fs.readFile(path.join(workspace, p), 'utf8'));
const brushed = await read('outputs/wl-brushed-20261026/ready-all-products.json');
const stock = await read('outputs/bba-builds-20261026/stock-ready-for-upload.json');
const stockPlan = await read('outputs/bba-builds-20261026/stock-publishing-plan.json');
const stockByCode = new Map(stockPlan.map(item => [item.itemNo, item]));
const assetDir = path.join(root, 'assets/products/cn-showcase');
await fs.mkdir(assetDir, { recursive: true });

async function makeProduct(code, files, kind, index) {
  if (!files.length) throw new Error(`Missing images for ${code}`);
  const slug = code.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  const images = [];
  for (let i = 0; i < files.length; i++) {
    const filename = `${slug}-${String(i + 1).padStart(2, '0')}.webp`;
    await sharp(files[i]).rotate().resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true }).webp({ quality: 85 }).toFile(path.join(assetDir, filename));
    images.push({ id: `image-${i + 1}`, url: `products/cn-showcase/${filename}`, alt: `${code} 轮毂效果图 ${i + 1}` });
  }
  const isStock = kind === 'stock';
  const stockSpecs = isStock ? [...new Set((stockByCode.get(code)?.variants || []).map(variant => variant.specificationEnglish).filter(Boolean))] : [];
  const name = `策锐 ${code} ${isStock ? '现货款轮毂' : '拉丝银锻造轮毂'}`;
  return {
    id: `cn-${isStock ? 'stock' : 'brushed'}-${slug}`, category: 'Wheels', brand: '策锐锻造', name,
    catalog_display_name: name, part: code, status: 'published', public_scope: true,
    meta: isStock ? '现货款式参考 · 库存与规格请咨询确认 · 图片为效果图' : '拉丝银款式参考 · 参数按车型确认 · 图片为效果图',
    size_note: isStock ? `${stockSpecs.slice(0, 4).join('；')}${stockSpecs.length > 4 ? '；更多规格请咨询' : ''}。实时库存及适配请咨询确认。` : '直径、宽度、PCD、ET 和中心孔以确认方案为准',
    price: null, oldPrice: null, price_mode: 'inquiry', currency: '',
    finish: isStock ? '以实际库存为准' : '拉丝银', color: isStock ? '以实际库存为准' : '拉丝银',
    image: images[0].url, image_original: images[0].url, images, image_cutout: false,
    stock: 0, badge: isStock ? '现货款' : '拉丝银', sort: isStock ? 100 + index : index + 1,
    material: isStock ? '材料与工艺以实际产品资料为准' : '锻造铝合金', custom_size: !isStock,
    construction: !isStock && code.startsWith('CR-C2') ? 'two-piece' : !isStock && code.startsWith('CR-S') ? 'monoblock' : 'unknown',
    design_family: 'custom', classification_status: 'needs-confirmation',
    classification_note: '图片为轮毂效果图，实际结构、表面和适配参数以确认的产品资料为准。',
    load_rating_note: '承载等级依据具体规格及车型确认', visualizer_enabled: true,
  };
}

const products = [];
for (const [index, item] of brushed.entries()) {
  const images = item.images.filter(image => /^Brushed Silver/i.test(image.finishEnglish || '')).slice(0, 4).map(image => image.path);
  products.push(await makeProduct(item.code, images, 'brushed', index));
}
for (const [index, item] of stock.entries()) {
  if (!stockByCode.has(item.itemNo)) throw new Error(`Missing stock source for ${item.itemNo}`);
  const images = item.images.filter(image => image.kind.startsWith('wheel-') && image.qa?.passed).slice(0, 3).map(image => image.webPath || image.path);
  products.push(await makeProduct(item.itemNo, images, 'stock', index));
}
await fs.writeFile(path.join(root, 'data/cerui-cn-showcase.seed.json'), JSON.stringify({ products }, null, 2) + '\n');
console.log(`Prepared ${brushed.length} brushed designs and ${stock.length} stock designs with ${products.reduce((n, p) => n + p.images.length, 0)} images.`);
