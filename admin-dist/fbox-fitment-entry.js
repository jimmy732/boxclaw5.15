const ICONS = {
  overview: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  product: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="m4 7 8 4 8-4v10l-8 4-8-4V7Z"/><path d="M12 11v10"/></svg>',
  order: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12l2 5H4l2-5Z"/><path d="M5 8v13h14V8"/><path d="M9 12h6"/></svg>',
  customers: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2"/><path d="M16 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5"/></svg>',
  inquiry: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/><path d="M8 9h8M8 13h5"/></svg>',
  vehicle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 11 2-5h10l2 5"/><path d="M3 11h18v7H3z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
  review: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/></svg>',
  image: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m3 17 5-5 4 4 3-3 6 6"/></svg>',
  lab: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6M10 3v5l-5 9a3 3 0 0 0 2.6 4h8.8a3 3 0 0 0 2.6-4l-5-9V3"/><path d="M8 15h8"/></svg>',
  ai: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z"/><path d="m18 14 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z"/><path d="M5 13v8M1 17h8"/></svg>',
  settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>',
  analytics: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6M21 3l-9 9"/><path d="M18 13v7H4V6h7"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  collapse: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
};

const NAV_GROUPS = [
  {
    label: '工作台',
    items: [
      { label: '运营工作台', href: '#/operations/index', icon: 'overview', routes: ['/operations'] },
    ],
  },
  {
    label: '交易',
    items: [
      { label: '商品与库存', href: '#/pms/product', icon: 'product', routes: ['/pms'] },
      { label: '订单与售后', href: '#/oms/order', icon: 'order', routes: ['/oms'] },
      { label: '客户管理', href: '#/customers/index', icon: 'customers', routes: ['/customers'] },
      { label: '询价线索', href: '#/inquiries/index', icon: 'inquiry', routes: ['/inquiries'] },
    ],
  },
  {
    label: '内容与车型',
    items: [
      { label: '车型适配', href: '#/vehicle-library/index', icon: 'vehicle', routes: ['/vehicle-library'] },
      { label: '评价与案例', href: '#/reviews/index', icon: 'review', routes: ['/reviews'] },
      { label: '店铺装修素材', href: '/admin/site-assets', icon: 'image', routes: [] },
    ],
  },
  {
    label: '工具与系统',
    items: [
      { label: '轮毂定制实验室', href: '/admin/fitment-lab', icon: 'lab', routes: [] },
      { label: 'AI 效果图配置', href: '#/fbox/visualizer', icon: 'ai', routes: ['/fbox/visualizer'] },
      { label: '站点与接口设置', href: '#/fbox/settings', icon: 'settings', routes: ['/fbox/settings'] },
      { label: '数据面板', href: '#/analytics/index', icon: 'analytics', routes: ['/analytics'] },
    ],
  },
];

const ADVANCED_ITEMS = [
  { label: 'F-Box 状态总览', href: '#/fbox/overview', icon: 'overview', routes: ['/fbox/overview', '/home'] },
  { label: '添加商品', href: '#/pms/addProduct', icon: 'product', routes: ['/pms/addProduct', '/pms/updateProduct'] },
  { label: '商品分类', href: '#/pms/productCate', icon: 'product', routes: ['/pms/productCate'] },
  { label: '订单设置', href: '#/oms/orderSetting', icon: 'order', routes: ['/oms/orderSetting'] },
  { label: '营销活动', href: '#/sms/flash', icon: 'analytics', routes: ['/sms'] },
  { label: '账号与权限', href: '#/ums/admin', icon: 'settings', routes: ['/ums'] },
];

const ROUTE_LABELS = [
  ['/operations', '运营工作台'],
  ['/inquiries', '询价线索'],
  ['/reviews', '评价与案例'],
  ['/vehicle-library', '车型适配'],
  ['/pms', '商品与库存'],
  ['/oms', '订单与售后'],
  ['/customers', '客户管理'],
  ['/analytics', '数据面板'],
  ['/fbox/visualizer', 'AI 效果图配置'],
  ['/fbox/settings', '站点与接口设置'],
  ['/fbox', 'F-Box 状态总览'],
  ['/sms', '营销活动'],
  ['/ums', '账号与权限'],
];

function navLink(item) {
  return `<a class="cirui-nav-link" href="${item.href}" data-nav-label="${item.label.toLowerCase()}" data-routes="${item.routes.join('|')}" title="${item.label}">${ICONS[item.icon]}<span>${item.label}</span></a>`;
}

