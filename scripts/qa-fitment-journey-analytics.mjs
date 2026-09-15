import { createRequire } from 'node:module';
import { mkdtemp, rm, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const runtimeModules = process.env.CODEX_NODE_MODULES
  || join(process.env.USERPROFILE || '', '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'node', 'node_modules');
const requireFromRuntime = createRequire(join(runtimeModules, 'fitment-journey-qa-loader.cjs'));
const { chromium } = requireFromRuntime('playwright');
const executablePath = [
  process.env.QA_BROWSER_EXECUTABLE,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
].filter(Boolean).find(existsSync);
if (!executablePath) throw new Error('No Chromium browser executable found for QA.');

const port = 4197;
const baseUrl = `http://127.0.0.1:${port}`;
const runtimeDir = await mkdtemp(join(tmpdir(), 'fbox-fitment-journey-'));
const outputDir = join(process.cwd(), 'qa', 'fitment-journey');
await mkdir(outputDir, { recursive: true });
const server = spawn(process.execPath, ['server.mjs'], {
  cwd: process.cwd(),
  env: { ...process.env, FBOX_PORT: String(port), FBOX_RUNTIME_DIR: runtimeDir },
  stdio: ['ignore', 'pipe', 'pipe']
});
let serverError = '';
server.stderr.on('data', chunk => { serverError += String(chunk); });

async function waitForServer() {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/`);
      if (response.ok) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  throw new Error(`QA server did not start. ${serverError}`);
}

const checks = [];
const check = (name, pass, detail = '') => checks.push({ name, pass: Boolean(pass), detail: String(detail || '') });
let browser;
try {
  await waitForServer();
  browser = await chromium.launch({ headless: true, executablePath });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/fitment-lab?qa=journey`, { waitUntil: 'domcontentloaded' });
  await page.locator('.fitment-entry-path[data-mode="style-first"]').click();
  await page.locator('.fitment-flow-wheel').first().click();
  await page.locator('[data-action="fitment-wizard-next"]').click();
  await page.locator('.fitment-flow-form[data-step="2"]').waitFor();
  await page.locator('.fitment-flow-scroll').evaluate(element => { element.scrollTop = Math.max(1, element.scrollHeight * .7); element.dispatchEvent(new Event('scroll')); });
  await page.waitForTimeout(11_200);
  const sessionId = await page.evaluate(() => sessionStorage.getItem('fbox-analytics-session'));
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pagehide')));
  await page.waitForTimeout(300);
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);
  check('storefront created an anonymous session id', /^session_[a-z0-9-]+$/i.test(sessionId || ''), sessionId || 'missing');

  await fetch(`${baseUrl}/api/fbox-content/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0 Chrome/126 Safari/537.36' },
    body: JSON.stringify({ type: 'page_view', path: '/fitment-lab', title: 'Legacy fitment visit' })
  });

  const password = process.env.FBOX_ADMIN_PASSWORD || '3125002';
  const loginResponse = await fetch(`${baseUrl}/api/admin/login`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ username: process.env.FBOX_ADMIN_USERNAME || 'admin', password }) });
  const loginPayload = await loginResponse.json();
  const token = loginPayload?.data?.token || '';
  check('admin login succeeds for analytics QA', loginResponse.ok && Boolean(token), loginResponse.status);
  const analyticsResponse = await fetch(`${baseUrl}/api/fbox-ops/analytics?range=24h`, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } });
  const analyticsPayload = await analyticsResponse.json();
  const analytics = analyticsPayload?.data?.fitment_analytics;
  const session = analytics?.sessions?.find(item => item.session_id === sessionId);
  const legacySession = analytics?.sessions?.find(item => item.outcome_code === 'legacy_unknown');
  check('backend groups fitment events into one journey', Boolean(session) && session.event_count >= 5, session?.event_count || 0);
  check('journey records active dwell time', Number(session?.active_seconds) >= 10, session?.active_seconds);
  check('journey records a reliable session-end beacon', session?.timeline?.some(item => item.type === 'session_end'), JSON.stringify(session?.timeline || []));
  check('journey records the deepest workflow step', Number(session?.max_step) >= 2, session?.max_step);
  check('journey records click and field-safe actions', session?.timeline?.some(item => item.action === 'fitment-start') && session?.timeline?.some(item => item.action === 'fitment-select-style'), JSON.stringify(session?.timeline || []));
  check('journey payload contains no query-string values', !JSON.stringify(session || {}).includes('qa=journey'), session?.path || '');
  check('legacy page views remain explicitly unknown', Boolean(legacySession) && legacySession.active_seconds === null, legacySession?.outcome || 'missing');

  const adminPage = await context.newPage();
  const adminDiagnostics = [];
  adminPage.on('pageerror', error => adminDiagnostics.push(`pageerror: ${error.message}`));
  adminPage.on('console', message => {
    if (message.type() === 'error') adminDiagnostics.push(`console: ${message.text()}`);
  });
  adminPage.on('response', response => {
    if (response.url().includes('/api/fbox-ops/analytics')) adminDiagnostics.push(`analytics: ${response.status()} ${response.url()}`);
  });
  await adminPage.goto(`${baseUrl}/admin/#/login`, { waitUntil: 'domcontentloaded' });
  await adminPage.locator('input[name="username"]').fill(process.env.FBOX_ADMIN_USERNAME || 'admin');
  await adminPage.locator('input[name="password"]').fill(password);
  await adminPage.getByRole('button', { name: /^登录$/ }).click();
  await adminPage.waitForURL(/#\/(?!login)/, { timeout: 15_000 });
  await adminPage.goto(`${baseUrl}/admin/#/analytics/index`, { waitUntil: 'domcontentloaded' });
  try {
    await adminPage.locator('#fbox-fitment-journeys').waitFor({ timeout: 15_000 });
  } catch (error) {
    adminDiagnostics.push(`url: ${adminPage.url()}`);
    adminDiagnostics.push(`body: ${(await adminPage.locator('body').innerText()).slice(0, 1200)}`);
    adminDiagnostics.push(`analytics-page: ${await adminPage.locator('.analytics-page').count()}`);
    adminDiagnostics.push(`kpi-row: ${await adminPage.locator('.kpi-row').count()}`);
    console.error(adminDiagnostics.join('\n'));
    await adminPage.screenshot({ path: join(outputDir, 'admin-fitment-journey-failure.png'), fullPage: true });
    throw error;
  }
  const adminState = await adminPage.locator('#fbox-fitment-journeys').evaluate(element => ({
    title: element.querySelector('h3')?.textContent || '',
    sessions: element.querySelectorAll('.fbox-session-row').length,
    text: element.textContent || '',
    overflow: element.scrollWidth - element.clientWidth
  }));
  check('admin dashboard renders the fitment journey panel', adminState.title.includes('点击与停留分析') && adminState.sessions > 0, JSON.stringify(adminState));
  check('admin dashboard exposes the session outcome', adminState.text.includes('在第 2 步离开'), adminState.text.slice(0, 300));
  check('desktop journey panel has no horizontal overflow', adminState.overflow === 0, adminState.overflow);
  await adminPage.screenshot({ path: join(outputDir, 'admin-fitment-journey-desktop.png'), fullPage: true });
  await adminPage.setViewportSize({ width: 390, height: 844 });
  await adminPage.waitForTimeout(300);
  const mobileOverflow = await adminPage.locator('#fbox-fitment-journeys').evaluate(element => element.scrollWidth - element.clientWidth);
  check('mobile journey panel has no horizontal overflow', mobileOverflow === 0, mobileOverflow);
  await adminPage.screenshot({ path: join(outputDir, 'admin-fitment-journey-mobile.png'), fullPage: true });

  const report = { generatedAt: new Date().toISOString(), passed: checks.filter(item => item.pass).length, failed: checks.filter(item => !item.pass).length, checks };
  console.log(JSON.stringify(report, null, 2));
  if (report.failed) process.exitCode = 1;
} finally {
  await browser?.close().catch(() => {});
  server.kill('SIGTERM');
  await new Promise(resolve => setTimeout(resolve, 250));
  await rm(runtimeDir, { recursive: true, force: true });
}
