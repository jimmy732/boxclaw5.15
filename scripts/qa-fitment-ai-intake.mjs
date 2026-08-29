import { createRequire } from 'node:module';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const runtimeModules = process.env.CODEX_NODE_MODULES
  || join(process.env.USERPROFILE || '', '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'node', 'node_modules');
const requireFromRuntime = createRequire(join(runtimeModules, 'qa-fitment-ai-intake-loader.cjs'));
const { chromium } = requireFromRuntime('playwright');
const baseUrl = process.env.FBOX_QA_URL || 'http://127.0.0.1:4174';
const executablePath = [
  process.env.QA_BROWSER_EXECUTABLE,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
].filter(Boolean).find(existsSync);
if (!executablePath) throw new Error('No Chromium browser executable found.');

const notes = '目前是用的19寸原厂轮毂，但是刹车改的是前六后四，前gt6，后面是F40 都是布雷博的';
const outputDir = join(process.cwd(), 'qa', 'fitment-ai-intake');
mkdirSync(outputDir, { recursive: true });

async function ensureVehicleSelection(targetPage) {
  await targetPage.locator('[data-fitment-field="year"]').selectOption('2013');
  await targetPage.locator('[data-fitment-field="make"]').selectOption('BMW');
  await targetPage.locator('[data-fitment-field="model"]').selectOption('3 Series');
  await targetPage.locator('[data-fitment-field="trim"]').fill('320i时尚型');
  await targetPage.locator('[data-fitment-field="drive"]').selectOption('RWD');
}

const apiResponse = await fetch(`${baseUrl}/api/fbox-content/fitment/interpret`, {
  method: 'POST',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  body: JSON.stringify({ notes, locale: 'zh-CN', vehicle: {}, draft: {} })
});
const apiPayload = await apiResponse.json();
if (!apiResponse.ok) throw new Error(apiPayload.detail || `Fitment AI intake returned ${apiResponse.status}.`);
const result = apiPayload.data || apiPayload;

const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1 });
const errors = [];
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('pageerror', error => errors.push(error.message));
await page.goto(`${baseUrl}/fitment-lab`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
await page.evaluate(() => {
  localStorage.setItem('fbox-locale', 'zh-CN');
  localStorage.setItem('fbox-locale-mode', 'manual');
  localStorage.setItem('fbox-vehicle', JSON.stringify({ year: 2013, make: 'BMW', model: '3 Series', trim: '320i时尚型', drive: 'RWD', market: 'China' }));
  localStorage.setItem('fbox-fitment-draft', JSON.stringify({ workflow_mode: 'fitment-first', project_title: 'AI intake QA', suspension_id: 'oem' }));
});
await page.reload({ waitUntil: 'domcontentloaded' });
await page.locator('.fitment-entry-path[data-mode="fitment-first"]').click();
await page.locator('.fitment-flow-form[data-step="1"]').waitFor();
await page.locator('[data-action="fitment-wizard-next"]').click();
await page.locator('.fitment-flow-form[data-step="2"]').waitFor();
await ensureVehicleSelection(page);
await page.locator('[data-action="fitment-wizard-next"]').click();
await page.locator('.fitment-flow-form[data-step="3"]').waitFor();
await page.waitForFunction(() => {
  const text = `${document.querySelector('[data-fitment-part-picker][data-field="front_brake_id"]')?.textContent || ''} ${document.querySelector('[data-fitment-part-picker][data-field="rear_brake_id"]')?.textContent || ''}`;
  return /GT6/i.test(text) && /F40/i.test(text);
}, null, { timeout: 15_000 });
const brakeOptionText = await page.evaluate(() => ({
  front: document.querySelector('[data-fitment-part-picker][data-field="front_brake_id"]')?.textContent || '',
  rear: document.querySelector('[data-fitment-part-picker][data-field="rear_brake_id"]')?.textContent || ''
}));
await page.locator('textarea[name="modification_notes"]').fill(notes);

let releaseResponse;
const responseGate = new Promise(resolve => { releaseResponse = resolve; });
await page.route('**/api/fbox-content/fitment/interpret', async route => {
  await responseGate;
  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(apiPayload) });
});
await page.locator('[data-action="fitment-ai-interpret"]').click();
await page.locator('.fitment-ai-spinner').waitFor({ state: 'visible', timeout: 5000 });
const loading = await page.locator('[data-action="fitment-ai-interpret"]').evaluate(button => {
  const spinner = button.querySelector('.fitment-ai-spinner');
  return {
    busy: button.getAttribute('aria-busy'),
    disabled: button.disabled,
    label: button.textContent.replace(/\s+/g, ' ').trim(),
    animationName: spinner ? getComputedStyle(spinner).animationName : '',
    animationDuration: spinner ? getComputedStyle(spinner).animationDuration : '',
    width: button.getBoundingClientRect().width
  };
});
await page.screenshot({ path: join(outputDir, 'query-loading-spinner.png'), fullPage: true });
releaseResponse();
await page.locator('.fitment-ai-result').waitFor({ state: 'visible', timeout: 5000 });
const rendered = await page.locator('.fitment-ai-result').textContent();
const desktopHierarchy = await page.evaluate(() => {
  const result = document.querySelector('.fitment-ai-result');
  const head = result?.querySelector('.fitment-ai-result-head');
  const priority = result?.querySelector('.fitment-ai-priority');
  const facts = result?.querySelector('.fitment-ai-facts');
  const next = result?.querySelector('.fitment-ai-next');
  const apply = result?.querySelector('.fitment-ai-apply');
  const applyButton = apply?.querySelector('[data-action="fitment-ai-apply"]');
  const technical = result?.querySelector('.fitment-ai-technical');
  const evidence = result?.querySelector('.fitment-ai-evidence');
  const resultRect = result?.getBoundingClientRect();
  const buttonRect = applyButton?.getBoundingClientRect();
  return {
    priorityColumns: priority ? getComputedStyle(priority).gridTemplateColumns.split(' ').filter(Boolean).length : 0,
    factsVisible: Boolean(facts && facts.getBoundingClientRect().height > 0),
    nextVisible: Boolean(next && next.getBoundingClientRect().height > 0),
    nextHeading: next?.querySelector('header strong')?.textContent?.trim() || '',
    technicalCollapsed: Boolean(technical && !technical.open),
    evidenceCollapsed: Boolean(evidence && !evidence.open),
    applyHeight: apply?.getBoundingClientRect().height || 0,
    applyButtonWidth: buttonRect?.width || 0,
    applyButtonHeight: buttonRect?.height || 0,
    contentOrder: Boolean(head && priority && technical && head.compareDocumentPosition(priority) & Node.DOCUMENT_POSITION_FOLLOWING && priority.compareDocumentPosition(technical) & Node.DOCUMENT_POSITION_FOLLOWING),
    resultOverflow: resultRect ? Math.max(0, result.scrollWidth - Math.ceil(resultRect.width)) : -1,
    pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
  };
});
await page.screenshot({ path: join(outputDir, 'query-result.png'), fullPage: true });
await page.locator('.fitment-ai-technical > summary').click();
const desktopTechnical = await page.evaluate(() => {
  const technical = document.querySelector('.fitment-ai-technical');
  const body = technical?.querySelector('.fitment-ai-technical-body');
  return {
    open: Boolean(technical?.open),
    bodyVisible: Boolean(body && body.getBoundingClientRect().height > 0),
    preservesGt6AndF40: /GT6/i.test(body?.textContent || '') && /F40/i.test(body?.textContent || ''),
    includesReferencePlan: Boolean(body?.querySelector('.fitment-ai-reference'))
  };
});
await page.locator('.fitment-ai-technical > summary').click();
const frontPartSearch = page.locator('[data-fitment-part-picker][data-field="front_brake_id"] [data-fitment-part-search]');
await frontPartSearch.fill('gt6');
const pickerSearch = await page.evaluate(() => {
  const picker = document.querySelector('[data-fitment-part-picker][data-field="front_brake_id"]');
  const visible = [...(picker?.querySelectorAll('.fitment-part-option') || [])].filter(option => !option.hidden);
  return {
    visibleCount: visible.length,
    text: visible.map(option => option.textContent.replace(/\s+/g, ' ').trim()).join(' | '),
    hasNativeSelect: Boolean(picker?.querySelector('select')),
    pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
  };
});
await frontPartSearch.fill('');
await page.locator('[data-action="fitment-ai-apply"]').click();
await page.locator('.fitment-flow-form[data-step="4"]').waitFor({ state: 'visible', timeout: 5000 });
const appliedStep = await page.locator('[data-form="fitment-wizard"]').getAttribute('data-step');
const appliedDraft = await page.evaluate(() => JSON.parse(localStorage.getItem('fbox-fitment-draft') || '{}'));
await page.locator('[data-action="fitment-wizard-step"][data-step="3"]').click();
await page.locator('.fitment-flow-form[data-step="3"] .fitment-installed-workspace').waitFor({ state: 'visible', timeout: 5000 });
const appliedWorkflow = await page.evaluate(() => {
  const front = document.querySelector('[data-fitment-part-picker][data-field="front_brake_id"]');
  const rear = document.querySelector('[data-fitment-part-picker][data-field="rear_brake_id"]');
  const production = document.querySelector('.fitment-production-details');
  return {
    frontId: front?.querySelector('input[name="front_brake_id"]')?.value || '',
    rearId: rear?.querySelector('input[name="rear_brake_id"]')?.value || '',
    frontLabel: front?.querySelector('[data-part-current-label]')?.textContent || '',
    rearLabel: rear?.querySelector('[data-part-current-label]')?.textContent || '',
    productionCollapsed: Boolean(production && !production.open),
    duplicateVisibleDetailInputs: document.querySelectorAll('input[name$="_detail"]:not([type="hidden"])').length,
    redProductionFields: [...document.querySelectorAll('.fitment-production-record')].filter(row => row.classList.contains('fitment-required-missing')).length,
    pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
  };
});
await page.locator('.fitment-installed-workspace').evaluate(element => {
  const scroll = element.closest('.fitment-flow-scroll');
  if (scroll) scroll.scrollTop = Math.max(0, element.offsetTop - 18);
});
await page.screenshot({ path: join(outputDir, 'query-applied-workflow.png'), fullPage: false });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
mobile.on('console', message => { if (message.type() === 'error') errors.push(`mobile: ${message.text()}`); });
mobile.on('pageerror', error => errors.push(`mobile: ${error.message}`));
await mobile.goto(`${baseUrl}/fitment-lab`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
await mobile.evaluate(() => {
  localStorage.setItem('fbox-locale', 'zh-CN');
  localStorage.setItem('fbox-locale-mode', 'manual');
  localStorage.setItem('fbox-vehicle', JSON.stringify({ year: 2013, make: 'BMW', model: '3 Series', trim: '320i时尚型', drive: 'RWD', market: 'China' }));
  localStorage.setItem('fbox-fitment-draft', JSON.stringify({ workflow_mode: 'fitment-first', project_title: 'AI intake mobile QA', suspension_id: 'oem' }));
});
await mobile.reload({ waitUntil: 'domcontentloaded' });
await mobile.locator('.fitment-entry-path[data-mode="fitment-first"]').click();
await mobile.locator('[data-action="fitment-wizard-next"]').click();
await mobile.locator('.fitment-flow-form[data-step="2"]').waitFor();
await ensureVehicleSelection(mobile);
await mobile.locator('[data-action="fitment-wizard-next"]').click();
await mobile.locator('.fitment-flow-form[data-step="3"]').waitFor();
await mobile.locator('textarea[name="modification_notes"]').fill(notes);
let releaseMobile;
const mobileGate = new Promise(resolve => { releaseMobile = resolve; });
await mobile.route('**/api/fbox-content/fitment/interpret', async route => {
  await mobileGate;
  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(apiPayload) });
});
await mobile.locator('[data-action="fitment-ai-interpret"]').click();
await mobile.locator('.fitment-ai-spinner').waitFor({ state: 'visible', timeout: 5000 });
const mobileLayout = await mobile.evaluate(() => {
  const button = document.querySelector('[data-action="fitment-ai-interpret"]');
  const modal = document.querySelector('.fitment-flow-modal');
  const buttonRect = button?.getBoundingClientRect();
  const modalRect = modal?.getBoundingClientRect();
  return {
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    buttonInsideModal: Boolean(buttonRect && modalRect && buttonRect.left >= modalRect.left && buttonRect.right <= modalRect.right),
    buttonWidth: buttonRect?.width || 0
  };
});
await mobile.screenshot({ path: join(outputDir, 'query-loading-spinner-mobile.png'), fullPage: true });
releaseMobile();
await mobile.locator('.fitment-ai-result').waitFor({ state: 'visible', timeout: 5000 });
const mobileHierarchy = await mobile.evaluate(() => {
  const result = document.querySelector('.fitment-ai-result');
  const priority = result?.querySelector('.fitment-ai-priority');
  const applyButton = result?.querySelector('.fitment-ai-apply [data-action="fitment-ai-apply"]');
  const technical = result?.querySelector('.fitment-ai-technical');
  const evidence = result?.querySelector('.fitment-ai-evidence');
  const buttonRect = applyButton?.getBoundingClientRect();
  const modalRect = document.querySelector('.fitment-flow-modal')?.getBoundingClientRect();
  return {
    priorityColumns: priority ? getComputedStyle(priority).gridTemplateColumns.split(' ').filter(Boolean).length : 0,
    technicalCollapsed: Boolean(technical && !technical.open),
    evidenceCollapsed: Boolean(evidence && !evidence.open),
    buttonFitsModal: Boolean(buttonRect && modalRect && buttonRect.left >= modalRect.left && buttonRect.right <= modalRect.right),
    buttonWidth: buttonRect?.width || 0,
    pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
  };
});
await mobile.screenshot({ path: join(outputDir, 'query-result-mobile.png'), fullPage: true });
await mobile.locator('[data-action="fitment-ai-apply"]').click();
await mobile.locator('.fitment-flow-form[data-step="4"]').waitFor({ state: 'visible', timeout: 5000 });
await mobile.locator('[data-action="fitment-wizard-step"][data-step="3"]').click();
await mobile.locator('.fitment-installed-workspace').waitFor({ state: 'visible', timeout: 5000 });
const mobileAppliedWorkflow = await mobile.evaluate(() => {
  const intake = document.querySelector('details.fitment-ai-intake.is-applied');
  const primary = document.querySelector('.fitment-installed-primary');
  const frontPicker = document.querySelector('[data-fitment-part-picker][data-field="front_brake_id"]');
  const modal = document.querySelector('.fitment-flow-modal');
  const pickerRect = frontPicker?.getBoundingClientRect();
  const modalRect = modal?.getBoundingClientRect();
  return {
    aiSummaryCollapsed: Boolean(intake && !intake.open),
    primaryColumns: primary ? getComputedStyle(primary).gridTemplateColumns.split(' ').filter(Boolean).length : 0,
    frontLabel: frontPicker?.querySelector('[data-part-current-label]')?.textContent || '',
    pickerFitsModal: Boolean(pickerRect && modalRect && pickerRect.left >= modalRect.left && pickerRect.right <= modalRect.right),
    pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
  };
});
await mobile.locator('.fitment-installed-workspace').evaluate(element => {
  const scroll = element.closest('.fitment-flow-scroll');
  if (scroll) scroll.scrollTop = Math.max(0, element.offsetTop - 10);
});
await mobile.screenshot({ path: join(outputDir, 'query-applied-workflow-mobile.png'), fullPage: false });

