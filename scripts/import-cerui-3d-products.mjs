import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { taxonomyForProduct } from './cerui-product-taxonomy.mjs';

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(moduleDir, '..');
const defaultSourceDir = 'F:\\cerui\\3D效果图';
const sourceArgIndex = process.argv.indexOf('--source');
const sourceDir = path.resolve(sourceArgIndex >= 0 ? process.argv[sourceArgIndex + 1] : defaultSourceDir);
const outputDir = path.join(projectDir, 'assets', 'products', 'cerui-3d');
const seedPath = path.join(projectDir, 'data', 'fbox-store.seed.json');
const manifestPath = path.join(projectDir, 'data', 'cerui-3d-products.manifest.json');
const catalogPrefix = 'cirui-3d-';

const numberedFolders = Array.from({ length: 36 }, (_, index) => String(index + 1));
const folderDefinitions = [
  ...numberedFolders.map((folder, index) => ({
    folder,
    id: `${catalogPrefix}series-${String(index + 1).padStart(2, '0')}`,
    name: `CIRUI Forged Series ${String(index + 1).padStart(2, '0')} - Full Custom Wheel`,
    part: `CR-3D-${String(index + 1).padStart(2, '0')}`,
    family: 'CIRUI Forged Series'
  })),
  {
    folder: 'bbs1',
    id: `${catalogPrefix}heritage-mesh-01`,
    name: 'CIRUI Heritage Mesh 01 - Full Custom Forged Wheel',
    part: 'CR-HM-01',
    family: 'CIRUI Heritage Mesh'
  },
  {
    folder: 'bbs2',
    id: `${catalogPrefix}heritage-mesh-02`,
    name: 'CIRUI Heritage Mesh 02 - Full Custom Forged Wheel',
    part: 'CR-HM-02',
    family: 'CIRUI Heritage Mesh'
  },
  ...Array.from({ length: 4 }, (_, index) => ({
    folder: `大饼悬浮款${index + 1}`,
    id: `${catalogPrefix}aero-disc-${String(index + 1).padStart(2, '0')}`,
    name: `CIRUI Aero Disc ${String(index + 1).padStart(2, '0')} - Floating Custom Forged Wheel`,
    part: `CR-AD-${String(index + 1).padStart(2, '0')}`,
    family: 'CIRUI Aero Disc'
  }))
];

const explicitMainImages = new Map([
  ['2', '2b0fd7d0-5205-4cb2-8aa9-b6653e38cf83.png'],
  ['大饼悬浮款2', 'd2b5938b-abe5-4d2c-a676-1d86a9cd4d8b.png']
]);

function naturalCompare(left, right) {
  return left.localeCompare(right, 'zh-CN', { numeric: true, sensitivity: 'base' });
}

function isCatalogImage(filename) {
  return /\.(?:png|jpe?g|webp)$/i.test(filename);
}

function pixelDistance(data, index, background) {
  const red = data[index];
  const green = data[index + 1];
  const blue = data[index + 2];
  return Math.sqrt((red - background[0]) ** 2 + (green - background[1]) ** 2 + (blue - background[2]) ** 2);
}

