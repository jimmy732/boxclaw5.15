import fs from 'node:fs/promises';
import path from 'node:path';
import { constants } from 'node:fs';

// Run with the site service stopped, so its in-memory store cannot overwrite
// this one-time migration. Existing records and customer data are retained.
const runtimeDir = process.env.FBOX_RUNTIME_DIR;
if (!runtimeDir) throw new Error('FBOX_RUNTIME_DIR is required');
const storePath = path.join(runtimeDir, 'fbox-store.json');
const raw = await fs.readFile(storePath, 'utf8');
const store = JSON.parse(raw);
if (!Array.isArray(store.products)) throw new Error('Invalid runtime store');
const candidates = store.products.filter(item => item.category === 'Wheels' && item.status === 'published' && !/^cn-(brushed|stock)-/.test(String(item.id || '')));
console.log(`Legacy published wheel records to move to draft: ${candidates.length}`);
if (!process.argv.includes('--apply')) process.exit(0);
const backup = `${storePath}.before-cn-showcase-${new Date().toISOString().replace(/[:.]/g, '-')}.bak`;
await fs.copyFile(storePath, backup, constants.COPYFILE_EXCL);
for (const item of candidates) item.status = 'draft';
const temp = `${storePath}.cn-showcase-${process.pid}.tmp`;
await fs.writeFile(temp, JSON.stringify(store, null, 2), { encoding: 'utf8', flag: 'wx' });
await fs.rename(temp, storePath);
console.log(`Moved ${candidates.length} legacy wheel records to draft. Backup: ${backup}`);
