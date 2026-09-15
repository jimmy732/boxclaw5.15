import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const source = process.argv[2];
const output = process.argv[3] || path.join(process.cwd(), 'assets', 'social', 'cerui-brand-share-card-zh-v1.jpg');

if (!source) throw new Error('Usage: node scripts/build-social-share-card.mjs <background-image> [output-image]');

const width = 1200;
const height = 630;
const textOverlay = Buffer.from(`
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#07090c" stop-opacity="0.98"/>
        <stop offset="0.48" stop-color="#07090c" stop-opacity="0.90"/>
        <stop offset="0.72" stop-color="#07090c" stop-opacity="0.12"/>
        <stop offset="1" stop-color="#07090c" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
    <rect x="68" y="74" width="38" height="5" rx="2.5" fill="#ed174c"/>
    <text x="120" y="83" fill="#d8dde5" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="18" font-weight="700" letter-spacing="3">品牌官网</text>
    <text x="68" y="220" fill="#ffffff" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="76" font-weight="700" letter-spacing="2">策锐锻造</text>
    <text x="70" y="285" fill="#ffffff" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="34" font-weight="600">定制锻造轮毂品牌官网</text>
    <rect x="70" y="333" width="418" height="1" fill="#ffffff" opacity="0.28"/>
    <text x="70" y="386" fill="#f0f2f5" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="22" font-weight="500" letter-spacing="1">车型适配 · 原创设计 · 定制生产</text>
    <text x="70" y="432" fill="#aeb6c2" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="18" font-weight="400">单片 / 双片 / 三片锻造方案</text>
    <circle cx="75" cy="551" r="5" fill="#ed174c"/>
    <text x="94" y="558" fill="#c8ced7" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="18" font-weight="600" letter-spacing="3">为你的座驾而锻造</text>
  </svg>`);

await mkdir(path.dirname(output), { recursive: true });
await sharp(source)
  .resize(width, height, { fit: 'cover', position: 'center' })
  .composite([{ input: textOverlay, left: 0, top: 0 }])
  .jpeg({ quality: 90, chromaSubsampling: '4:4:4', progressive: true })
  .toFile(output);

const result = await sharp(output).metadata();
console.log(JSON.stringify({ output, width: result.width, height: result.height, format: result.format }, null, 2));
