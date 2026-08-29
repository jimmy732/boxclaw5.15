import { readFile } from 'node:fs/promises';

const inputPath = process.argv[2] || 'data/fbox-vehicle-directory.json';
const catalog = JSON.parse(await readFile(inputPath, 'utf8'));
const errors = [];
const forbiddenKeys = ['pcd', 'center_bore', 'wheel_offset', 'wheel_width', 'wheel_diameter', 'brake_clearance', 'tire_size'];
const years = catalog?.years && typeof catalog.years === 'object' ? catalog.years : {};
const makeSet = new Set();
let modelYearEntries = 0;
let trimEntries = 0;

if (!Array.isArray(catalog.sources) || catalog.sources.length < 5) errors.push('Global, China-market and European manufacturer catalog sources are required.');
if (!String(catalog.safety_policy || '').includes('Never use')) errors.push('The production-fitment safety policy is missing.');
for (const [year, makes] of Object.entries(years)) {
  if (!/^\d{4}$/.test(year)) errors.push(`Invalid year key: ${year}`);
  if (!makes || typeof makes !== 'object' || Array.isArray(makes)) { errors.push(`${year}: makes must be an object`); continue; }
  for (const [make, models] of Object.entries(makes)) {
    makeSet.add(make);
    if (!models || typeof models !== 'object' || Array.isArray(models)) { errors.push(`${year}/${make}: models must be an object`); continue; }
    for (const [model, trims] of Object.entries(models)) {
      modelYearEntries += 1;
      if (!model.trim()) errors.push(`${year}/${make}: empty model name`);
      if (!Array.isArray(trims)) errors.push(`${year}/${make}/${model}: trims must be an array`);
      else trimEntries += trims.length;
      const normalized = JSON.stringify({ model, trims }).toLowerCase();
      forbiddenKeys.forEach(key => { if (normalized.includes(`"${key}"`)) errors.push(`${year}/${make}/${model}: forbidden fitment key ${key}`); });
    }
  }
}

const audi2008 = new Set(Object.keys(years?.['2008']?.Audi || {}));
for (const model of ['A3', 'A4', 'A5', 'A6', 'A8', 'Q7', 'R8', 'RS 4', 'S4', 'S5', 'S6', 'S8', 'TT']) {
  if (!audi2008.has(model)) errors.push(`2008 Audi is missing ${model}`);
}

function requireModels(year, make, required) {
  const actual = new Set(Object.keys(years?.[String(year)]?.[make] || {}));
  required.forEach(model => { if (!actual.has(model)) errors.push(`${year} ${make} is missing ${model}`); });
  return actual;
}

requireModels(2008, 'BMW', ['1 Series', '3 Series', '5 Series', '6 Series', '7 Series', 'M3', 'M5', 'M6', 'X3', 'X5', 'X6', 'Z4']);
requireModels(2008, 'Mercedes-Benz', ['A-Class', 'B-Class', 'C-Class', 'E-Class', 'S-Class', 'CL-Class', 'CLK-Class', 'CLS-Class', 'G-Class', 'GL-Class', 'M-Class', 'R-Class', 'SL-Class', 'SLK-Class']);
requireModels(2008, 'Nissan', ['Altima', 'Rogue', 'Sentra', 'Micra', 'Note', 'Qashqai', 'X-Trail', 'Navara']);
requireModels(2024, 'Nissan', ['Altima', 'Ariya', 'Juke', 'Leaf', 'Pathfinder', 'Qashqai', 'Rogue', 'Sentra', 'X-Trail', 'Z']);
requireModels(2008, 'Volkswagen', ['Golf', 'Polo', 'Passat', 'Jetta', 'Tiguan', 'Touareg', 'Touran']);
requireModels(2024, 'Volkswagen', ['Golf', 'Polo', 'Passat', 'Tiguan', 'Touareg', 'T-Roc', 'ID.3', 'ID.4', 'ID.5', 'ID.7']);
requireModels(2024, 'Ford', ['Bronco', 'Bronco Sport', 'F-150', 'Mustang', 'Mustang Mach-E', 'Ranger']);
requireModels(2024, 'Chevrolet', ['Blazer', 'Camaro', 'Colorado', 'Corvette', 'Equinox', 'Silverado', 'Tahoe', 'Traverse']);
requireModels(2024, 'Opel', ['Astra', 'Corsa', 'Mokka', 'Grandland']);

const ford2024 = Object.keys(years?.['2024']?.Ford || {});
for (const contamination of ['Bradford Built', 'Affordable Trailers', 'Fords Trailer Sales', 'Swinford Mfg']) {
  if (ford2024.includes(contamination)) errors.push(`2024 Ford contains cross-brand result: ${contamination}`);
}
for (const year of Object.keys(years)) {
  for (const make of ['Audi', 'BMW', 'Mercedes-Benz']) {
    for (const model of Object.keys(years?.[year]?.[make] || {})) {
      if (/[^\x00-\x7F]/.test(model)) errors.push(`${year} ${make} model label is not locale-neutral: ${model}`);
    }
  }
}

if (makeSet.size < 65) errors.push(`Expected at least 65 makes, found ${makeSet.size}`);
if (modelYearEntries < 19_000) errors.push(`Expected at least 19,000 model-year entries, found ${modelYearEntries}`);
if (trimEntries < 15_000) errors.push(`Expected at least 15,000 trim entries, found ${trimEntries}`);
if (!Object.keys(years?.['2026']?.BYD || {}).length) errors.push('2026 BYD China-market catalog is missing.');
if (!Object.keys(years?.['2026']?.Audi || {}).some(model => /^RS\b/.test(model))) errors.push('2026 Audi RS family is missing.');

if (errors.length) {
  console.error(`Vehicle directory validation failed with ${errors.length} error(s):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}
console.log(JSON.stringify({
  years: Object.keys(years).length,
  makes: makeSet.size,
  model_year_entries: modelYearEntries,
  trim_entries: trimEntries,
  audi_2008_models: audi2008.size,
  nissan_2008_models: Object.keys(years?.['2008']?.Nissan || {}).length,
  nissan_2024_models: Object.keys(years?.['2024']?.Nissan || {}).length,
  volkswagen_2024_models: Object.keys(years?.['2024']?.Volkswagen || {}).length
}, null, 2));