// Keep this in sync with the real admin upload pipeline. It flood-fills only a
// nearly uniform border, so wheel details and lifestyle/gallery photos are not
// erased by an aggressive global color replacement.
function removeFlatImageBackground(data, width, height) {
  const pixelCount = width * height;
  if (!pixelCount || data.length < pixelCount * 4) return { data, removed: 0, attempted: false };
  const original = Buffer.from(data);
  const cornerPoints = [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]];
  const cornerColors = cornerPoints.map(([x, y]) => {
    const index = (y * width + x) * 4;
    return [data[index], data[index + 1], data[index + 2]];
  });
  const background = [0, 1, 2].map(channel => Math.round(cornerColors.reduce((sum, color) => sum + color[channel], 0) / cornerColors.length));
  const cornerSpread = Math.max(...cornerColors.map(color => Math.sqrt((color[0] - background[0]) ** 2 + (color[1] - background[1]) ** 2 + (color[2] - background[2]) ** 2)));
  if (cornerSpread > 42) return { data, removed: 0, attempted: false };

  const tolerance = 30;
  const softRange = 18;
  const visited = new Uint8Array(pixelCount);
  const queue = new Int32Array(pixelCount);
  let head = 0;
  let tail = 0;
  const enqueue = pixel => {
    if (pixel < 0 || pixel >= pixelCount || visited[pixel]) return;
    if (pixelDistance(data, pixel * 4, background) > tolerance + softRange) return;
    visited[pixel] = 1;
    queue[tail++] = pixel;
  };
  for (let x = 0; x < width; x += 1) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }
  let removed = 0;
  while (head < tail) {
    const pixel = queue[head++];
    const index = pixel * 4;
    const distance = pixelDistance(data, index, background);
    const alpha = Math.max(0, Math.min(255, Math.round(((distance - tolerance) / softRange) * 255)));
    if (data[index + 3] !== alpha) {
      data[index + 3] = Math.min(data[index + 3], alpha);
      if (data[index + 3] === 0) removed += 1;
    }
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    if (x > 0) enqueue(pixel - 1);
    if (x + 1 < width) enqueue(pixel + 1);
    if (y > 0) enqueue(pixel - width);
    if (y + 1 < height) enqueue(pixel + width);
  }
  if (removed < pixelCount * 0.08) return { data: original, removed: 0, attempted: true };
  return { data, removed, attempted: true };
}

function removeLightNeutralBackground(data, width, height) {
  const pixelCount = width * height;
  const original = Buffer.from(data);
  const visited = new Uint8Array(pixelCount);
  const queue = new Int32Array(pixelCount);
  let head = 0;
  let tail = 0;
  const isBackgroundCandidate = pixel => {
    const index = pixel * 4;
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const maximum = Math.max(red, green, blue);
    const minimum = Math.min(red, green, blue);
    const average = (red + green + blue) / 3;
    return average >= 208 && maximum - minimum <= 34;
  };
  const enqueue = pixel => {
    if (pixel < 0 || pixel >= pixelCount || visited[pixel] || !isBackgroundCandidate(pixel)) return;
    visited[pixel] = 1;
    queue[tail++] = pixel;
  };
  for (let x = 0; x < width; x += 1) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }
  let removed = 0;
  while (head < tail) {
    const pixel = queue[head++];
    const index = pixel * 4;
    const average = (data[index] + data[index + 1] + data[index + 2]) / 3;
    const alpha = Math.max(0, Math.min(255, Math.round(((228 - average) / 20) * 255)));
    data[index + 3] = Math.min(data[index + 3], alpha);
    if (data[index + 3] === 0) removed += 1;
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    if (x > 0) enqueue(pixel - 1);
    if (x + 1 < width) enqueue(pixel + 1);
    if (y > 0) enqueue(pixel - width);
    if (y + 1 < height) enqueue(pixel + width);
  }
  if (removed < pixelCount * 0.08) return { data: original, removed: 0, attempted: true };

  // Product spec text sometimes sits on the white canvas beside the wheel.
  // Keep every meaningful foreground component while discarding tiny detached
  // labels; this also keeps genuine two-wheel gallery renders intact.
  const foregroundVisited = new Uint8Array(pixelCount);
  const components = [];
  const componentQueue = new Int32Array(pixelCount);
  for (let start = 0; start < pixelCount; start += 1) {
    if (foregroundVisited[start] || data[start * 4 + 3] <= 160) continue;
    let componentHead = 0;
    let componentTail = 0;
    const pixels = [];
    foregroundVisited[start] = 1;
    componentQueue[componentTail++] = start;
    while (componentHead < componentTail) {
      const pixel = componentQueue[componentHead++];
      pixels.push(pixel);
      const x = pixel % width;
      const y = Math.floor(pixel / width);
      const neighbors = [];
      if (x > 0) neighbors.push(pixel - 1);
      if (x + 1 < width) neighbors.push(pixel + 1);
      if (y > 0) neighbors.push(pixel - width);
      if (y + 1 < height) neighbors.push(pixel + width);
      for (const neighbor of neighbors) {
        if (foregroundVisited[neighbor] || data[neighbor * 4 + 3] <= 160) continue;
        foregroundVisited[neighbor] = 1;
        componentQueue[componentTail++] = neighbor;
      }
    }
    components.push(pixels);
  }
  const largest = Math.max(0, ...components.map(component => component.length));
  const minimumComponentSize = Math.max(500, Math.floor(largest * 0.1));
  let keepMask = new Uint8Array(pixelCount);
  for (const component of components) {
    if (component.length < minimumComponentSize) continue;
    for (const pixel of component) keepMask[pixel] = 1;
  }
  // Retain the soft antialiased fringe around the selected wheel components.
  for (let pass = 0; pass < 2; pass += 1) {
    const expanded = new Uint8Array(keepMask);
    for (let pixel = 0; pixel < pixelCount; pixel += 1) {
      if (!keepMask[pixel]) continue;
      const x = pixel % width;
      const y = Math.floor(pixel / width);
      if (x > 0) expanded[pixel - 1] = 1;
      if (x + 1 < width) expanded[pixel + 1] = 1;
      if (y > 0) expanded[pixel - width] = 1;
      if (y + 1 < height) expanded[pixel + width] = 1;
    }
    keepMask = expanded;
  }
  for (let pixel = 0; pixel < pixelCount; pixel += 1) {
    if (!keepMask[pixel]) data[pixel * 4 + 3] = 0;
  }
  return { data, removed, attempted: true };
}

