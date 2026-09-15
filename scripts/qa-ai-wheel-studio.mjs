import { createRequire } from 'node:module';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const runtimeModules = process.env.CODEX_NODE_MODULES
  || join(process.env.USERPROFILE || '', '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'node', 'node_modules');
const requireFromRuntime = createRequire(join(runtimeModules, 'qa-ai-wheel-studio-loader.cjs'));
const { chromium } = requireFromRuntime('playwright');
const baseUrl = process.env.FBOX_QA_URL || 'http://127.0.0.1:4188';
const executablePath = [
  process.env.QA_BROWSER_EXECUTABLE,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
].filter(Boolean).find(existsSync);
if (!executablePath) throw new Error('No Chromium browser executable found.');

const outputDir = join(process.cwd(), 'qa', 'ai-wheel-studio');
mkdirSync(outputDir, { recursive: true });
const checks = [];
const check = (name, pass, detail = '') => checks.push({ name, pass: Boolean(pass), detail: String(detail ?? '') });
const errors = [];
const browser = await chromium.launch({ headless: true, executablePath });

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${baseUrl}/ai-wheel-studio`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.locator('.ai-wheel-page').waitFor({ timeout: 20_000 });
  const desktop = await page.evaluate(() => ({
    title: document.title,
    bodyClass: document.body.className,
    cssMedia: document.querySelector('#fitment-module-styles')?.media || '',
    h1: document.querySelector('.ai-wheel-hero h1')?.textContent?.trim() || '',
    modes: document.querySelectorAll('[data-action="ai-design-mode"]').length,
    prompt: Boolean(document.querySelector('textarea[name="prompt"]')),
    upload: Boolean(document.querySelector('[data-ai-design-upload]')),
    specFields: document.querySelectorAll('.ai-wheel-spec-panel select').length,
    navActive: document.querySelector('.nav-link-ai')?.classList.contains('is-active') || false,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
  }));
  check('AI studio uses the Chinese brand route', /AI 轮毂原创设计室/.test(desktop.title) && /文字描述/.test(desktop.h1), JSON.stringify(desktop));
  check('AI studio exposes all three brief modes', desktop.modes === 3, desktop.modes);
  check('AI studio includes prompt, reference upload and design controls', desktop.prompt && desktop.upload && desktop.specFields >= 5, desktop.specFields);
  check('AI studio activates its navigation and premium styles', desktop.navActive && desktop.bodyClass.includes('fbox-global-premium') && desktop.cssMedia === 'all', JSON.stringify(desktop));
  check('AI studio desktop has no horizontal overflow', desktop.overflow === 0, desktop.overflow);

  await page.locator('[data-action="ai-design-mode"][data-mode="text"]').click();
  check('text-only mode removes the reference controls', await page.locator('.ai-wheel-reference-fields').count() === 0);
  await page.locator('textarea[name="prompt"]').fill('原创十辐深凹锻造轮毂，纤细双辐，透明拉丝表面，中心区域简洁。');
  await page.locator('[data-form="ai-wheel-design"] button[type="submit"]').click();
  await page.locator('.modal-form[data-form="account"]').waitFor();
  check('generation requires an account before spending image credits', await page.locator('.modal-form[data-form="account"]').count() === 1);
  await page.screenshot({ path: join(outputDir, 'desktop-login-gate.png'), fullPage: true });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobile.on('console', message => { if (message.type() === 'error') errors.push(`mobile: ${message.text()}`); });
  mobile.on('pageerror', error => errors.push(`mobile: ${error.message}`));
  await mobile.goto(`${baseUrl}/ai-wheel-studio`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await mobile.locator('.ai-wheel-page').waitFor({ timeout: 20_000 });
  const mobileState = await mobile.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    workspaceOverflow: document.querySelector('.ai-wheel-workspace')?.scrollWidth - document.querySelector('.ai-wheel-workspace')?.clientWidth,
    modeButtons: document.querySelectorAll('[data-action="ai-design-mode"]').length,
    navPresent: Boolean(document.querySelector('.nav-link-ai'))
  }));
  check('AI studio mobile has no horizontal overflow', mobileState.overflow === 0 && mobileState.workspaceOverflow === 0, JSON.stringify(mobileState));
  check('AI studio mobile keeps all controls available', mobileState.modeButtons === 3 && mobileState.navPresent, JSON.stringify(mobileState));
  await mobile.screenshot({ path: join(outputDir, 'mobile-brief.png'), fullPage: true });

  const unauthorized = await fetch(`${baseUrl}/api/wheel-design/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phase: 'concepts', prompt: '原创十辐锻造轮毂' })
  });
  check('wheel-design API rejects anonymous generation', unauthorized.status === 401, unauthorized.status);
  const [capAsset, hardwareAsset] = await Promise.all([
    fetch(`${baseUrl}/assets/generated/cirui-center-cap-options-v1.webp`),
    fetch(`${baseUrl}/assets/generated/cirui-wheel-hardware-options-v1.webp`)
  ]);
  check('customization reference images are available', capAsset.ok && hardwareAsset.ok, `${capAsset.status}/${hardwareAsset.status}`);
  check('AI studio has no browser errors', errors.length === 0, errors.join(' | '));

  const report = { generatedAt: new Date().toISOString(), passed: checks.filter(item => item.pass).length, failed: checks.filter(item => !item.pass).length, checks };
  writeFileSync(join(outputDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify(report, null, 2));
  if (report.failed) process.exitCode = 1;
} finally {
  await browser.close();
}
