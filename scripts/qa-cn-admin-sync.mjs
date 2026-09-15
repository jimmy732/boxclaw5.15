import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const baseUrl = process.env.FBOX_QA_URL || 'http://127.0.0.1:4188';
const runtimeModules = process.env.CODEX_NODE_MODULES
  || join(process.env.USERPROFILE || '', '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'node', 'node_modules');
const requireFromRuntime = createRequire(join(runtimeModules, 'cn-admin-sync-qa-loader.cjs'));
const { chromium } = requireFromRuntime('playwright');
const executablePath = [
  process.env.QA_BROWSER_EXECUTABLE,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
].filter(Boolean).find(existsSync);
if (!executablePath) throw new Error('No Chromium browser executable found for QA.');

const outputDir = join(process.cwd(), 'qa', 'cn-admin-sync');
await mkdir(outputDir, { recursive: true });
const checks = [];
const check = (name, pass, detail = '') => checks.push({ name, pass: Boolean(pass), detail: String(detail ?? '') });
const username = process.env.FBOX_ADMIN_USERNAME || 'admin';
const password = process.env.FBOX_ADMIN_PASSWORD || '3125002';

const [appSource, backendSource, adminIndex, photoViewer, keyControls] = await Promise.all([
  readFile(join(process.cwd(), 'app.js'), 'utf8'),
  readFile(join(process.cwd(), 'fbox-visualizer-backend.mjs'), 'utf8'),
  readFile(join(process.cwd(), 'admin-dist', 'index.html'), 'utf8'),
  readFile(join(process.cwd(), 'admin-dist', 'job-photo-preview.js'), 'utf8'),
  readFile(join(process.cwd(), 'admin-dist', 'provider-key-controls.js'), 'utf8')
]);
check('AI 原创设计保存概念任务关联', appSource.includes('conceptJobId') && appSource.includes('source_job_id: sourceJobId'));
check('九宫格任务保存选中方案信息', backendSource.includes('selected_concept_id') && backendSource.includes('selected_image_url: selectedImageUrl'));
check('后台加载 Key 池和完整任务查看器', adminIndex.includes('provider-key-controls.js') && photoViewer.includes('openTaskViewer'));
check('Key 池前端支持切换、显示和复制', keyControls.includes('switchPrimaryKey') && keyControls.includes('toggleRevealKey') && keyControls.includes('copyKey'));

const loginResponse = await fetch(`${baseUrl}/api/admin/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify({ username, password })
});
const loginPayload = await loginResponse.json().catch(() => ({}));
const token = loginPayload?.data?.token || '';
check('国内站后台登录接口正常', loginResponse.ok && Boolean(token), loginResponse.status);

const statusResponse = await fetch(`${baseUrl}/api/fbox-admin/status`, {
  headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
});
const statusPayload = await statusResponse.json().catch(() => ({}));
const status = statusPayload?.data || {};
check('Key 池状态接口只返回脱敏信息', statusResponse.ok
  && Array.isArray(status.api_keys)
  && Number.isInteger(status.key_count)
  && !Object.prototype.hasOwnProperty.call(status, 'api_key'), JSON.stringify(status));

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

  await page.goto(`${baseUrl}/admin/#/fbox/overview`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.locator('.fbox-page').waitFor({ timeout: 20_000 });
  await page.waitForTimeout(300);
  const overviewBrand = await page.evaluate(() => ({
    title: document.title,
    text: document.body.innerText.replace(/\s+/g, ' ').trim(),
    html: document.body.innerHTML
  }));
  check('国内后台可见品牌统一为策锐官网', overviewBrand.text.includes('策锐官网')
    && !/(F-Box|F-BOX|Forcarbox|FORCARBOX)/.test(overviewBrand.text)
    && !/(F-Box|F-BOX|Forcarbox|FORCARBOX)/.test(overviewBrand.title), overviewBrand.text.slice(0, 500));
  await page.screenshot({ path: join(outputDir, 'overview-domestic-brand.png'), fullPage: false });

  await page.goto(`${baseUrl}/admin/#/fbox/visualizer`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.locator('.fbox-provider-key-manager').waitFor({ timeout: 20_000 });
  const keyManager = await page.evaluate(() => ({
    title: document.querySelector('.fbox-provider-key-title strong')?.textContent?.trim() || '',
    count: document.querySelector('[data-key-count]')?.textContent?.trim() || '',
    add: Boolean(document.querySelector('[data-add-key-choice]')),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
  }));
  check('后台可视化显示 API Key 池', /Key 池/.test(keyManager.title) && keyManager.add, JSON.stringify(keyManager));
  check('Key 池页面没有横向溢出', keyManager.overflow === 0, keyManager.overflow);
  await page.screenshot({ path: join(outputDir, 'provider-key-pool.png'), fullPage: false });

  const resultIds = ['front', 'front-right-45', 'right-90', 'rear-right-135', 'rear-180', 'rear-left-225', 'left-270', 'front-left-315'];
  await page.route('**/api/fbox-ops/jobs*', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      data: [{
        id: 'wheel_design_cn_qa',
        job_id: 'wheel_design_cn_qa',
        type: 'wheel_design',
        status: 'succeeded',
        design_phase: 'multiview',
        product_name: '策锐 AI 原创轮毂九宫格',
        product_fitment: '单片式锻造 · 20 英寸',
        design_prompt: '五组双辐、深凹、透明拉丝、中心区域简洁。',
        generation_model: 'gpt-image-2',
        vehicle_file_name: '参考轮毂.png',
        vehicle_image_url: '/assets/generated/cirui-center-cap-options-v1.webp',
        selected_concept_id: 'concept-2',
        selected_concept_index: 1,
        selected_image_url: '/assets/generated/cirui-wheel-hardware-options-v1.webp',
        angles: 8,
        results: resultIds.map((id, index) => ({
          id,
          angle: `角度 ${index + 1}`,
          image_url: '/assets/generated/cirui-center-cap-options-v1.webp'
        })),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]
    })
  }));
  await page.goto(`${baseUrl}/admin/#/operations/index?tab=jobs`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.locator('.operations-page').waitFor({ timeout: 20_000 });
  await page.locator('.fbox-job-results-button').waitFor({ timeout: 20_000 });
  const jobsRoute = await page.evaluate(() => ({
    hash: window.location.hash,
    activeLabel: document.querySelector('#cirui-admin-sidebar .cirui-nav-link.is-active span')?.textContent?.trim() || '',
    tabsHidden: getComputedStyle(document.querySelector('.operations-page .el-tabs__header')).display,
    taskButtons: document.querySelectorAll('.fbox-job-results-button').length,
    taskRows: document.querySelectorAll('.operations-page .el-table__row').length,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
  }));
  check('效果图任务有独立路由和导航高亮', jobsRoute.hash.includes('tab=jobs') && jobsRoute.activeLabel === '效果图任务', JSON.stringify(jobsRoute));
  check('工作台旧重复标签已隐藏', jobsRoute.tabsHidden === 'none', jobsRoute.tabsHidden);
  check('效果图任务页没有横向溢出', jobsRoute.overflow === 0, jobsRoute.overflow);
  await page.locator('.fbox-job-results-button').click();
  await page.locator('#fbox-job-photo-viewer:not([hidden])').waitFor();
  const taskViewer = await page.evaluate(() => ({
    cards: document.querySelectorAll('#fbox-job-photo-viewer .fbox-job-result-card').length,
    selected: document.querySelectorAll('#fbox-job-photo-viewer .fbox-job-result-card.is-selected').length,
    title: document.querySelector('#fbox-job-photo-title')?.textContent?.trim() || '',
    facts: document.querySelector('.fbox-job-task-facts')?.textContent?.replace(/\s+/g, ' ').trim() || '',
    overflow: document.querySelector('.fbox-job-photo-dialog')?.scrollWidth - document.querySelector('.fbox-job-photo-dialog')?.clientWidth
  }));
  check('任务结果可视化完整显示九宫格和选中方案', taskViewer.cards === 9 && taskViewer.selected === 1, JSON.stringify(taskViewer));
  check('任务结果弹窗显示模型与适配摘要', /gpt-image-2/.test(taskViewer.facts) && /20 英寸/.test(taskViewer.facts), taskViewer.facts);
  check('任务结果弹窗没有横向溢出', taskViewer.overflow === 0, taskViewer.overflow);
  check('同步后的后台没有浏览器报错', diagnostics.length === 0, diagnostics.join(' | '));
  await page.screenshot({ path: join(outputDir, 'visualizer-job-results.png'), fullPage: false });
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