const extracted = result.extracted || {};
const matches = Array.isArray(result.matched_parts) ? result.matched_parts : [];
const missingNames = (result.missing_fields || []).map(item => item.name);
const checks = {
  api_ok: apiResponse.ok,
  front_gt6_recognized: /brembo/i.test(extracted.front_brake || '') && /gt\s*-?\s*6/i.test(extracted.front_brake || '') && /[六6]\s*活塞|6\s*-?piston/i.test(extracted.front_brake || ''),
  rear_f40_recognized: /brembo/i.test(extracted.rear_brake || '') && /f\s*-?\s*40/i.test(extracted.rear_brake || '') && /[四4]\s*活塞|4\s*-?piston/i.test(extracted.rear_brake || ''),
  current_19_inch_wheel_recognized: /19/.test(extracted.current_wheel_unspecified || ''),
  no_false_component_identity: matches.every(match => !match.selected || /gt\s*-?\s*6|f\s*-?\s*40/i.test(`${match.selected.model || ''} ${match.selected.part_number || ''}`)),
  rotor_dimensions_requested_safely: missingNames.includes('front_rotor_part_number') && missingNames.includes('rear_rotor_part_number'),
  gt6_and_f40_are_selectable: /GT6/i.test(brakeOptionText.front) && /F40/i.test(brakeOptionText.rear),
  spinner_is_visible_and_busy: loading.busy === 'true' && loading.disabled && loading.animationName === 'gpFitmentAiSpin',
  spinner_has_motion_timing: loading.animationDuration !== '0s',
  spinner_button_keeps_readable_width: loading.width >= 240,
  mobile_spinner_fits_without_overflow: mobileLayout.overflow === 0 && mobileLayout.buttonInsideModal && mobileLayout.buttonWidth >= 240,
  result_renders_user_facts: /GT6/i.test(rendered || '') && /F40/i.test(rendered || '') && /19/.test(rendered || ''),
  result_does_not_claim_no_facts: !String(rendered || '').includes('暂未识别到明确的改装件事实'),
  result_has_clear_desktop_hierarchy: desktopHierarchy.priorityColumns === 2 && desktopHierarchy.factsVisible && desktopHierarchy.nextVisible && desktopHierarchy.contentOrder,
  result_prioritizes_next_step: /VIN|配置|年份|车型|销售市场/.test(desktopHierarchy.nextHeading),
  technical_and_evidence_default_collapsed: desktopHierarchy.technicalCollapsed && desktopHierarchy.evidenceCollapsed,
  compact_desktop_apply_action: desktopHierarchy.applyHeight <= 90 && desktopHierarchy.applyButtonHeight <= 48 && desktopHierarchy.applyButtonWidth <= 240,
  desktop_result_has_no_horizontal_overflow: desktopHierarchy.resultOverflow === 0 && desktopHierarchy.pageOverflow === 0,
  technical_details_expand_without_data_loss: desktopTechnical.open && desktopTechnical.bodyVisible && desktopTechnical.preservesGt6AndF40 && desktopTechnical.includesReferencePlan,
  component_picker_search_is_short_and_relevant: pickerSearch.visibleCount >= 2 && pickerSearch.visibleCount <= 8 && /GT6/i.test(pickerSearch.text) && !pickerSearch.hasNativeSelect && pickerSearch.pageOverflow === 0,
  ai_confirm_records_family_ids: /gt6/i.test(appliedDraft.front_brake_id || '') && /f40/i.test(appliedDraft.rear_brake_id || ''),
  ai_confirm_advances_to_measurements: appliedStep === '4',
  applied_picker_no_longer_claims_unmatched: /GT6/i.test(appliedWorkflow.frontLabel) && /F40/i.test(appliedWorkflow.rearLabel),
  production_evidence_is_collapsed_and_nonblocking: appliedWorkflow.productionCollapsed && appliedWorkflow.redProductionFields === 0,
  repeated_component_description_inputs_removed: appliedWorkflow.duplicateVisibleDetailInputs === 0,
  applied_workflow_has_no_horizontal_overflow: appliedWorkflow.pageOverflow === 0,
  mobile_result_stacks_without_overflow: mobileHierarchy.priorityColumns === 1 && mobileHierarchy.pageOverflow === 0 && mobileHierarchy.buttonFitsModal,
  mobile_details_default_collapsed: mobileHierarchy.technicalCollapsed && mobileHierarchy.evidenceCollapsed,
  mobile_applied_summary_is_compact: mobileAppliedWorkflow.aiSummaryCollapsed,
  mobile_component_picker_is_single_column: mobileAppliedWorkflow.primaryColumns === 1 && mobileAppliedWorkflow.pickerFitsModal && mobileAppliedWorkflow.pageOverflow === 0,
  mobile_applied_picker_keeps_identity: /GT6/i.test(mobileAppliedWorkflow.frontLabel),
  no_console_errors: errors.length === 0
};
const pass = Object.values(checks).every(Boolean);
const report = { generated_at: new Date().toISOString(), pass, checks, loading, desktop_hierarchy: desktopHierarchy, desktop_technical: desktopTechnical, picker_search: pickerSearch, applied_step: appliedStep, applied_draft: appliedDraft, applied_workflow: appliedWorkflow, mobile_layout: mobileLayout, mobile_hierarchy: mobileHierarchy, mobile_applied_workflow: mobileAppliedWorkflow, brake_option_text: brakeOptionText, extracted, matches, missing_names: missingNames, errors };
writeFileSync(join(outputDir, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await page.close();
await mobile.close();
await browser.close();
if (!pass) process.exitCode = 1;
