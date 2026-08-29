import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..');
const storeFiles = [
  path.join(projectDir, 'data', 'fbox-store.seed.json'),
  path.resolve(projectDir, '..', 'local-mall-dev', '.runtime', 'fbox-store.json')
];

function clearCommercialFields(product) {
  return {
    ...product,
    price: null,
    oldPrice: null,
    price_mode: 'inquiry',
    currency: '',
    minimum_quantity: null,
    deal: '',
    ddp_regions: [],
    ddp_quote_basis: '',
    lead_time_note: ''
  };
}

for (const storeFile of storeFiles) {
  const store = JSON.parse(await fs.readFile(storeFile, 'utf8'));
  let updated = 0;
  store.products = (store.products || []).map(product => {
    updated += 1;
    return clearCommercialFields(product);
  });
  await fs.writeFile(storeFile, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
  process.stdout.write(`${path.relative(projectDir, storeFile)}: cleared ${updated} product records\n`);
}
