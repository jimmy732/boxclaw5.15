import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const baseUrl = process.env.FBOX_QA_URL || 'http://127.0.0.1:4188';
const runtimeModules = process.env.CODEX_NODE_MODULES
  || join(process.env.USERPROFILE || '', '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'node', 'node_modules');
const requireFromRuntime = createRequire(join(runtimeModules, 'cn-admin-products-qa-loader.cjs'));
const { chromium } = requireFromRuntime('playwright');
const executablePath = [
  process.env.QA_BROWSER_EXECUTABLE,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
].filter(Boolean).find(existsSync);
if (!executablePath) throw new Error('No Chromium browser executable found for QA.');

const outputDir = join(process.cwd(), 'qa', 'cn-admin-products');
await mkdir(outputDir, { recursive: true });
const checks = [];
const check = (name, pass, detail = '') => checks.push({ name, pass: Boolean(pass), detail: String(detail || '') });
const password = process.env.FBOX_ADMIN_PASSWORD || '3125002';
const username = process.env.FBOX_ADMIN_USERNAME || 'admin';

const loginResponse = await fetch(`${baseUrl}/api/admin/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify({ username, password })
});
const loginPayload = await loginResponse.json();
const token = loginPayload?.data?.token || '';
check('国内站后台登录接口正常', loginResponse.ok && Boolean(token), loginResponse.status);

const productsResponse = await fetch(`${baseUrl}/api/fbox-ops/products`, {
  headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
});
const productsPayload = await productsResponse.json();
const products = Array.isArray(productsPayload?.data) ? productsPayload.data : [];
const humanFields = ['name', 'catalog_display_name', 'meta', 'finish', 'material', 'badge', 'size_note', 'storefront_note', 'load_rating_note', 'classification_note', 'product_family'];
const bannedEnglish = /(Stock Wheel Collection|Forged Wheel|forged wheel|Monoblock|built to order|Custom finish|Forged Aluminum|Stock Gallery|front axle|piston|Specified against|engineering drawing|supplied product|CIRUI Forged Series|CIRUI Heritage|CIRUI Aero)/i;
const untranslated = products.flatMap(product => humanFields
  .filter(field => bannedEnglish.test(String(product[field] || '')))
  .map(field => `${product.id}:${field}`));
check('103 条后台商品均已载入', products.length === 103, products.length);
check('91 条国内公开商品仍完整', products.filter(product => product.public_scope !== false).length === 91, products.filter(product => product.public_scope !== false).length);
check('国内公开商品统一归属策锐锻造', products.filter(product => product.public_scope !== false).every(product => product.brand === '策锐锻造'), [...new Set(products.filter(product => product.public_scope !== false).map(product => product.brand))].join(', '));
check('商品客户可见字段没有遗留英文模板', untranslated.length === 0, untranslated.slice(0, 12).join(', '));
check('每条商品都有中文分类名称', products.every(product => ['轮毂', '卡钳', '刹车盘', '刹车片'].includes(product.category_zh)), products.filter(product => !product.category_zh).length);

const browser = await chromium.launch({ headless: true, executablePath });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
  const diagnostics = [];
  page.on('pageerror', error => diagnostics.push(`pageerror: ${error.message}`));
  page.on('console', message => { if (message.type() === 'error') diagnostics.push(`console: ${message.text()}`); });
  await page.goto(`${baseUrl}/admin/#/login`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: /^登录$/ }).click();
  await page.waitForURL(/#\/(?!login)/, { timeout: 15_000 });
  await page.goto(`${baseUrl}/admin/#/pms/product`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.locator('.el-table__row').first().waitFor({ timeout: 20_000 });
  await page.waitForTimeout(500);
  const text = await page.locator('.app-main').innerText();
  check('商品列表分类显示中文', text.includes('轮毂') && !/(^|\s)Wheels(\s|$)/m.test(text), text.slice(0, 400));
  check('商品列表名称和摘要显示中文', /策锐.+(?:锻造轮毂|原厂风格轮毂图库)/.test(text) && !/(Stock Wheel Collection|Forged Wheel|Monoblock forged wheel)/i.test(text), text.slice(0, 600));
  check('商品后台没有浏览器报错', diagnostics.length === 0, diagnostics.join(' | '));
  await page.screenshot({ path: join(outputDir, 'product-list-zh.png'), fullPage: false });
} finally {
  await browser.close();
}

const report = {
  generatedAt: new Date().toISOString(),
  passed: checks.filter(item => item.pass).length,
  failed: checks.filter(item => !item.pass).length,
  checks
};
await writeFile(join(outputDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
if (report.failed) process.exitCode = 1;