function sidebarTemplate() {
  const groups = NAV_GROUPS.map((group) => `
    <section class="cirui-nav-group" data-nav-group>
      <span class="cirui-nav-group-title">${group.label}</span>
      ${group.items.map(navLink).join('')}
    </section>`).join('');
  return `
    <aside id="cirui-admin-sidebar" aria-label="后台主导航">
      <header class="cirui-sidebar-head">
        <span class="cirui-brand-mark" aria-hidden="true">CR</span>
        <div class="cirui-brand-copy"><strong>CIRUI OPS</strong><span>Forcarbox Admin</span></div>
        <button id="cirui-sidebar-collapse" class="cirui-icon-button" type="button" aria-label="收起导航">${ICONS.collapse}</button>
      </header>
      <label class="cirui-search-wrap">
        <span class="sr-only">搜索后台功能</span>
        ${ICONS.search}
        <input id="cirui-nav-search" type="search" autocomplete="off" placeholder="搜索功能…" />
        <kbd class="cirui-search-key">/</kbd>
      </label>
      <nav class="cirui-nav-scroll">
        ${groups}
        <details class="cirui-nav-advanced" data-nav-group>
          <summary>更多管理功能</summary>
          ${ADVANCED_ITEMS.map(navLink).join('')}
        </details>
      </nav>
      <footer class="cirui-sidebar-foot">
        <a href="/" target="_blank" rel="noopener"><span>打开用户端网站</span>${ICONS.external}</a>
      </footer>
    </aside>
    <button id="cirui-mobile-toggle" class="cirui-mobile-toggle" type="button" aria-label="打开后台导航">${ICONS.menu}</button>`;
}

function currentRoute() {
  return window.location.hash.replace(/^#/, '') || '/fbox/overview';
}

function routeLabel(route = currentRoute()) {
  return ROUTE_LABELS.find(([prefix]) => route.startsWith(prefix))?.[1] || '运营后台';
}

function updateActiveNavigation() {
  const route = currentRoute();
  document.querySelectorAll('#cirui-admin-sidebar .cirui-nav-link').forEach((link) => {
    const prefixes = String(link.dataset.routes || '').split('|').filter(Boolean);
    const isActive = prefixes.some((prefix) => route.startsWith(prefix));
    link.classList.toggle('is-active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
    if (isActive && link.closest('details')) link.closest('details').open = true;
  });
  const context = document.querySelector('.cirui-topbar-context strong');
  if (context) context.textContent = routeLabel(route);
}

function filterNavigation(query) {
  const normalized = query.trim().toLowerCase();
  document.querySelectorAll('#cirui-admin-sidebar [data-nav-group]').forEach((group) => {
    const links = [...group.querySelectorAll('.cirui-nav-link')];
    links.forEach((link) => {
      link.hidden = Boolean(normalized) && !link.dataset.navLabel.includes(normalized);
    });
    group.hidden = links.length > 0 && links.every((link) => link.hidden);
    if (normalized && group.tagName === 'DETAILS' && !group.hidden) group.open = true;
  });
}

function setCollapsed(collapsed) {
  document.body.classList.toggle('cirui-sidebar-collapsed', collapsed);
  localStorage.setItem('cirui-admin-sidebar-collapsed', collapsed ? '1' : '0');
}

function installAdminShell() {
  if (!document.querySelector('.sidebar-container') || document.getElementById('cirui-admin-sidebar')) return;
  document.body.insertAdjacentHTML('beforeend', sidebarTemplate());
  document.body.classList.add('cirui-admin-ready');
  setCollapsed(localStorage.getItem('cirui-admin-sidebar-collapsed') === '1');

  const search = document.getElementById('cirui-nav-search');
  document.getElementById('cirui-sidebar-collapse')?.addEventListener('click', () => {
    setCollapsed(!document.body.classList.contains('cirui-sidebar-collapsed'));
  });
  document.getElementById('cirui-mobile-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('cirui-mobile-nav-open');
  });
  search?.addEventListener('input', () => filterNavigation(search.value));
  search?.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      search.value = '';
      filterNavigation('');
      search.blur();
    }
  });
  document.querySelectorAll('#cirui-admin-sidebar .cirui-nav-link').forEach((link) => {
    link.addEventListener('click', () => document.body.classList.remove('cirui-mobile-nav-open'));
  });
  updateActiveNavigation();
}

