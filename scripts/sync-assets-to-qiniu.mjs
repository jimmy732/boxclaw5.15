import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { qiniuStorageStatus, uploadQiniuObject } from '../qiniu-storage.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = path.join(root, 'assets');
const prefix = String(process.env.FBOX_QINIU_STATIC_PREFIX || 'fbox/static/assets').replace(/^\/+|\/+$/g, '');
const status = qiniuStorageStatus();
if (!status.configured) throw new Error('Qiniu sync is disabled or incomplete. Check the FBOX_QINIU_* environment variables.');

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : entryPath;
  }));
  return files.flat();
}

const files = (await walk(assetsDir)).filter(file => /\.webp$/i.test(file));
let cursor = 0;
let uploaded = 0;
async function worker() {
  while (cursor < files.length) {
    const file = files[cursor++];
    const relative = path.relative(assetsDir, file).replace(/\\/g, '/');
    const bytes = await fs.readFile(file);
    const result = await uploadQiniuObject({ key: `${prefix}/${relative}`, bytes, mime: 'image/webp' });
    if (!result.uploaded) throw new Error(`Qiniu did not accept ${relative}: ${result.reason}`);
    uploaded += 1;
  }
}

await Promise.all(Array.from({ length: Math.min(4, files.length) }, () => worker()));
console.log(`Uploaded ${uploaded} optimized F-Box assets to Qiniu.`);
