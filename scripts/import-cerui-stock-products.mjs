import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.resolve(process.argv[2] || 'F:/cerui/现货图片');
const assetRoot = path.join(projectRoot, 'assets', 'products', 'cerui-stock');
const seedFile = path.join(projectRoot, 'data', 'fbox-store.seed.json');
const runtimeFile = path.resolve(projectRoot, '..', 'local-mall-dev', '.runtime', 'fbox-store.json');
const manifestFile = path.join(projectRoot, 'data', 'cerui-stock-products.manifest.json');
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const brandNames = {
  '奥迪': 'Audi', '宝马': 'BMW', '保时捷': 'Porsche', '奔驰': 'Mercedes-Benz', '别克': 'Buick',
  '宾利': 'Bentley', '传祺': 'GAC Trumpchi', '大众': 'Volkswagen', '丰田': 'Toyota',
  '丰田海狮': 'Toyota Hiace', '改装款': 'Custom Designs', '红旗': 'Hongqi', '极氪': 'Zeekr',
  '捷豹': 'Jaguar', '凯迪拉克': 'Cadillac', '劳斯莱斯': 'Rolls-Royce', '雷克萨斯': 'Lexus',
  '理想': 'Li Auto', '林肯': 'Lincoln', '路虎': 'Land Rover', '罗密欧': 'Alfa Romeo',
  '玛莎拉蒂': 'Maserati', '坦克': 'Tank', '特斯拉': 'Tesla', '途乐': 'Nissan Patrol',
  '蔚来': 'NIO', '问界': 'AITO', '小米': 'Xiaomi', 'BBS': 'BBS'
};

const phraseNames = [
  ['保时捷', 'Porsche '], ['大G 越野', 'G-Class Off-Road'], ['ABCS级轿车', 'A/B/C/S-Class'],
  ['丰田霸道', 'Land Cruiser Prado'], ['新款埃尔法', 'Alphard'], ['极光神行 路虎星脉 揽胜星脉 发现 神行者', 'Evoque / Discovery Sport / Velar / Discovery'],
  ['揽胜发行 卫士', 'Range Rover / Defender'], ['新款揽胜', 'New Range Rover'],
  ['1-7系列', '1-7 Series'], ['新款x5', 'New X5'], ['新3系', 'New 3 Series'], ['5-7系', '5-7 Series']
];

function stableId(value) {
  return createHash('sha1').update(value.replaceAll('\\', '/').toLowerCase()).digest('hex').slice(0, 10);
}

function naturalSort(left, right) {
  return left.localeCompare(right, 'zh-CN', { numeric: true, sensitivity: 'base' });
}

function englishLabel(relative) {
  const parts = relative.split(path.sep).filter(Boolean);
  const top = brandNames[parts[0]] || parts[0];
  if (parts.length === 1) return top;
  let detail = parts.slice(1).join(' ');
  for (const [source, target] of phraseNames) detail = detail.replaceAll(source, target);
  detail = detail.replace(/\s+/g, ' ').trim();
  return `${top} ${detail}`.replace(/\s+/g, ' ').trim();
}

async function imageDirectories(root) {
  const found = [];
  async function visit(directory) {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const files = entries.filter(entry => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()));
    if (files.length) found.push({ directory, files: files.map(entry => entry.name).sort(naturalSort) });
    for (const entry of entries.filter(entry => entry.isDirectory()).sort((a, b) => naturalSort(a.name, b.name))) {
      await visit(path.join(directory, entry.name));
    }
  }
  await visit(root);
  return found.sort((a, b) => naturalSort(path.relative(root, a.directory), path.relative(root, b.directory)));
}

async function convertOne(source, destination) {
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await sharp(source, { failOn: 'none' })
    .rotate()
    .resize({ width: 1440, height: 1440, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84, effort: 4 })
    .toFile(destination);
}

async function mapLimit(items, limit, worker) {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      await worker(items[index], index);
    }
  });
  await Promise.all(runners);
}

