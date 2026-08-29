import { createRequire } from 'node:module';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const runtimeModules = process.env.CODEX_NODE_MODULES || join(process.env.USERPROFILE || '', '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'node', 'node_modules');
const requireFromRuntime = createRequire(join(runtimeModules, 'qa-vehicle-directory-loader.cjs'));
const { chromium } = requireFromRuntime('playwright');
const baseUrl = process.env.FBOX_QA_URL || 'http://127.0.0.1:4174';
const executablePath = [
  process.env.QA_BROWSER_EXECUTABLE,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
].filter(Boolean).find(existsSync);
if (!executablePath) throw new Error('No Chromium browser executable found.');

const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
const errors = [];
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('pageerror', error => errors.push(error.message));
await page.goto(`${baseUrl}/fitment-lab`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
await page.locator('.fitment-entry-path[data-mode="fitment-first"]').click();
await page.locator('.fitment-flow-form[data-step="1"]').waitFor();
await page.locator('[data-action="fitment-wizard-next"]').click();
await page.locator('.fitment-flow-form[data-step="2"]').waitFor();

const year = page.locator('[data-fitment-field="year"]');
const make = page.locator('[data-fitment-field="make"]');
const model = page.locator('[data-fitment-field="model"]');
async function getModels(yearValue, makeValue, readyModel) {
  await year.selectOption(String(yearValue));
  await page.waitForFunction(expected => [...document.querySelector('[data-fitment-field="make"]')?.options || []].some(option => option.value === expected), makeValue);
  await make.selectOption(makeValue);
  await page.waitForFunction(expected => [...document.querySelector('[data-fitment-field="model"]')?.options || []].some(option => option.value === expected), readyModel);
  return model.locator('option').evaluateAll(options => options.map(option => option.value).filter(Boolean));
}

const audiModels = await getModels(2008, 'Audi', 'R8');
const bmwModels = await getModels(2008, 'BMW', '1 Series');
const mercedesModels = await getModels(2008, 'Mercedes-Benz', 'A-Class');
const nissan2008Models = await getModels(2008, 'Nissan', 'Qashqai');
const nissan2024Models = await getModels(2024, 'Nissan', 'Ariya');
const volkswagenModels = await getModels(2024, 'Volkswagen', 'ID.3');
const fordModels = await getModels(2024, 'Ford', 'Bronco');
const bydModels = await getModels(2026, 'BYD', '海豹06GT');

const requiredAudi = ['A3', 'A4', 'A5', 'A6', 'A8', 'Q7', 'R8', 'RS 4', 'S4', 'S5', 'S6', 'S8', 'TT'];
const requiredBmw = ['1 Series', '3 Series', '5 Series', '6 Series', '7 Series', 'M3', 'M5', 'M6', 'X3', 'X5', 'X6', 'Z4'];
const requiredMercedes = ['A-Class', 'B-Class', 'C-Class', 'E-Class', 'S-Class', 'CL-Class', 'CLK-Class', 'CLS-Class', 'G-Class', 'GL-Class', 'M-Class', 'SL-Class'];
const requiredNissan2008 = ['Altima', 'Rogue', 'Sentra', 'Micra', 'Note', 'Qashqai', 'X-Trail', 'Navara'];
const requiredNissan2024 = ['Altima', 'Ariya', 'Juke', 'Leaf', 'Pathfinder', 'Qashqai', 'Rogue', 'Sentra', 'X-Trail', 'Z'];
const requiredVolkswagen = ['Golf', 'Polo', 'Passat', 'Tiguan', 'Touareg', 'T-Roc', 'ID.3', 'ID.4', 'ID.5', 'ID.7'];
const requiredFord = ['Bronco', 'Bronco Sport', 'F-150', 'Mustang', 'Mustang Mach-E', 'Ranger'];
const checks = {
  audi_2008_complete: requiredAudi.every(value => audiModels.includes(value)),
  audi_2008_count: audiModels.length,
  bmw_2008_complete: requiredBmw.every(value => bmwModels.includes(value)),
  mercedes_2008_complete: requiredMercedes.every(value => mercedesModels.includes(value)),
  nissan_2008_europe_us_complete: requiredNissan2008.every(value => nissan2008Models.includes(value)),
  nissan_2024_europe_us_complete: requiredNissan2024.every(value => nissan2024Models.includes(value)),
  volkswagen_2024_europe_complete: requiredVolkswagen.every(value => volkswagenModels.includes(value)),
  ford_2024_us_complete: requiredFord.every(value => fordModels.includes(value)),
  ford_cross_brand_results_removed: !fordModels.some(value => ['Bradford Built', 'Affordable Trailers', 'Fords Trailer Sales', 'Swinford Mfg'].includes(value)),
  byd_2026_loaded: bydModels.includes('海豹06GT') && bydModels.length >= 20,
  byd_2026_count: bydModels.length,
  no_console_errors: errors.length === 0,
  no_horizontal_overflow: await page.evaluate(() => document.documentElement.scrollWidth === document.documentElement.clientWidth && document.querySelector('.fitment-flow-modal')?.scrollWidth === document.querySelector('.fitment-flow-modal')?.clientWidth)
};
const pass = checks.audi_2008_complete && checks.audi_2008_count >= 13 && checks.bmw_2008_complete
  && checks.mercedes_2008_complete && checks.nissan_2008_europe_us_complete && checks.nissan_2024_europe_us_complete
  && checks.volkswagen_2024_europe_complete && checks.ford_2024_us_complete && checks.ford_cross_brand_results_removed
  && checks.byd_2026_loaded && checks.no_console_errors && checks.no_horizontal_overflow;
const report = {
  generated_at: new Date().toISOString(), pass, checks,
  samples: { audiModels, bmwModels, mercedesModels, nissan2008Models, nissan2024Models, volkswagenModels, fordModels, bydModels },
  errors
};
const outputDir = join(process.cwd(), 'qa', 'vehicle-directory');
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
if (!pass) process.exitCode = 1;
