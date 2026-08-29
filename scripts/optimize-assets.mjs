import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const sharpModule = await import('sharp').catch(async error => {
  const bundledModules = process.env.CODEX_NODE_MODULES;
  if (!bundledModules) throw error;
  return import(pathToFileURL(path.join(bundledModules, 'sharp', 'lib', 'index.js')).href);
});
const sharp = sharpModule.default || sharpModule;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = path.join(root, 'assets');

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : entryPath;
  }));
  return files.flat();
}

const sources = (await walk(assetsDir)).filter(file => /\.(?:png|jpe?g)$/i.test(file));
const preferredSources = new Map();
for (const source of sources) {
  const target = source.replace(/\.(?:png|jpe?g)$/i, '.webp');
  const current = preferredSources.get(target);
  if (!current || path.extname(source).toLowerCase() === '.png') preferredSources.set(target, source);
}

let sourceBytes = 0;
let outputBytes = 0;
for (const [target, source] of preferredSources) {
  const inputStat = await fs.stat(source);
  await sharp(source, { failOn: 'none' })
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84, alphaQuality: 100, effort: 6, smartSubsample: true })
    .toFile(target);
  const outputStat = await fs.stat(target);
  sourceBytes += inputStat.size;
  outputBytes += outputStat.size;
}

const mb = bytes => (bytes / 1024 / 1024).toFixed(2);
console.log(`Optimized ${preferredSources.size} assets: ${mb(sourceBytes)} MB -> ${mb(outputBytes)} MB.`);