async function convertCatalogImage(sourcePath, targetPath) {
  const source = sharp(sourcePath, { failOn: 'none' })
    .rotate()
    .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
    .ensureAlpha();
  const { data, info } = await source.raw().toBuffer({ resolveWithObject: true });
  let transparentPixelCount = 0;
  for (let index = 3; index < data.length; index += 4) {
    if (data[index] < 250) transparentPixelCount += 1;
  }
  const hasTransparency = transparentPixelCount >= info.width * info.height * 0.03;
  let result = hasTransparency
    ? { data, removed: 0, attempted: false }
    : removeFlatImageBackground(data, info.width, info.height);
  if (!hasTransparency && !result.removed) {
    result = removeLightNeutralBackground(Buffer.from(result.data), info.width, info.height);
  }
  await sharp(result.data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .webp({ quality: 88, alphaQuality: 100, effort: 5, smartSubsample: true })
    .toFile(targetPath);
  const outputMetadata = await sharp(targetPath).metadata();
  return {
    width: Number(outputMetadata.width || 0),
    height: Number(outputMetadata.height || 0),
    has_alpha: outputMetadata.hasAlpha === true,
    processing: hasTransparency ? 'existing-alpha' : result.removed ? 'flat-background' : 'preserved-original',
    background_removed: Boolean(hasTransparency || result.removed)
  };
}

async function sourceImagesForFolder(folder) {
  const folderPath = path.join(sourceDir, folder);
  const entries = await fs.readdir(folderPath, { withFileTypes: true });
  const files = entries.filter(entry => entry.isFile() && isCatalogImage(entry.name)).map(entry => entry.name).sort(naturalCompare);
  if (!files.length) throw new Error(`No product images found in ${folderPath}`);
  const exactMain = files.find(filename => /^1\.(?:png|jpe?g|webp)$/i.test(filename));
  const explicitMain = explicitMainImages.get(folder);
  const main = exactMain || (explicitMain && files.includes(explicitMain) ? explicitMain : '') || files[0];
  return [main, ...files.filter(filename => filename !== main)];
}

async function main() {
  const sourceStats = await fs.stat(sourceDir);
  if (!sourceStats.isDirectory()) throw new Error(`Source is not a directory: ${sourceDir}`);
  await fs.mkdir(outputDir, { recursive: true });

  const seed = JSON.parse(await fs.readFile(seedPath, 'utf8'));
  const existingProducts = Array.isArray(seed.products) ? seed.products : [];
  const existingById = new Map(existingProducts.filter(product => product?.id).map(product => [String(product.id), product]));
  const now = new Date().toISOString();
  const products = [];
  const manifestProducts = [];

  for (const [productIndex, definition] of folderDefinitions.entries()) {
    const sourceFiles = await sourceImagesForFolder(definition.folder);
    const images = [];
    const manifestImages = [];
    for (const [imageIndex, sourceFile] of sourceFiles.entries()) {
      const filename = `${definition.id}-${String(imageIndex + 1).padStart(2, '0')}.webp`;
      const sourcePath = path.join(sourceDir, definition.folder, sourceFile);
      const targetPath = path.join(outputDir, filename);
      const processing = await convertCatalogImage(sourcePath, targetPath);
      const url = `assets/products/cerui-3d/${filename}`;
      images.push({
        id: `${definition.id}-image-${imageIndex + 1}`,
        url,
        original_url: url,
        alt: `${definition.name} - view ${imageIndex + 1}`,
        cutout: true
      });
      manifestImages.push({ source: `${definition.folder}/${sourceFile}`, output: url, main: imageIndex === 0, ...processing });
    }
    const existing = existingById.get(definition.id) || {};
    const profile = taxonomyForProduct(definition.id) || {};
    const { public_name: publicName, ...taxonomy } = profile;
    products.push({
      id: definition.id,
      category: 'Wheels',
      brand: 'CIRUI',
      name: publicName || definition.name,
      catalog_display_name: publicName || definition.name,
      meta: 'Full-size custom forged wheel - Diameter / width / PCD / ET / CB built to order',
      custom_size: true,
      size_note: 'All sizes supported - custom diameter, width and fitment',
      price: null,
      oldPrice: null,
      price_mode: 'inquiry',
      currency: '',
      translation_profile: 'custom-wheel',
      rating: 0,
      reviews: 0,
      finish: 'Custom finish',
      diameter: null,
      image: images[0].url,
      image_original: images[0].original_url,
      image_cutout: true,
      images,
      badge: 'New',
      deal: '',
      material: 'Forged Aluminum Alloy',
      color: 'Custom finish',
      part: definition.part,
      weight: '',
      stock: 0,
      sort: 500 + productIndex,
      status: 'published',
      visualizer_enabled: true,
      dynamic_wheel_effect: true,
      visualizer_mode: 'dynamic-wheel',
      source_collection: 'F:/cerui/3D效果图',
      source_folder: definition.folder,
      product_family: definition.family,
      ...taxonomy,
      created_at: existing.created_at || now,
      updated_at: now
    });
    manifestProducts.push({
      id: definition.id,
      folder: definition.folder,
      main_source: sourceFiles[0],
      image_count: images.length,
      images: manifestImages
    });
    process.stdout.write(`[${productIndex + 1}/${folderDefinitions.length}] ${definition.folder} -> ${definition.id} (${images.length} images)\n`);
  }

  const preservedProducts = existingProducts.filter(product => !String(product?.id || '').startsWith(catalogPrefix));
  seed.products = [...preservedProducts, ...products];
  await fs.writeFile(seedPath, `${JSON.stringify(seed, null, 2)}\n`, 'utf8');
  await fs.writeFile(manifestPath, `${JSON.stringify({
    source: sourceDir.replace(/\\/g, '/'),
    generated_at: now,
    product_count: products.length,
    image_count: manifestProducts.reduce((total, product) => total + product.image_count, 0),
    main_image_rule: 'Use 1.*; folder 2 and 大饼悬浮款2 use visually verified explicit front-view files.',
    products: manifestProducts
  }, null, 2)}\n`, 'utf8');
  process.stdout.write(`Imported ${products.length} products and ${manifestProducts.reduce((total, product) => total + product.image_count, 0)} optimized WebP images.\n`);
}

main().catch(error => {
  console.error(error?.stack || error);
  process.exitCode = 1;
});
