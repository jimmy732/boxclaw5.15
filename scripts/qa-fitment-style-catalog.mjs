import { createRequire } from 'node:module';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const runtimeModules = process.env.CODEX_NODE_MODULES
  || join(process.env.USERPROFILE || '', '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'node', 'node_modules');
const requireFromRuntime = createRequire(join(runtimeModules, 'qa-fitment-style-catalog-loader.cjs'));
const { chromium } = requireFromRuntime('playwright');
const baseUrl = process.env.FBOX_QA_URL || 'http://127.0.0.1:4174';
const executablePath = [
  process.env.QA_BROWSER_EXECUTABLE,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
].filter(Boolean).find(existsSync);
if (!executablePath) throw new Error('No Chromium browser executable found.');

const outputDir = join(process.cwd(), 'qa', 'fitment-style-catalog');
mkdirSync(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath });
const errors = [];

function trackErrors(page, name) {
  page.on('console', message => { if (message.type() === 'error') errors.push(`${name}: ${message.text()}`); });
  page.on('pageerror', error => errors.push(`${name}: ${error.message}`));
}

async function openStyleFirst(page, entryScreenshot = '') {
  await page.goto(`${baseUrl}/fitment-lab`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.evaluate(() => {
    localStorage.setItem('fbox-locale', 'zh-CN');
    localStorage.setItem('fbox-locale-mode', 'manual');
    localStorage.removeItem('fbox-fitment-draft');
    localStorage.removeItem('fbox-vehicle');
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(300);
  if (entryScreenshot) await page.screenshot({ path: join(outputDir, entryScreenshot), fullPage: true });
  await page.locator('.fitment-entry-path[data-mode="style-first"]').click();
  await page.locator('.fitment-flow-form[data-step="1"]').waitFor();
  await page.waitForFunction(() => Number(document.querySelector('[data-fitment-style-catalog]')?.dataset.total || 0) >= 40, null, { timeout: 15_000 });
}

const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1 });
trackErrors(page, 'desktop');
await openStyleFirst(page, 'desktop-entry-page.png');

const catalog = page.locator('[data-fitment-style-catalog]');
const projectNameInput = page.locator('[data-fitment-style-continuation] input[name="project_title"]');
const placeholderInitial = await projectNameInput.evaluate(element => {
  const placeholder = getComputedStyle(element, '::placeholder');
  const input = getComputedStyle(element);
  return {
    value: element.value,
    text: element.placeholder,
    color: placeholder.color,
    opacity: Number(placeholder.opacity),
    inputColor: input.color
  };
});
await projectNameInput.focus();
await page.waitForTimeout(180);
const placeholderFocused = await projectNameInput.evaluate(element => ({
  opacity: Number(getComputedStyle(element, '::placeholder').opacity),
  color: getComputedStyle(element, '::placeholder').color
}));
await projectNameInput.fill('客户保留值');
await page.locator('[data-fitment-style-continuation] select[name="usage"]').focus();
await projectNameInput.focus();
const enteredValueAfterRefocus = await projectNameInput.inputValue();
const initial = await catalog.evaluate(element => ({
  filter: element.dataset.filter,
  total: Number(element.dataset.total),
  visible: Number(element.dataset.visible),
  cards: element.querySelectorAll('.fitment-flow-wheel').length,
  label: element.querySelector('header strong')?.textContent?.trim() || '',
  filters: [...element.querySelectorAll('[data-action="fitment-style-filter"]')].map(button => button.textContent?.replace(/\s+/g, ' ').trim())
}));

await page.locator('[data-fitment-style-search]').fill('SV100');
await page.waitForFunction(() => document.querySelector('[data-fitment-style-catalog]')?.dataset.total === '1');
const search = await catalog.evaluate(element => ({
  total: Number(element.dataset.total),
  cards: element.querySelectorAll('.fitment-flow-wheel').length,
  name: element.querySelector('.fitment-flow-wheel-copy > strong')?.textContent?.trim() || ''
}));
await page.locator('[data-action="fitment-style-search-clear"]').first().click();
await page.waitForFunction(() => document.querySelector('[data-fitment-style-catalog]')?.dataset.total === '48');

await page.locator('[data-action="fitment-style-filter"][data-filter="monoblock"]').click();
await page.waitForFunction(() => document.querySelector('[data-fitment-style-catalog]')?.dataset.filter === 'monoblock');
const monoblock = await catalog.evaluate(element => ({
  total: Number(element.dataset.total),
  visible: Number(element.dataset.visible),
  constructions: [...element.querySelectorAll('.fitment-flow-wheel')].map(button => button.dataset.construction)
}));

await page.locator('[data-action="fitment-style-filter"][data-filter="two-piece"]').click();
await page.waitForFunction(() => document.querySelector('[data-fitment-style-catalog]')?.dataset.filter === 'two-piece');
const twoPiece = await catalog.evaluate(element => ({
  total: Number(element.dataset.total),
  visible: Number(element.dataset.visible),
  constructions: [...element.querySelectorAll('.fitment-flow-wheel')].map(button => button.dataset.construction),
  hasToggle: Boolean(element.querySelector('[data-action="fitment-style-toggle"]'))
}));

await page.locator('[data-action="fitment-style-filter"][data-filter="all"]').click();
await page.locator('[data-action="fitment-style-toggle"]').click();
await page.waitForFunction(() => document.querySelector('[data-fitment-style-catalog]')?.classList.contains('is-expanded'));
await page.waitForFunction(() => [...document.querySelectorAll('[data-fitment-style-catalog] .fitment-flow-wheel img')].slice(0, 12).every(image => image.complete && image.naturalWidth > 0), null, { timeout: 15_000 });
const expanded = await catalog.evaluate(element => ({
  total: Number(element.dataset.total),
  visible: Number(element.dataset.visible),
  cards: element.querySelectorAll('.fitment-flow-wheel').length,
  expanded: element.querySelector('[data-action="fitment-style-toggle"]')?.getAttribute('aria-expanded')
}));
const expandedViewport = await page.evaluate(() => {
  const scroller = document.querySelector('.fitment-flow-scroll');
  const grid = document.querySelector('[data-fitment-style-catalog] .fitment-flow-wheel-grid');
  if (!scroller || !grid) return { nestedOverflow: -1, fullyVisibleRows: 0 };
  const scrollerRect = scroller.getBoundingClientRect();
  const fullyVisible = [...grid.querySelectorAll('.fitment-flow-wheel')].filter(card => {
    const rect = card.getBoundingClientRect();
    return rect.top >= scrollerRect.top && rect.bottom <= scrollerRect.bottom;
  });
  return {
    nestedOverflow: grid.scrollHeight - grid.clientHeight,
    fullyVisibleRows: new Set(fullyVisible.map(card => Math.round(card.getBoundingClientRect().top))).size
  };
});
await page.screenshot({ path: join(outputDir, 'desktop-browse-expanded.png') });
const lastWheel = catalog.locator('.fitment-flow-wheel').last();
const selectedName = (await lastWheel.locator('strong').textContent())?.trim() || '';
await lastWheel.click();
await page.waitForTimeout(550);
await page.waitForFunction(() => {
  const image = document.querySelector('[data-fitment-selected-style] img');
  return Boolean(image?.complete && image.naturalWidth > 0);
}, null, { timeout: 15_000 });
const selectedSummary = (await page.locator('.fitment-style-selection-copy > strong').textContent())?.trim() || '';
const desktopLayout = await page.evaluate(() => ({
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  uploadExists: Boolean(document.querySelector('[data-fitment-style-upload]')),
  selectedCount: document.querySelectorAll('.fitment-flow-wheel.is-selected').length,
  inlineSummaryText: document.querySelector('[data-fitment-selected-style]')?.textContent?.replace(/\s+/g, ' ').trim() || '',
  inlineSummaryImageLoaded: (() => {
    const image = document.querySelector('[data-fitment-selected-style] img');
    return Boolean(image?.complete && image.naturalWidth > 0);
  })(),
  modalScrollTop: document.querySelector('.fitment-flow-modal')?.scrollTop || 0,
  continuationVisible: (() => {
    const scroller = document.querySelector('.fitment-flow-scroll');
    const continuation = document.querySelector('[data-fitment-style-continuation]');
    if (!scroller || !continuation) return false;
    const scrollerRect = scroller.getBoundingClientRect();
    const continuationRect = continuation.getBoundingClientRect();
    return continuationRect.top >= scrollerRect.top && continuationRect.bottom <= scrollerRect.bottom;
  })(),
  continuationScrollTop: document.querySelector('.fitment-flow-scroll')?.scrollTop || 0,
  modalFooterGap: (() => {
    const modal = document.querySelector('.fitment-flow-modal')?.getBoundingClientRect();
    const footer = document.querySelector('.fitment-flow-footer')?.getBoundingClientRect();
    return modal && footer ? Math.round(modal.bottom - footer.bottom) : -1;
  })()
}));
await page.screenshot({ path: join(outputDir, 'desktop-all-expanded.png'), fullPage: true });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
trackErrors(mobile, 'mobile');
await openStyleFirst(mobile, 'mobile-entry-page.png');
await mobile.locator('[data-action="fitment-style-toggle"]').click();
await mobile.waitForFunction(() => document.querySelector('[data-fitment-style-catalog]')?.classList.contains('is-expanded'));
await mobile.locator('[data-fitment-style-catalog] .fitment-flow-wheel').first().click();
await mobile.waitForTimeout(550);
await mobile.waitForFunction(() => {
  const image = document.querySelector('[data-fitment-selected-style] img');
  return Boolean(image?.complete && image.naturalWidth > 0);
}, null, { timeout: 15_000 });
const mobileLayout = await mobile.evaluate(() => {
  const grid = document.querySelector('.fitment-style-catalog .fitment-flow-wheel-grid');
  const columns = grid ? getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length : 0;
  const scroller = document.querySelector('.fitment-flow-scroll');
  const continuation = document.querySelector('[data-fitment-style-continuation]');
  const scrollerRect = scroller?.getBoundingClientRect();
  const continuationRect = continuation?.getBoundingClientRect();
  return {
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    columns,
    cards: grid?.querySelectorAll('.fitment-flow-wheel').length || 0,
    filterWidth: document.querySelector('.fitment-style-filter')?.getBoundingClientRect().width || 0,
    viewportWidth: document.documentElement.clientWidth,
    inlineSummaryFits: (() => {
      const summary = document.querySelector('[data-fitment-selected-style]');
      const fields = document.querySelector('[data-fitment-style-continuation]');
      if (!summary || !fields) return false;
      const summaryRect = summary.getBoundingClientRect();
      const fieldsRect = fields.getBoundingClientRect();
      return summaryRect.left >= fieldsRect.left && summaryRect.right <= fieldsRect.right && summaryRect.width > 250;
    })(),
    modalScrollTop: document.querySelector('.fitment-flow-modal')?.scrollTop || 0,
    continuationVisible: Boolean(scrollerRect && continuationRect && continuationRect.top >= scrollerRect.top && continuationRect.bottom <= scrollerRect.bottom),
    continuationScrollTop: scroller?.scrollTop || 0
  };
});
await mobile.screenshot({ path: join(outputDir, 'mobile-all-expanded.png'), fullPage: true });

const english = await browser.newPage({ viewport: { width: 1100, height: 760 }, deviceScaleFactor: 1 });
trackErrors(english, 'english-placeholder');
await english.goto(`${baseUrl}/fitment-lab`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
await english.evaluate(() => {
  localStorage.setItem('fbox-locale', 'en');
  localStorage.setItem('fbox-locale-mode', 'manual');
  localStorage.removeItem('fbox-fitment-draft');
  localStorage.removeItem('fbox-vehicle');
});
await english.reload({ waitUntil: 'domcontentloaded' });
await english.locator('.fitment-entry-path[data-mode="style-first"]').click();
await english.locator('.fitment-flow-form[data-step="1"]').waitFor();
const englishProject = english.locator('[data-fitment-style-continuation] input[name="project_title"]');
const englishPlaceholder = {
  value: await englishProject.inputValue(),
  text: await englishProject.getAttribute('placeholder')
};
const localizedPlaceholders = {};
for (const locale of ['zh-TW', 'ja', 'ko', 'de', 'fr', 'es', 'it', 'pt-BR', 'ru', 'ar', 'nl', 'tr', 'pl', 'vi', 'th', 'id', 'hi']) {
  await english.evaluate(code => {
    localStorage.setItem('fbox-locale', code);
    localStorage.setItem('fbox-locale-mode', 'manual');
    localStorage.removeItem('fbox-fitment-draft');
  }, locale);
  await english.reload({ waitUntil: 'domcontentloaded' });
  await english.locator('.fitment-entry-path[data-mode="style-first"]').click();
  await english.locator('.fitment-flow-form[data-step="1"]').waitFor();
  localizedPlaceholders[locale] = await english.locator('[data-fitment-style-continuation] input[name="project_title"]').getAttribute('placeholder');
}

const checks = {
  examples_are_not_prefilled_values: placeholderInitial.value === '' && englishPlaceholder.value === '',
  chinese_placeholder_is_localized: placeholderInitial.text.includes('示例') && !placeholderInitial.text.includes('street setup'),
  english_placeholder_is_localized: englishPlaceholder.text === 'Example: C43 street setup',
  all_supported_locale_placeholders_localize_immediately: Object.values(localizedPlaceholders).length === 17 && Object.values(localizedPlaceholders).every(value => value && value !== englishPlaceholder.text),
  placeholder_is_visually_quiet: placeholderInitial.opacity < 1 && placeholderInitial.color !== placeholderInitial.inputColor,
  placeholder_hides_on_focus: placeholderFocused.opacity === 0 || placeholderFocused.color === 'rgba(0, 0, 0, 0)',
  real_user_value_survives_refocus: enteredValueAfterRefocus === '客户保留值',
  chinese_catalog_heading: initial.label === '浏览全部可选轮毂',
  chinese_filter_labels: initial.filters.some(label => label.includes('全部轮毂')) && initial.filters.some(label => label.includes('单片锻造')) && initial.filters.some(label => label.includes('双片锻造')),
  default_all_preview: initial.filter === 'all' && initial.total === 48 && initial.visible === 8 && initial.cards === 8,
  search_filters_instantly: search.total === 1 && search.cards === 1 && search.name === 'SV100',
  monoblock_filter: monoblock.total === 36 && monoblock.visible === 8 && monoblock.constructions.every(value => value === 'monoblock'),
  two_piece_filter: twoPiece.total === 6 && twoPiece.visible === 6 && !twoPiece.hasToggle && twoPiece.constructions.every(value => value === 'two-piece'),
  view_all_expands_every_wheel: expanded.total === 48 && expanded.visible === 48 && expanded.cards === 48 && expanded.expanded === 'true',
  expanded_catalog_uses_one_scroll_region: expandedViewport.nestedOverflow === 0,
  expanded_catalog_shows_three_rows: expandedViewport.fullyVisibleRows >= 3,
  wheel_selection_survives_expanded_catalog: selectedName && selectedName === selectedSummary && desktopLayout.selectedCount === 1,
  selected_style_confirmation_renders: desktopLayout.inlineSummaryText.includes(selectedName) && desktopLayout.inlineSummaryImageLoaded,
  expanded_catalog_keeps_modal_frame_locked: desktopLayout.modalScrollTop === 0 && Math.abs(desktopLayout.modalFooterGap) <= 4,
  wheel_selection_moves_to_continuation: desktopLayout.continuationVisible && desktopLayout.continuationScrollTop > 0,
  reference_upload_preserved: desktopLayout.uploadExists,
  desktop_no_overflow: desktopLayout.overflow === 0,
  mobile_two_column_catalog: mobileLayout.columns === 2 && mobileLayout.cards === 48,
  mobile_selected_style_confirmation_fits: mobileLayout.inlineSummaryFits,
  mobile_selection_moves_to_continuation: mobileLayout.modalScrollTop === 0 && mobileLayout.continuationVisible && mobileLayout.continuationScrollTop > 0,
  mobile_no_overflow: mobileLayout.overflow === 0 && mobileLayout.filterWidth <= mobileLayout.viewportWidth,
  no_console_errors: errors.length === 0
};
const pass = Object.values(checks).every(Boolean);
const report = { generated_at: new Date().toISOString(), pass, checks, placeholderInitial, placeholderFocused, enteredValueAfterRefocus, englishPlaceholder, localizedPlaceholders, initial, search, monoblock, twoPiece, expanded, expandedViewport, desktopLayout, mobileLayout, errors };
writeFileSync(join(outputDir, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await mobile.close();
await english.close();
await page.close();
await browser.close();
if (!pass) process.exitCode = 1;