async function loadStore(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

async function saveStore(file, store, stockProducts) {
  const existing = Array.isArray(store.products) ? store.products : [];
  store.products = [...existing.filter(item => !String(item?.id || '').startsWith('cirui-stock-')), ...stockProducts];
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
}

async function main() {
  const sourceStats = await fs.stat(sourceRoot);
  if (!sourceStats.isDirectory()) throw new Error(`Stock source is not a directory: ${sourceRoot}`);
  const collections = await imageDirectories(sourceRoot);
  if (!collections.length) throw new Error(`No supported images were found under ${sourceRoot}`);

  const products = [];
  let converted = 0;
  for (let collectionIndex = 0; collectionIndex < collections.length; collectionIndex += 1) {
    const collection = collections[collectionIndex];
    const relative = path.relative(sourceRoot, collection.directory);
    const hash = stableId(relative);
    const productId = `cirui-stock-${hash}`;
    const outputDirectory = path.join(assetRoot, hash);
    const jobs = collection.files.map((file, index) => ({
      source: path.join(collection.directory, file),
      file: `${String(index + 1).padStart(3, '0')}.webp`
    }));
    await mapLimit(jobs, 6, async job => {
      await convertOne(job.source, path.join(outputDirectory, job.file));
      converted += 1;
    });

    const imagePaths = jobs.map(job => `products/cerui-stock/${hash}/${job.file}`);
    const zhName = `策锐 ${relative.replaceAll(path.sep, ' · ')} 现货轮毂系列`;
    const enName = `CIRUI ${englishLabel(relative)} Stock Wheel Collection`;
    const topFolder = relative.split(path.sep)[0];
    const vehicleApplication = brandNames[topFolder] || topFolder;
    products.push({
      id: productId,
      category: 'Wheels',
      brand: 'CIRUI',
      name: enName,
      catalog_display_name: enName,
      localized_names: {
        en: enName,
        'zh-CN': zhName,
        'zh-TW': zhName.replaceAll('现货', '現貨').replaceAll('轮毂', '輪圈').replaceAll('系列', '系列')
      },
      meta: 'Stock style showcase · exact size, inventory and vehicle fitment confirmed during inquiry',
      custom_size: true,
      size_note: 'All sizes supported - custom diameter, width, PCD, ET and center bore',
      price: null,
      price_mode: 'inquiry',
      currency: '',
      oldPrice: null,
      finish: 'Custom finish',
      image: imagePaths[0],
      image_original: imagePaths[0],
      image_cutout: false,
      images: imagePaths.map((url, index) => ({
        id: `image-${index + 1}`,
        url,
        original_url: url,
        alt: `${enName} view ${index + 1}`,
        cutout: false
      })),
      badge: 'Stock Gallery',
      deal: '',
      material: 'Forged Aluminum Alloy',
      color: 'Custom finish',
      part: `CR-STOCK-${String(collectionIndex + 1).padStart(3, '0')}`,
      weight: '',
      stock: 0,
      sort: 500 + collectionIndex,
      status: 'published',
      public_scope: true,
      minimum_quantity: null,
      translation_profile: 'custom-wheel',
      visualizer_enabled: true,
      dynamic_wheel_effect: true,
      visualizer_mode: 'dynamic-wheel',
      stock_collection: true,
      stock_source_folder: relative.replaceAll(path.sep, '/'),
      load_rating_note: 'Specified against the exact vehicle and use case at inquiry',
      customization_options: ['Custom finish', 'Center cap', 'Hardware', 'Lip profile'],
      ddp_regions: [],
      ddp_quote_basis: '',
      lead_time_note: '',
      construction: 'unknown',
      design_family: 'stock-vehicle-gallery',
      spoke_style: 'varied',
      applications: ['street', 'stock', vehicleApplication, relative.replaceAll(path.sep, ' ')],
      classification_status: 'needs-confirmation',
      classification_note: 'This collection groups supplied stock and vehicle-reference photos. Exact construction and fitment are confirmed during inquiry.',
      created_at: '2026-08-29T00:00:00.000Z',
      updated_at: new Date().toISOString()
    });
  }

  const seed = await loadStore(seedFile);
  const runtime = await loadStore(runtimeFile);
  await saveStore(seedFile, seed, products);
  await saveStore(runtimeFile, runtime, products);
  await fs.writeFile(manifestFile, `${JSON.stringify({
    source_root: sourceRoot,
    generated_at: new Date().toISOString(),
    product_count: products.length,
    image_count: converted,
    products: products.map(item => ({ id: item.id, name: item.name, source_folder: item.stock_source_folder, image_count: item.images.length }))
  }, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ productCount: products.length, imageCount: converted, assetRoot, seedFile, runtimeFile }));
}

main().catch(error => {
  console.error(error?.stack || error);
  process.exitCode = 1;
});
