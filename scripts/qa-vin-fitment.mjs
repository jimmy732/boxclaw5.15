import { createRequire } from 'node:module';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const runtimeModules = process.env.CODEX_NODE_MODULES
  || join(process.env.USERPROFILE || '', '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'node', 'node_modules');
const requireFromRuntime = createRequire(join(runtimeModules, 'qa-vin-fitment-loader.cjs'));
const { chromium } = requireFromRuntime('playwright');
const baseUrl = process.env.FBOX_QA_URL || 'http://127.0.0.1:4174';
const executablePath = [
  process.env.QA_BROWSER_EXECUTABLE,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
].filter(Boolean).find(existsSync);
if (!executablePath) throw new Error('No Chromium browser executable found.');

const outputDir = join(process.cwd(), 'qa', 'vin-fitment');
mkdirSync(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
const errors = [];
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('pageerror', error => errors.push(error.message));

await page.goto(`${baseUrl}/fitment-lab`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
await page.evaluate(() => {
  localStorage.setItem('fbox-locale', 'zh-CN');
  localStorage.setItem('fbox-locale-mode', 'manual');
  localStorage.removeItem('fbox-fitment-draft');
  localStorage.removeItem('fbox-vehicle');
});
await page.reload({ waitUntil: 'domcontentloaded' });
await page.locator('.fitment-entry-path[data-mode="fitment-first"]').click();
await page.locator('.fitment-flow-form[data-step="1"]').waitFor();
await page.locator('[data-action="fitment-wizard-next"]').click();
await page.locator('.fitment-flow-form[data-step="2"]').waitFor();

const chineseHeading = await page.locator('.fitment-vin-lookup h3').textContent();
await page.locator('[data-fitment-vin-input]').fill('1HGCM82633A004352');
await page.locator('[data-action="fitment-vin-decode"]').click();
await page.locator('.fitment-vin-status.is-success').waitFor({ timeout: 20_000 });
const fields = await page.evaluate(() => Object.fromEntries(['year', 'make', 'model', 'trim', 'body_style', 'drive'].map(name => [name, document.querySelector(`[data-fitment-field="${name}"]`)?.value || ''])));
const wheelNotice = (await page.locator('.fitment-vin-wheel-note').textContent())?.trim() || '';
await page.screenshot({ path: join(outputDir, 'vin-success-zh-cn.png'), fullPage: true });
await page.locator('[data-fitment-field="drive"]').selectOption('FWD');
await page.locator('[data-action="fitment-wizard-next"]').click();
await page.locator('.fitment-flow-form[data-step="3"]').waitFor({ timeout: 5000 });
const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
await mobile.goto(`${baseUrl}/fitment-lab`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
await mobile.evaluate(() => {
  localStorage.setItem('fbox-locale', 'zh-CN');
  localStorage.setItem('fbox-locale-mode', 'manual');
});
await mobile.reload({ waitUntil: 'domcontentloaded' });
await mobile.locator('.fitment-entry-path[data-mode="fitment-first"]').click();
await mobile.locator('[data-action="fitment-wizard-next"]').click();
await mobile.locator('.fitment-flow-form[data-step="2"]').waitFor();
const mobileOverflow = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
await mobile.screenshot({ path: join(outputDir, 'vin-entry-mobile.png'), fullPage: true });

const checks = {
  chinese_ui: String(chineseHeading || '').includes('VIN') && String(chineseHeading || '').includes('识别车辆'),
  decoded_year: fields.year === '2003',
  decoded_make: fields.make === 'Honda',
  decoded_model: fields.model === 'Accord',
  decoded_trim: fields.trim === 'EX-V6',
  decoded_body: fields.body_style === 'Coupe',
  missing_drive_left_for_review: fields.drive === '',
  missing_oem_wheel_fields_explained: wheelNotice.includes('该 VIN 没有制造商申报的轮毂字段'),
  completed_vehicle_advances: await page.locator('.fitment-flow-form[data-step="3"]').count() === 1,
  desktop_no_overflow: desktopOverflow === 0,
  mobile_no_overflow: mobileOverflow === 0,
  no_console_errors: errors.length === 0
};
const pass = Object.values(checks).every(Boolean);
const report = { generated_at: new Date().toISOString(), pass, checks, decoded_fields: fields, errors };
writeFileSync(join(outputDir, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await mobile.close();
await page.close();
await browser.close();
if (!pass) process.exitCode = 1;
