import { createRequire } from 'node:module';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const runtimeModules = process.env.CODEX_NODE_MODULES
  || join(process.env.USERPROFILE || '', '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'node', 'node_modules');
const requireFromRuntime = createRequire(join(runtimeModules, 'qa-4188-migration-loader.cjs'));
const { chromium } = requireFromRuntime('playwright');
const baseUrl = process.env.FBOX_QA_URL || 'http://127.0.0.1:4188';
const executablePath = [
  process.env.QA_BROWSER_EXECUTABLE,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
].filter(Boolean).find(existsSync);
if (!executablePath) throw new Error('No Chromium browser executable found.');

const outputDir = join(process.cwd(), 'qa', '4188-migration');
mkdirSync(outputDir, { recursive: true });
const errors = [];
const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('pageerror', error => errors.push(error.message));

await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
await page.waitForFunction(() => document.querySelectorAll('[data-wf-make] option').length > 60, null, { timeout: 20_000 });
const home = await page.evaluate(() => ({
  title: document.title,
  bodyClass: document.body.className,
  homeRoot: Boolean(document.querySelector('.wf-home')),
  h1: document.querySelector('h1')?.textContent?.trim() || '',
  nav: [...document.querySelectorAll('header .nav-link')].map(item => item.textContent.trim()),
  sections: [...document.querySelectorAll('section[id]')].map(item => item.id),
  fitmentCssMedia: document.querySelector('#fitment-module-styles')?.media || '',
  factoryVideo: document.querySelector('#manufacture video source')?.getAttribute('src') || '',
  vehicleYears: document.querySelectorAll('[data-wf-year] option').length,
  vehicleMakes: document.querySelectorAll('[data-wf-make] option').length,
  vehicleNote: document.querySelector('[data-wf-vehicle-note]')?.textContent?.trim() || '',
  featureImageFilter: getComputedStyle(document.querySelector('.wf-feature img')).filter,
  icpNumber: document.querySelector('.footer-bottom a[href="https://beian.miit.gov.cn/"]')?.textContent?.trim() || '',
  icpPosition: document.querySelector('.footer-bottom a[href="https://beian.miit.gov.cn/"]')?.parentElement === document.querySelector('.footer-bottom span:last-child'),
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
}));
await page.selectOption('[data-wf-year]', '2008');
await page.selectOption('[data-wf-make]', 'Audi');
const homeVehicleDirectory = await page.evaluate(() => ({
  makeValue: document.querySelector('[data-wf-make]')?.value || '',
  models: [...document.querySelectorAll('[data-wf-model] option')].map(option => option.value).filter(Boolean)
}));
await page.screenshot({ path: join(outputDir, 'home-after-sync.png'), fullPage: true });

await page.goto(`${baseUrl}/fitment-lab`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
await page.locator('.fitment-entry-path[data-mode="style-first"]').click();
await page.locator('.fitment-flow-form[data-step="1"]').waitFor();
await page.waitForFunction(() => Number(document.querySelector('[data-fitment-style-catalog]')?.dataset.total || 0) >= 48, null, { timeout: 30_000 });
const catalog = page.locator('[data-fitment-style-catalog]');
const preview = await catalog.evaluate(element => ({
  total: Number(element.dataset.total || 0),
  visibleCards: element.querySelectorAll('.fitment-flow-wheel').length,
  filters: [...element.querySelectorAll('[data-action="fitment-style-filter"]')].map(button => button.dataset.filter),
  hasSearch: Boolean(element.querySelector('[data-fitment-style-search]')),
  hasExpand: Boolean(element.querySelector('[data-action="fitment-style-toggle"]'))
}));
await page.locator('[data-action="fitment-style-toggle"]').click();
const expanded = await catalog.evaluate(element => ({
  cards: element.querySelectorAll('.fitment-flow-wheel').length,
  expanded: element.querySelector('[data-action="fitment-style-toggle"]')?.getAttribute('aria-expanded'),
  nestedScrollRegions: [...element.querySelectorAll('*')].filter(node => ['auto', 'scroll'].includes(getComputedStyle(node).overflowY)).length
}));
await catalog.locator('.fitment-flow-wheel').last().click();
const fitment = await page.evaluate(() => ({
  bodyClass: document.body.className,
  cssMedia: document.querySelector('#fitment-module-styles')?.media || '',
  selectedSummary: document.querySelector('.fitment-style-selection-copy > strong')?.textContent?.trim() || '',
  continuationVisible: Boolean(document.querySelector('[data-fitment-style-continuation]')),
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
}));
await page.screenshot({ path: join(outputDir, 'fitment-style-catalog.png'), fullPage: false });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
mobile.on('console', message => { if (message.type() === 'error') errors.push(`mobile: ${message.text()}`); });
mobile.on('pageerror', error => errors.push(`mobile: ${error.message}`));
await mobile.goto(`${baseUrl}/fitment-lab`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
await mobile.locator('.fitment-entry-path[data-mode="style-first"]').click();
await mobile.locator('[data-action="fitment-style-toggle"]').click();
const mobileFitment = await mobile.evaluate(() => ({
  columns: (() => {
    const grid = document.querySelector('.fitment-style-catalog .fitment-flow-wheel-grid');
    return grid ? getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length : 0;
  })(),
  pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  bodyScrollRegions: [...document.querySelectorAll('.fitment-flow-scroll, .fitment-style-grid')].filter(node => ['auto', 'scroll'].includes(getComputedStyle(node).overflowY)).length
}));
await mobile.screenshot({ path: join(outputDir, 'fitment-mobile.png'), fullPage: false });

await page.evaluate(() => localStorage.setItem('fbox-cookie', 'dismissed'));
await page.goto(`${baseUrl}/?qa=store-showcase#store`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
await page.locator('.forged-product-card').first().waitFor();
await page.waitForFunction(() => document.querySelectorAll('.forged-product-card').length >= 91, null, { timeout: 30_000 });
const storeCatalog = await page.evaluate(() => ({
  cards: document.querySelectorAll('.forged-product-card').length,
  directInquiryButtons: document.querySelectorAll('.forged-product-card [data-action="contact-inquiry"]').length,
  legacyActions: document.querySelectorAll('.forged-product-card [data-action="wishlist"],.forged-product-card [data-action="quick-view"],.forged-product-card [data-action="add-cart"]').length,
  fitmentPrompts: document.querySelectorAll('.catalog-fitment-prompt,.fitment-match-banner').length,
  commercialRows: document.querySelectorAll('.forged-product-card .catalog-proof-row,.forged-product-card .product-deal,.forged-product-card .price-row').length,
  ddpFilters: document.querySelectorAll('.catalog-ddp-filter').length,
  priceSortOptions: document.querySelectorAll('.store-toolbar option[value="price-low"],.store-toolbar option[value="price-high"]').length,
  commercialCardText: [...document.querySelectorAll('.forged-product-card')].some(card => /US\$|DDP|MOQ|起订|参考价|按单生产|made to order/i.test(card.textContent || '')),
  firstDetailHref: document.querySelector('.forged-product-card a[href^="#product/"]')?.getAttribute('href') || '',
  phone: document.querySelector('.header-consult')?.textContent?.replace(/\s+/g, ' ').trim() || '',
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  heroBackground: getComputedStyle(document.querySelector('.forged-catalog-hero')).backgroundImage
}));
await page.screenshot({ path: join(outputDir, 'store-showcase-only.png'), fullPage: false });
await page.locator('.forged-product-card [data-action="contact-inquiry"]').first().click();
await page.locator('.contact-inquiry-modal').waitFor();
await page.waitForFunction(() => document.querySelector('[data-contact-qr]')?.complete && document.querySelector('[data-contact-qr]')?.naturalWidth > 0);
const contactInquiry = await page.evaluate(() => ({
  nameAndPhone: document.querySelector('.contact-inquiry-phone')?.textContent?.replace(/\s+/g, ' ').trim() || '',
  priceLine: document.querySelector('.contact-inquiry-product span')?.textContent?.replace(/\s+/g, ' ').trim() || '',
  telephoneHref: document.querySelector('.contact-inquiry-phone')?.getAttribute('href') || '',
  qrSrc: document.querySelector('[data-contact-qr]')?.getAttribute('src') || '',
  qrWidth: document.querySelector('[data-contact-qr]')?.naturalWidth || 0,
  qrHeight: document.querySelector('[data-contact-qr]')?.naturalHeight || 0
}));
await page.screenshot({ path: join(outputDir, 'store-contact-inquiry.png'), fullPage: false });

await page.goto(`${baseUrl}/?qa=showcase-product${storeCatalog.firstDetailHref}`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
await page.locator('.forged-detail').waitFor();
const productDetail = await page.evaluate(() => ({
  priceBlocks: document.querySelectorAll('.forged-detail .detail-price,.forged-detail .detail-set').length,
  commercialSpecs: [...document.querySelectorAll('.forged-specs .spec > span')].filter(node => /minimum order|最低起订量|DDP/i.test(node.textContent || '')).length,
  ddpBlocks: [...document.querySelectorAll('.forged-detail *')].filter(node => node.children.length === 0 && /DDP delivery|DDP 区域|完税到门/i.test(node.textContent || '')).length,
  inquiryButtons: document.querySelectorAll('.forged-detail .detail-purchase [data-action="contact-inquiry"]').length,
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
}));
await page.screenshot({ path: join(outputDir, 'store-product-showcase.png'), fullPage: false });

const mobileStore = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobileStore.addInitScript(() => localStorage.setItem('fbox-cookie', 'dismissed'));
await mobileStore.goto(`${baseUrl}/?qa=store-showcase-mobile#store`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
await mobileStore.locator('.forged-product-card').first().waitFor();
await mobileStore.waitForFunction(() => document.querySelectorAll('.forged-product-card').length >= 91, null, { timeout: 30_000 });
const mobileStoreCatalog = await mobileStore.evaluate(() => {
  const hero = document.querySelector('.forged-catalog-hero');
  const heading = hero?.querySelector('h1');
  const tabs = hero?.querySelector('.catalog-collection-tabs');
  return {
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    heroOverflow: hero ? hero.scrollWidth - hero.clientWidth : -1,
    headingOverflow: heading ? heading.scrollWidth - heading.clientWidth : -1,
    tabsOverflow: tabs ? tabs.scrollWidth - tabs.clientWidth : -1
  };
});
await mobileStore.locator('.forged-product-card [data-action="contact-inquiry"]').first().click();
await mobileStore.locator('.contact-inquiry-modal').waitFor();
await mobileStore.screenshot({ path: join(outputDir, 'store-contact-inquiry-mobile.png'), fullPage: false });

const adminUsername = process.env.FBOX_ADMIN_USERNAME || 'admin';
const adminPassword = process.env.FBOX_ADMIN_PASSWORD || '3125002';
const loginResponse = await page.request.post(`${baseUrl}/api/admin/login`, { data: { username: adminUsername, password: adminPassword } });
const loginPayload = await loginResponse.json();
const adminToken = `${loginPayload?.data?.tokenHead || 'Bearer '}${loginPayload?.data?.token || ''}`.trim();
const adminProductsResponse = await page.request.get(`${baseUrl}/api/fbox-ops/products`, { headers: { Authorization: adminToken } });
const adminProductsPayload = await adminProductsResponse.json();
const adminPublicWheels = (adminProductsPayload?.data || []).filter(item => item.category === 'Wheels' && item.status === 'published' && item.public_scope !== false);
const backendCatalog = {
  count: adminPublicWheels.length,
  blankCommercial: adminPublicWheels.filter(item => item.price === null
    && item.oldPrice === null
    && item.price_mode === 'inquiry'
    && String(item.currency || '') === ''
    && item.minimum_quantity === null
    && String(item.deal || '') === ''
    && Array.isArray(item.ddp_regions) && item.ddp_regions.length === 0
    && String(item.ddp_quote_basis || '') === ''
    && String(item.lead_time_note || '') === '').length
};
const adminPage = await browser.newPage({ viewport: { width: 1440, height: 960 } });
await adminPage.addInitScript(token => localStorage.setItem('fbox-console-token', token), adminToken);
await adminPage.goto(`${baseUrl}/admin/site-assets`, { waitUntil: 'networkidle', timeout: 30_000 });
await adminPage.waitForFunction(() => document.querySelectorAll('[data-site-asset-card]').length >= 42);
const adminAssets = await adminPage.evaluate(() => ({
  cards: document.querySelectorAll('[data-site-asset-card]').length,
  images: document.querySelectorAll('[data-site-asset-type="image"]').length,
  videos: document.querySelectorAll('[data-site-asset-type="video"]').length,
  qrPreview: Boolean(document.querySelector('[data-site-asset-card="contact-wechat-qr"] img')),
  submitButtons: document.querySelectorAll('[data-site-asset-submit]').length,
  disabledBeforeSelection: [...document.querySelectorAll('[data-site-asset-submit]')].every(button => button.disabled),
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
}));
await adminPage.screenshot({ path: join(outputDir, 'admin-site-assets.png'), fullPage: false });

const statusPaths = ['/', '/fitment-lab', '/admin', '/admin/fitment-lab', '/admin/site-assets', '/data/fbox-vehicle-directory.json'];
const statuses = Object.fromEntries(await Promise.all(statusPaths.map(async path => [path, (await fetch(`${baseUrl}${path}`)).status])));
const videoResponse = await fetch(`${baseUrl}/assets/domestic/videos/cerui-factory-story-720p30-web.mp4`, { headers: { Range: 'bytes=0-1023' } });
const video = {
  status: videoResponse.status,
  bytes: (await videoResponse.arrayBuffer()).byteLength,
  contentRange: videoResponse.headers.get('content-range') || '',
  contentType: videoResponse.headers.get('content-type') || ''
};
const [adminEditorBundle, adminProductListBundle] = await Promise.all([
  fetch(`${baseUrl}/admin/assets/editor-B9801bQF.js`).then(response => response.text()),
  fetch(`${baseUrl}/admin/assets/index-Cj747VX4.js`).then(response => response.text())
]);
const [gt6Response, f40Response] = await Promise.all([
  fetch(`${baseUrl}/api/fbox-content/fitment/parts?q=GT6`),
  fetch(`${baseUrl}/api/fbox-content/fitment/parts?q=F40`)
]);
const partText = JSON.stringify([await gt6Response.json(), await f40Response.json()]);

const checks = {
  domestic_home_preserved: home.homeRoot && home.bodyClass.includes('domestic-home-active') && home.h1 === '始终领先一步。',
  domestic_navigation_preserved: JSON.stringify(home.nav) === JSON.stringify(['首页', '轮毂系列', '适配实验室', 'AI 原创设计NEW', '制造实力', '全国网络', '视频专区', '关于策锐']),
  domestic_sections_preserved: JSON.stringify(home.sections) === JSON.stringify(['vehicle', 'manufacture', 'wheels', 'technology', 'videos', 'network']),
  fitment_css_isolated_from_home: home.fitmentCssMedia === 'not all' && !home.bodyClass.includes('fbox-global-premium'),
  factory_video_present: home.factoryVideo.includes('cerui-factory-story-720p30-web.mp4'),
  home_vehicle_directory_connected: home.vehicleYears === 34 && home.vehicleMakes === 70 && home.vehicleNote.includes('19236'),
  home_vehicle_year_filter_works: homeVehicleDirectory.makeValue === 'Audi' && homeVehicleDirectory.models.length === 16 && ['A3', 'A4', 'A5', 'R8', 'S4', 'TTS'].every(model => homeVehicleDirectory.models.includes(model)),
  feature_images_keep_original_color: !home.featureImageFilter.includes('grayscale') && home.featureImageFilter.includes('saturate'),
  icp_filing_visible_in_footer: home.icpNumber === '浙ICP备2026075816号-1' && home.icpPosition,
  home_no_overflow: home.overflow === 0,
  fitment_module_styles_active: fitment.bodyClass.includes('fbox-global-premium') && fitment.cssMedia === 'all',
  wheel_catalog_preview: preview.total >= 48 && preview.visibleCards === 8 && preview.hasSearch && preview.hasExpand,
  wheel_catalog_filters: ['all', 'monoblock', 'two-piece'].every(filter => preview.filters.includes(filter)),
  wheel_catalog_expands_all: expanded.cards === preview.total && expanded.expanded === 'true',
  wheel_selection_confirmed: Boolean(fitment.selectedSummary) && fitment.continuationVisible,
  fitment_desktop_no_overflow: fitment.overflow === 0,
  fitment_mobile_two_columns: mobileFitment.columns === 2,
  fitment_mobile_no_overflow: mobileFitment.pageOverflow === 0,
  store_showcase_only: storeCatalog.cards === 91 && storeCatalog.directInquiryButtons === storeCatalog.cards && storeCatalog.legacyActions === 0,
  store_commercial_rows_removed: storeCatalog.fitmentPrompts === 0 && storeCatalog.commercialRows === 0 && storeCatalog.ddpFilters === 0 && storeCatalog.priceSortOptions === 0 && !storeCatalog.commercialCardText,
  store_contact_updated: /李炜/.test(contactInquiry.nameAndPhone) && /186\s*5819\s*1106/.test(contactInquiry.nameAndPhone) && contactInquiry.telephoneHref === 'tel:+8618658191106',
  store_price_is_chinese_inquiry_copy: contactInquiry.priceLine.includes('价格请咨询') && !/US\$|\$\d/.test(contactInquiry.priceLine),
  store_wechat_qr_ready: contactInquiry.qrSrc.includes('cerui-wechat-contact-qr.webp') && contactInquiry.qrWidth > 0 && contactInquiry.qrHeight > 0,
  product_detail_is_showcase_only: productDetail.priceBlocks === 0 && productDetail.commercialSpecs === 0 && productDetail.ddpBlocks === 0 && productDetail.inquiryButtons === 1 && productDetail.overflow === 0,
  store_mobile_no_overflow: Object.values(mobileStoreCatalog).every(value => value === 0),
  store_hero_has_contrast_background: /linear-gradient/i.test(storeCatalog.heroBackground) && !/rgb\(255, 255, 255\)/.test(storeCatalog.heroBackground),
  admin_asset_manager_ready: loginResponse.ok() && adminAssets.cards === 42 && adminAssets.images === 36 && adminAssets.videos === 6 && adminAssets.qrPreview && adminAssets.submitButtons === 42 && adminAssets.disabledBeforeSelection && adminAssets.overflow === 0,
  admin_product_values_are_blank: adminProductsResponse.ok() && backendCatalog.count === 91 && backendCatalog.blankCommercial === backendCatalog.count,
  admin_product_ui_accepts_blank_price: adminEditorBundle.includes('价格可留空') && adminEditorBundle.includes('price:null,price_mode:"inquiry"') && !adminEditorBundle.includes('!o.name.trim()||!o.category||!o.price||!f.value.length') && adminProductListBundle.includes('价格请咨询'),
  routes_and_admin_available: Object.values(statuses).every(status => status === 200),
  video_byte_range_supported: video.status === 206 && video.bytes === 1024 && video.contentRange.startsWith('bytes 0-1023/'),
  brake_catalog_synced: gt6Response.ok && f40Response.ok && /GT6/i.test(partText) && /F40/i.test(partText),
  no_console_errors: errors.length === 0
};
const pass = Object.values(checks).every(Boolean);
const report = { generated_at: new Date().toISOString(), pass, checks, home, homeVehicleDirectory, preview, expanded, fitment, mobileFitment, storeCatalog, contactInquiry, productDetail, mobileStoreCatalog, backendCatalog, adminAssets, statuses, video, errors };
writeFileSync(join(outputDir, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await mobile.close();
await mobileStore.close();
await adminPage.close();
await page.close();
await browser.close();
if (!pass) process.exitCode = 1;