function installTopbarContext() {
  const navbar = document.querySelector('.navbar');
  if (!navbar || navbar.querySelector('.cirui-topbar-context')) return;
  const context = document.createElement('div');
  context.className = 'cirui-topbar-context';
  context.innerHTML = `<span>站点运行中</span><strong>${routeLabel()}</strong>`;
  navbar.prepend(context);
}

function activateOperationsTab(label) {
  const tab = [...document.querySelectorAll('.operations-page .el-tabs__item')]
    .find((item) => item.textContent.trim() === label || (label === '运营总览' && item.textContent.trim() === '能力映射'));
  tab?.click();
  tab?.focus({ preventScroll: true });
  document.querySelector('.operations-page .ops-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function decorateOperationsPage() {
  const page = document.querySelector('.operations-page');
  if (!page || page.dataset.ciruiEnhanced === 'true') return;
  page.dataset.ciruiEnhanced = 'true';

  const kicker = page.querySelector('.ops-kicker');
  const heading = page.querySelector('.operations-header h1');
  const intro = page.querySelector('.operations-header p');
  if (kicker) kicker.textContent = 'CIRUI OPERATIONS / 运营工作台';
  if (heading) heading.textContent = '把今日待办，变成清晰的下一步。';
  if (intro) intro.textContent = '从评价审核、AI 任务、案例发布和海外客户会话进入对应工作流；商品、SKU、库存、订单与车型适配继续由 F-Box 自有后台承接。';

  const metrics = page.querySelector('.metric-grid');
  if (metrics && !page.querySelector('.cirui-task-strip-title')) {
    metrics.insertAdjacentHTML('beforebegin', '<div class="cirui-task-strip-title"><strong>今日待办</strong><span>点击指标直接进入处理队列</span></div>');
  }

  const metricTabs = ['评价审核', '效果图任务', '案例发布', '咨询线索'];
  [...page.querySelectorAll('.metric-grid article')].forEach((article, index) => {
    const label = metricTabs[index];
    if (!label) return;
    article.tabIndex = 0;
    article.setAttribute('role', 'button');
    article.setAttribute('aria-label', `打开${label}`);
    article.addEventListener('click', () => activateOperationsTab(label));
    article.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateOperationsTab(label);
      }
    });
  });

  const overviewTab = [...page.querySelectorAll('.el-tabs__item')]
    .find((item) => item.textContent.trim() === '能力映射');
  if (overviewTab) overviewTab.textContent = '运营总览';

  const panelTitles = [...page.querySelectorAll('.mapping-grid .panel-title strong')];
  if (panelTitles[0]) panelTitles[0].textContent = '交易基础能力';
  if (panelTitles[1]) panelTitles[1].textContent = '内容与售前协作';
}

function closeMobileNavFromBackdrop(event) {
  if (!document.body.classList.contains('cirui-mobile-nav-open')) return;
  const sidebar = document.getElementById('cirui-admin-sidebar');
  const toggle = document.getElementById('cirui-mobile-toggle');
  if (!sidebar?.contains(event.target) && !toggle?.contains(event.target)) {
    document.body.classList.remove('cirui-mobile-nav-open');
  }
}

function installKeyboardShortcuts(event) {
  const target = event.target;
  const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    if (document.body.classList.contains('cirui-sidebar-collapsed')) setCollapsed(false);
    document.getElementById('cirui-nav-search')?.focus();
  } else if (event.key === '/' && !isTyping) {
    event.preventDefault();
    if (document.body.classList.contains('cirui-sidebar-collapsed')) setCollapsed(false);
    document.getElementById('cirui-nav-search')?.focus();
  } else if (event.key === 'Escape') {
    document.body.classList.remove('cirui-mobile-nav-open');
  }
}

let scheduled = false;
function enhanceAdmin() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    installAdminShell();
    if (!document.getElementById('cirui-admin-sidebar')) return;
    installTopbarContext();
    decorateOperationsPage();
    updateActiveNavigation();
  });
}

window.addEventListener('hashchange', () => {
  document.body.classList.remove('cirui-mobile-nav-open');
  setTimeout(enhanceAdmin, 0);
});
document.addEventListener('keydown', installKeyboardShortcuts);
document.addEventListener('pointerdown', closeMobileNavFromBackdrop);
new MutationObserver(enhanceAdmin).observe(document.documentElement, { childList: true, subtree: true });
enhanceAdmin();
