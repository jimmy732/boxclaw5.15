import { createRequire } from 'node:module';
import { existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const runtimeModules = process.env.CODEX_NODE_MODULES
  || join(process.env.USERPROFILE || '', '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'node', 'node_modules');
const requireFromRuntime = createRequire(join(runtimeModules, 'qa-product-locales-loader.cjs'));
const { chromium } = requireFromRuntime('playwright');
const baseUrl = process.env.FBOX_QA_URL || 'http://127.0.0.1:4174';
const browserCandidates = [
  process.env.QA_BROWSER_EXECUTABLE,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
].filter(Boolean);
const executablePath = browserCandidates.find(existsSync);
if (!executablePath) throw new Error('No Chromium browser executable found for QA.');

const cases = {
  en: { dir: 'ltr' },
  'zh-CN': { dir: 'ltr' },
  de: { dir: 'ltr' },
  ja: { dir: 'ltr' },
  ar: { dir: 'rtl' }
};
const locales = ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'de', 'fr', 'es', 'it', 'pt-BR', 'ru', 'ar', 'nl', 'tr', 'pl', 'vi', 'th', 'id', 'hi'];

const browser = await chromium.launch({ headless: true, executablePath });
const results = [];
for (const locale of locales) {
  const expected = cases[locale] || { dir: locale === 'ar' ? 'rtl' : 'ltr' };
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.addInitScript(selectedLocale => {
    localStorage.setItem('fbox-locale', selectedLocale);
    localStorage.setItem('fbox-locale-mode', 'manual');
  }, locale);
  const page = await context.newPage();
  const errors = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${baseUrl}/#product/cirui-3d-series-01`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.locator('.detail-title').waitFor({ state: 'visible', timeout: 30000 });
  const detailTitle = (await page.locator('.detail-title').textContent())?.trim() || '';
  const snapshot = await page.evaluate(() => ({
    title: document.querySelector('.detail-title')?.textContent?.trim() || '',
    meta: document.querySelector('.detail-fitment-meta')?.textContent?.trim() || '',
    price: document.querySelector('.detail-price')?.textContent?.trim() || '',
    category: document.querySelector('.breadcrumbs a[href="#store"]')?.textContent?.trim() || '',
    dir: document.documentElement.dir || 'ltr'
  }));
  await page.locator('.wheel-visualizer-entry [data-action="wheel-open"]').click();
  await page.locator('#wheel-visualizer-dialog-title').waitFor({ state: 'visible', timeout: 10000 });
  const visualizerTitle = (await page.locator('#wheel-visualizer-dialog-title').textContent())?.trim() || '';
  const checks = Object.entries(expected).map(([field, value]) => ({
    field,
    expected: value,
    actual: snapshot[field],
    pass: String(snapshot[field]).includes(value)
  }));
  checks.push({ field: 'detailTitle', expected: 'CIRUI CR-01 Axis Split-5 Forged Wheel', actual: detailTitle, pass: detailTitle === 'CIRUI CR-01 Axis Split-5 Forged Wheel' });
  checks.push({ field: 'visualizerTitle', expected: detailTitle, actual: visualizerTitle, pass: visualizerTitle.includes(detailTitle) });
  checks.push({ field: 'starting price', expected: '300', actual: snapshot.price, pass: snapshot.price.includes('300') });
  if (locale !== 'en') {
    checks.push({ field: 'localized category', expected: 'not Forged wheels', actual: snapshot.category, pass: snapshot.category !== 'Forged wheels' });
  }
  results.push({ locale, pass: checks.every(check => check.pass) && errors.length === 0, snapshot, detailTitle, visualizerTitle, checks, errors });
  await context.close();
}
await browser.close();

const outputDir = join(process.cwd(), 'qa', 'product-locales');
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'report.json'), JSON.stringify({ generated_at: new Date().toISOString(), results }, null, 2));
results.forEach(result => console.log(`${result.pass ? 'PASS' : 'FAIL'} ${result.locale}: ${JSON.stringify(result.snapshot)}`));
if (results.some(result => !result.pass)) process.exitCode = 1;
