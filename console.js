// F-Box operator console: traffic analytics, customer management and review
// moderation. Runs alongside the visualizer-route admin page; talks only to
// the same-origin F-Box backend.

const fitmentConsolePage = ['/admin/fitment-lab', '/admin/fitment-lab/'].includes(location.pathname);
const siteAssetsConsolePage = ['/admin/site-assets', '/admin/site-assets/'].includes(location.pathname);
const initialConsoleView = siteAssetsConsolePage ? 'site-assets' : fitmentConsolePage ? 'fitment' : 'dashboard';

function storedAdminToken() {
  const consoleToken = localStorage.getItem('fbox-console-token') || '';
  if (consoleToken) return consoleToken;
  try {
    const modernSession = JSON.parse(localStorage.getItem('user') || '{}');
    return String(modernSession?.userInfo?.token || '');
  } catch {
    return '';
  }
}

if (fitmentConsolePage) {
  document.body.classList.add('fitment-console-page');
  document.title = 'F-Box Admin · 轮毂定制计算器';
  const back = document.querySelector('.topbar .back');
  if (back) { back.href = '/admin/#/fbox/overview'; back.textContent = '返回 F-Box 管理后台'; }
  const brand = document.querySelector('.topbar .brand');
  if (brand) brand.href = '/admin/#/fbox/overview';
}
if (siteAssetsConsolePage) {
  document.body.classList.add('site-assets-console-page');
  document.title = 'F-Box Admin · 店铺装修图片';
  const back = document.querySelector('.topbar .back');
  if (back) { back.href = '/admin/#/fbox/overview'; back.textContent = '返回 F-Box 管理后台'; }
  const brand = document.querySelector('.topbar .brand');
  if (brand) brand.href = '/admin/#/fbox/overview';
}

const state = {
  token: storedAdminToken(),
  view: 'dashboard',
  range: '30d',
  dashboard: null,
  customers: [],
  customerFilter: { q: '', country: '', grade: '' },
  reviews: [],
  reviewFilter: 'pending',
  blogPosts: [],
  blogStatus: 'all',
  blogEditingId: '',
  fitmentParts: [],
  fitmentFilter: { q: '', type: '', status: '' },
  fitmentEditingId: '',
  fitmentResult: null,
  fitmentCheckPayload: null,
  fitmentVehicleReference: null,
  fitmentVehicleReferenceLoading: false,
  fitmentVehicleReferenceError: '',
  siteAssets: [],
  siteAssetsMeta: null,
  siteAssetNotice: '',
  siteAssetFilter: 'all',
  siteAssetSearch: '',
  visualizerJobs: [],
  visualizerViewer: null
};

const viewTitles = {
  dashboard: '数据面板',
  customers: '客户管理',
  reviews: '评价管理',
  blog: '博客管理',
  fitment: '适配实验室',
  'site-assets': '店铺装修图片',
  visualizer: '效果图配置'
};

const el = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = value => Number(value || 0).toLocaleString('en-US');
const dateLabel = value => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
};

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(state.token ? { Authorization: state.token.startsWith('Bearer ') ? state.token : `Bearer ${state.token}` } : {}),
      ...(options.headers || {})
    }
  });
  if (response.status === 401 && state.token) {
    state.token = '';
    localStorage.removeItem('fbox-console-token');
    showAuth();
    throw new Error('登录已过期，请重新登录。');
  }
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.detail || payload.message || `请求失败 (${response.status})`);
  return payload;
}

function showAuth() {
  el('#console-auth').hidden = false;
  el('#console-app').hidden = true;
}

function showApp() {
  el('#console-auth').hidden = true;
  el('#console-app').hidden = false;
  el('#console-operator').textContent = 'admin';
}

async function ensureSession() {
  if (!state.token) { showAuth(); return false; }
  try {
    await api('/api/fbox-auth/info');
    showApp();
    return true;
  } catch {
    showAuth();
    return false;
  }
}

function setView(view) {
  state.view = view;
  document.querySelectorAll('.console-nav-item').forEach(button => button.classList.toggle('is-active', button.dataset.view === view));
  el('#console-view-title').textContent = viewTitles[view] || view;
  el('#console-range').style.display = view === 'dashboard' ? '' : 'none';
  renderView();
}

async function renderView() {
  if (state.view === 'dashboard') return renderDashboard();
  if (state.view === 'customers') return renderCustomers();
  if (state.view === 'reviews') return renderReviews();
  if (state.view === 'blog') return renderBlog();
  if (state.view === 'fitment') return renderFitment();
  if (state.view === 'site-assets') return renderSiteAssets();
  if (state.view === 'visualizer') return renderVisualizer();
}

// ---------------------------------------------------------------- dashboard
async function renderDashboard() {
  const root = el('#console-view');
  root.innerHTML = '<div class="console-loading">正在读取流量数据…</div>';
  try {
    const payload = await api(`/api/fbox-ops/analytics?range=${state.range}`);
    state.dashboard = payload.data;
    root.innerHTML = dashboardMarkup(payload.data);
    drawCharts(payload.data);
  } catch (error) {
    root.innerHTML = `<div class="console-error">${esc(error.message)}</div>`;
  }
}

function kpi(label, value, note = '', accent = false) {
  return `<article class="kpi-card ${accent ? 'is-accent' : ''}"><span>${label}</span><strong>${value}</strong>${note ? `<small>${note}</small>` : ''}</article>`;
}

function barList(rows, emptyText) {
  if (!rows || !rows.length) return `<div class="empty-console">${emptyText}</div>`;
  const max = Math.max(...rows.map(row => row.value), 1);
  return `<div class="bar-list">${rows.slice(0, 10).map(row => `<div class="bar-row"><span class="bar-label" title="${esc(row.label)}">${esc(row.label)}</span><span class="bar-track"><span class="bar-fill" style="width:${Math.round((row.value / max) * 100)}%"></span></span><span class="bar-value">${num(row.value)}</span></div>`).join('')}</div>`;
}

function dashboardMarkup(data) {
  const t = data.totals || {};
  const kpis = [
    kpi('独立访客', num(t.unique_visitors), '按 IP 去重', true),
    kpi('页面浏览', num(t.page_views)),
    kpi('商品详情浏览', num(t.product_views)),
    kpi('关键点击', num(t.clicks), '加购 / 询价 / 效果图'),
    kpi('注册客户', num(t.registered_customers), `本期新增 ${num(t.new_registrations)}`),
    kpi('询价线索', num(t.inquiries)),
    kpi('订单', num(t.orders))
  ].join('');

  const recentRows = (data.recent_events || []).map(event => `<tr>
    <td class="cell-muted">${dateLabel(event.created_at)}</td>
    <td><span class="chip ${event.type === 'product_view' ? 'chip-country' : event.type === 'click' ? 'chip-grade-b' : 'chip-grade-c'}">${esc(event.type)}</span></td>
    <td class="cell-main">${esc(event.product_name || event.title || event.path || '/')}</td>
    <td>${event.country ? `<span class="chip chip-country">${esc(event.country)}</span>` : '<span class="cell-muted">—</span>'}</td>
    <td class="cell-muted">${esc(event.city || '')}</td>
    <td class="cell-muted">${esc(event.ip || 'local')}</td>
    <td class="cell-muted">${esc(event.source || 'Direct')}</td>
  </tr>`).join('');

  return `
    <div class="kpi-grid">${kpis}</div>
    <div class="panel-grid">
      <div class="console-card span-2"><h3>流量趋势</h3><p class="card-note">按天统计浏览、商品浏览与访客。用来判断推广活动和市场的节奏。</p><canvas id="chart-trend" height="120"></canvas></div>
      <div class="console-card"><h3>访客国家 / 地区</h3><p class="card-note">IP 解析出的客户所在地，决定营销优先级。</p>${barList(data.countries, '还没有识别出国家的访客。')}</div>
      <div class="console-card"><h3>流量来源</h3><p class="card-note">客户从哪里点进来（搜索引擎 / 社媒 / 直接访问）。</p>${barList(data.sources, '目前全部是直接访问。')}</div>
      <div class="console-card"><h3>热门页面</h3><p class="card-note">客户落地的页面分布。</p>${barList(data.pages, '暂无页面数据。')}</div>
      <div class="console-card"><h3>热门商品</h3><p class="card-note">商品详情页浏览量，最接近购买意向。</p>${barList(data.products, '暂无商品浏览。')}</div>
      <div class="console-card"><h3>访客语言</h3><p class="card-note">浏览器/界面语言分布，辅助决定客服与文案语言。</p>${barList(data.locales, '暂无语言数据。')}</div>
    </div>
    <div class="console-card"><h3>实时事件</h3><p class="card-note">最近 40 条访客行为。点击“客户管理”看沉淀下来的线索。</p>
      <div class="console-table-wrap"><table class="console-table"><thead><tr><th>时间</th><th>类型</th><th>内容</th><th>国家</th><th>城市</th><th>IP</th><th>来源</th></tr></thead><tbody>${recentRows || '<tr><td colspan="7" class="cell-muted">暂无事件。打开前台页面逛一圈，这里就会动起来。</td></tr>'}</tbody></table></div>
    </div>`;
}

let trendChart = null;
function drawCharts(data) {
  const canvas = el('#chart-trend');
  if (!canvas || typeof Chart === 'undefined') return;
  if (trendChart) { trendChart.destroy(); trendChart = null; }
  const days = data.days || [];
  trendChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: days.map(day => day.date.slice(5)),
      datasets: [
        { label: '页面浏览', data: days.map(day => day.page_views), borderColor: '#a98cff', backgroundColor: 'rgba(169,140,255,0.14)', tension: 0.35, fill: true, pointRadius: 0 },
        { label: '商品浏览', data: days.map(day => day.product_views), borderColor: '#c8ff1a', backgroundColor: 'rgba(200,255,26,0.1)', tension: 0.35, fill: true, pointRadius: 0 },
        { label: '独立访客', data: days.map(day => day.visitors), borderColor: '#6ea8fe', backgroundColor: 'transparent', tension: 0.35, pointRadius: 0, borderDash: [5, 4] }
      ]
    },
    options: {
      plugins: { legend: { labels: { color: '#8b96a3', boxWidth: 12, font: { size: 11 } } } },
      scales: {
        x: { ticks: { color: '#8b96a3', font: { size: 10 }, maxTicksLimit: 12 }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { beginAtZero: true, ticks: { color: '#8b96a3', font: { size: 10 }, precision: 0 }, grid: { color: 'rgba(255,255,255,0.05)' } }
      },
      interaction: { mode: 'index', intersect: false }
    }
  });
}

// ---------------------------------------------------------------- customers
async function renderCustomers() {
  const root = el('#console-view');
  root.innerHTML = '<div class="console-loading">正在汇总客户线索…</div>';
  try {
    const params = new URLSearchParams();
    if (state.customerFilter.q) params.set('q', state.customerFilter.q);
    if (state.customerFilter.country) params.set('country', state.customerFilter.country);
    if (state.customerFilter.grade) params.set('grade', state.customerFilter.grade);
    const payload = await api(`/api/fbox-ops/customers?${params}`);
    state.customers = payload.data || [];
    root.innerHTML = customersMarkup(state.customers);
    wireCustomerToolbar();
  } catch (error) {
    root.innerHTML = `<div class="console-error">${esc(error.message)}</div>`;
  }
}

function customersMarkup(customers) {
  const countries = [...new Set(customers.map(item => item.country).filter(Boolean))];
  const rows = customers.map(item => `<tr>
    <td><span class="chip chip-grade-${item.grade.toLowerCase()}">${item.grade}</span></td>
    <td class="cell-main">${esc(item.username)}</td>
    <td class="cell-muted">${esc(item.email || '—')}</td>
    <td class="cell-muted">${esc(item.telephone || '—')}</td>
    <td class="cell-muted">${esc(item.company || '—')}</td>
    <td>${item.country ? `<span class="chip chip-country">${esc(item.country)}</span>` : '<span class="cell-muted">—</span>'}</td>
    <td class="cell-muted">${num(item.orders)} 单 / ${num(item.inquiries)} 询价</td>
    <td class="cell-muted">${esc((item.interest || []).slice(0, 2).join('、') || '—')}</td>
    <td class="cell-muted">${dateLabel(item.created_at)}</td>
    <td class="cell-muted">${dateLabel(item.last_seen_at)}</td>
  </tr>`).join('');

  return `
    <div class="console-toolbar">
      <input id="customer-q" placeholder="搜用户名 / 邮箱 / 公司" value="${esc(state.customerFilter.q)}">
      <select id="customer-country"><option value="">全部国家</option>${countries.map(country => `<option ${state.customerFilter.country === country ? 'selected' : ''}>${esc(country)}</option>`).join('')}</select>
      <select id="customer-grade"><option value="">全部等级</option><option value="A" ${state.customerFilter.grade === 'A' ? 'selected' : ''}>A · 高意向</option><option value="B" ${state.customerFilter.grade === 'B' ? 'selected' : ''}>B · 有互动</option><option value="C" ${state.customerFilter.grade === 'C' ? 'selected' : ''}>C · 新注册</option></select>
      <span class="spacer"></span>
      <button class="console-btn" id="customer-export">导出 CSV</button>
    </div>
    <p class="card-note">等级规则：A = 有订单或已报价询价；B = 有询价或浏览过 2 个以上商品；C = 新注册。CSV 可直接导入邮件营销工具做分国家触达。</p>
    <div class="console-table-wrap"><table class="console-table"><thead><tr><th>等级</th><th>用户名</th><th>邮箱</th><th>电话</th><th>公司</th><th>国家</th><th>订单/询价</th><th>关注商品</th><th>注册时间</th><th>最近活跃</th></tr></thead><tbody>${rows || '<tr><td colspan="10" class="cell-muted">还没有注册客户。前台注册功能已上线，第一批客户进来后会列在这里。</td></tr>'}</tbody></table></div>`;
}

function wireCustomerToolbar() {
  const q = el('#customer-q');
  const country = el('#customer-country');
  const grade = el('#customer-grade');
  let timer = null;
  q?.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => { state.customerFilter.q = q.value.trim(); renderCustomers(); }, 350);
  });
  country?.addEventListener('change', () => { state.customerFilter.country = country.value; renderCustomers(); });
  grade?.addEventListener('change', () => { state.customerFilter.grade = grade.value; renderCustomers(); });
  el('#customer-export')?.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/fbox-ops/customers/export', { headers: { Authorization: `Bearer ${state.token}` } });
      if (!response.ok) throw new Error('导出失败');
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `fbox-customers-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch { /* toast-free: button click already gave feedback via download */ }
  });
}

// ------------------------------------------------------------------ reviews
async function renderReviews() {
  const root = el('#console-view');
  root.innerHTML = '<div class="console-loading">正在读取评价…</div>';
  try {
    const payload = await api('/api/fbox-ops/reviews');
    state.reviews = payload.data || [];
    root.innerHTML = reviewsMarkup(state.reviews);
    wireReviewToolbar();
  } catch (error) {
    root.innerHTML = `<div class="console-error">${esc(error.message)}</div>`;
  }
}

function reviewsMarkup(reviews) {
  const filtered = state.reviewFilter === 'all' ? reviews : reviews.filter(item => item.status === state.reviewFilter);
  const counts = { pending: 0, approved: 0, hidden: 0, rejected: 0 };
  reviews.forEach(item => { counts[item.status] = (counts[item.status] || 0) + 1; });
  const rows = filtered.map(item => `<tr>
    <td><span class="chip chip-${item.status}">${esc(item.status)}</span></td>
    <td class="cell-main">${esc(item.product_name || item.product_id || '—')}</td>
    <td class="cell-muted">${'★'.repeat(Math.round(Number(item.rating || 5)))}</td>
    <td class="review-admin-body"><strong>${esc(item.title)}</strong><br>${esc(item.body)}</td>
    <td class="cell-muted">${esc(item.customer_name || '—')}${item.customer_country ? `<br><span class="chip chip-country">${esc(item.customer_country)}</span>` : ''}</td>
    <td class="cell-muted">${esc(item.source_platform || item.source || '')}</td>
    <td class="cell-muted">${dateLabel(item.created_at)}</td>
    <td>
      ${item.status !== 'approved' ? `<button class="console-btn is-small" data-review-approve="${esc(item.id)}">发布</button>` : ''}
      ${item.status !== 'hidden' ? `<button class="console-btn is-small" data-review-hide="${esc(item.id)}">隐藏</button>` : ''}
      <button class="console-btn is-small is-danger" data-review-delete="${esc(item.id)}">删除</button>
    </td>
  </tr>`).join('');

  return `
    <div class="console-toolbar">
      ${['pending', 'approved', 'hidden', 'all'].map(key => `<button class="console-btn ${state.reviewFilter === key ? 'is-primary' : ''}" data-review-filter="${key}">${{ pending: '待审核', approved: '已发布', hidden: '已隐藏', all: '全部' }[key]}${key === 'all' ? '' : ` (${counts[key] || 0})`}</button>`).join('')}
    </div>
    <p class="card-note">已发布评价会实时出现在对应商品详情页；导入的 100 条真实客户评价已经按商品分配并发布。</p>
    <div class="console-table-wrap"><table class="console-table"><thead><tr><th>状态</th><th>商品</th><th>评分</th><th>评价内容</th><th>客户</th><th>来源</th><th>时间</th><th>操作</th></tr></thead><tbody>${rows || '<tr><td colspan="8" class="cell-muted">该状态下暂无评价。</td></tr>'}</tbody></table></div>`;
}

function wireReviewToolbar() {
  document.querySelectorAll('[data-review-filter]').forEach(button => button.addEventListener('click', () => { state.reviewFilter = button.dataset.reviewFilter; renderReviews(); }));
  document.querySelectorAll('[data-review-approve]').forEach(button => button.addEventListener('click', () => updateReview(button.dataset.reviewApprove, { status: 'approved', consent_confirmed: true })));
  document.querySelectorAll('[data-review-hide]').forEach(button => button.addEventListener('click', () => updateReview(button.dataset.reviewHide, { status: 'hidden' })));
  document.querySelectorAll('[data-review-delete]').forEach(button => button.addEventListener('click', async () => {
    if (!window.confirm('确认删除这条评价？')) return;
    try { await api(`/api/fbox-ops/reviews/${encodeURIComponent(button.dataset.reviewDelete)}`, { method: 'DELETE' }); renderReviews(); }
    catch (error) { window.alert(error.message); }
  }));
}

async function updateReview(id, payload) {
  try {
    await api(`/api/fbox-ops/reviews/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(payload) });
    renderReviews();
  } catch (error) { window.alert(error.message); }
}

// ---------------------------------------------------------------------- blog
async function renderBlog() {
  const root = el('#console-view');
  root.innerHTML = '<div class="console-loading">正在读取博客内容…</div>';
  try {
    const payload = await api('/api/fbox-ops/blog');
    state.blogPosts = payload.data || [];
    root.innerHTML = blogMarkup(state.blogPosts);
    wireBlogView();
  } catch (error) {
    root.innerHTML = `<div class="console-error">${esc(error.message)}</div>`;
  }
}

function blogStatusLabel(status) {
  return { draft: '草稿', published: '已发布', archived: '已归档' }[status] || status || '草稿';
}

function localDateTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function blogEditorMarkup(post = {}) {
  const editing = Boolean(post.id);
  return `<div class="console-card blog-editor"><div class="blog-editor-head"><div><h3>${editing ? '编辑文章' : '新建文章'}</h3><p class="card-note">发布后文章会立即出现在前台 Journal；草稿不会公开。</p></div><button class="console-btn" type="button" data-blog-cancel>取消</button></div><form id="blog-form" class="blog-form"><input type="hidden" name="id" value="${esc(post.id || '')}"><div class="blog-form-grid"><label>标题<input name="title" required value="${esc(post.title || '')}" placeholder="例如: How to Read Wheel Specs"></label><label>Slug<input name="slug" value="${esc(post.slug || '')}" placeholder="留空则按标题生成"></label><label>分类<input name="category" value="${esc(post.category || 'Guides')}" placeholder="Fitment / Technical / Engineering"></label><label>封面图片<input name="cover_image" value="${esc(post.cover_image || 'halo-20-spoke-01.png')}" placeholder="assets/your-image.png"></label><label>作者<input name="author" value="${esc(post.author || 'F-Box Editorial')}"></label><label>阅读时间<input name="read_time" value="${esc(post.read_time || '5 min read')}"></label><label class="field-wide">摘要<textarea name="excerpt" rows="3" required placeholder="列表页和社交分享使用的短摘要">${esc(post.excerpt || '')}</textarea></label><label>状态<select name="status"><option value="draft" ${post.status === 'draft' || !post.status ? 'selected' : ''}>草稿</option><option value="published" ${post.status === 'published' ? 'selected' : ''}>发布</option><option value="archived" ${post.status === 'archived' ? 'selected' : ''}>归档</option></select></label><label>发布时间<input name="published_at" type="datetime-local" value="${esc(localDateTime(post.published_at))}"></label><label class="field-wide">标签<input name="tags" value="${esc((post.tags || []).join(', '))}" placeholder="fitment, custom wheels, brake clearance"></label><label class="blog-featured-toggle"><input name="featured" type="checkbox" ${post.featured ? 'checked' : ''}> 设为首页精选文章</label><label class="field-wide">正文<textarea name="body" rows="18" required placeholder="段落之间空一行；用 ## 开头表示小标题">${esc(post.body || '')}</textarea><span class="field-note">支持普通段落；单独一行以 ## 开头会显示为文章小标题。</span></label></div><div class="actions"><button class="console-btn is-primary" type="submit">${editing ? '保存修改' : '创建文章'}</button></div><p class="message" id="blog-form-message" role="status"></p></form></div>`;
}

function blogMarkup(posts) {
  const filtered = state.blogStatus === 'all' ? posts : posts.filter(post => post.status === state.blogStatus);
  const counts = { all: posts.length, draft: 0, published: 0, archived: 0 };
  posts.forEach(post => { counts[post.status] = (counts[post.status] || 0) + 1; });
  const editingPost = state.blogEditingId && state.blogEditingId !== 'new' ? posts.find(post => post.id === state.blogEditingId) : {};
  const rows = filtered.map(post => `<tr><td class="cell-main"><strong>${esc(post.title)}</strong><br><span class="cell-muted">/${esc(post.slug)}</span></td><td><span class="chip chip-${post.status === 'published' ? 'approved' : post.status === 'draft' ? 'pending' : 'hidden'}">${blogStatusLabel(post.status)}</span></td><td>${esc(post.category)}</td><td class="cell-muted">${esc(post.author)}</td><td class="cell-muted">${dateLabel(post.published_at || post.updated_at)}</td><td><button class="console-btn is-small" data-blog-edit="${esc(post.id)}">编辑</button><button class="console-btn is-small is-danger" data-blog-delete="${esc(post.id)}">删除</button></td></tr>`).join('');
  return `${state.blogEditingId ? blogEditorMarkup(editingPost) : ''}<div class="console-toolbar"><button class="console-btn is-primary" data-blog-new>新建文章</button><span class="spacer"></span>${['all', 'draft', 'published', 'archived'].map(status => `<button class="console-btn ${state.blogStatus === status ? 'is-primary' : ''}" data-blog-status="${status}">${status === 'all' ? '全部' : blogStatusLabel(status)} (${counts[status] || 0})</button>`).join('')}</div><p class="card-note">Journal 入口位于前台主导航和首页内容末端。文章可以先存为草稿，确认摘要、封面和正文后再发布。</p><div class="console-table-wrap"><table class="console-table"><thead><tr><th>文章</th><th>状态</th><th>分类</th><th>作者</th><th>更新时间</th><th>操作</th></tr></thead><tbody>${rows || '<tr><td colspan="6" class="cell-muted">该状态下暂无文章。</td></tr>'}</tbody></table></div>`;
}

function wireBlogView() {
  el('[data-blog-new]')?.addEventListener('click', () => { state.blogEditingId = 'new'; renderBlog(); });
  el('[data-blog-cancel]')?.addEventListener('click', () => { state.blogEditingId = ''; renderBlog(); });
  document.querySelectorAll('[data-blog-status]').forEach(button => button.addEventListener('click', () => { state.blogStatus = button.dataset.blogStatus; renderBlog(); }));
  document.querySelectorAll('[data-blog-edit]').forEach(button => button.addEventListener('click', () => { state.blogEditingId = button.dataset.blogEdit; renderBlog(); }));
  document.querySelectorAll('[data-blog-delete]').forEach(button => button.addEventListener('click', async () => {
    if (!window.confirm('确认删除这篇文章？')) return;
    try { await api(`/api/fbox-ops/blog/${encodeURIComponent(button.dataset.blogDelete)}`, { method: 'DELETE' }); renderBlog(); }
    catch (error) { window.alert(error.message); }
  }));
  el('#blog-form')?.addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const id = String(values.get('id') || '').trim();
    const publishedAt = String(values.get('published_at') || '').trim();
    const payload = {
      title: values.get('title'), slug: values.get('slug'), category: values.get('category'), cover_image: values.get('cover_image'), author: values.get('author'), read_time: values.get('read_time'), excerpt: values.get('excerpt'), tags: String(values.get('tags') || '').split(',').map(item => item.trim()).filter(Boolean), status: values.get('status'), featured: values.get('featured') === 'on', published_at: publishedAt ? new Date(publishedAt).toISOString() : '', body: values.get('body')
    };
    const message = el('#blog-form-message');
    message.textContent = '正在保存…';
    try {
      await api(id ? `/api/fbox-ops/blog/${encodeURIComponent(id)}` : '/api/fbox-ops/blog', { method: id ? 'PUT' : 'POST', body: JSON.stringify(payload) });
      state.blogEditingId = '';
      await renderBlog();
    } catch (error) { message.textContent = error.message; message.className = 'message error'; }
  });
}

// ---------------------------------------------------------------- fitment lab
const fitmentTypeLabels = { wheel: '轮毂', brake: '刹车套件', caliper: '刹车卡钳', rotor: '刹车盘', pad: '刹车片', suspension: '避震 / 绞牙', spacer: '法兰 / 垫片', 'control-arm': '控制臂', 'top-mount': '塔顶', tire: '轮胎', other: '其他' };
function fitmentTypeLabel(type) { return fitmentTypeLabels[type] || type || '其他'; }
function fitmentStatusLabel(status) { return { active: '启用', draft: '草稿', archived: '归档' }[status] || status || '草稿'; }
function fitmentConfidenceLabel(value) { return { 'source-listed': '来源已列出', 'operator-verified': '人工核验', 'customer-measured': '客户实测', 'catalog-extracted': '目录提取', 'marketplace-listed': '商城列出', 'needs-review': '待复核' }[value] || value || '待复核'; }
function fitmentVerificationLabel(value) { return { source_catalog: '来源目录', application_verified: '车型已核验', template_verified: '模板已核验', customer_measured: '客户实测', 'needs-review': '待复核' }[value] || value || '待复核'; }

function fitmentPartEditorMarkupLegacy(part = {}) {
  const editing = Boolean(part.id);
  return `<div class="console-card fitment-part-editor"><div class="fitment-admin-head"><div><h3>${editing ? '编辑适配部件' : '新增适配部件'}</h3><p class="card-note">品牌、型号和规则用于自动匹配；规格 JSON 保存制动尺寸、最低轮径、避震范围等工程数据。</p></div><button class="console-btn" type="button" data-fitment-cancel>取消</button></div><form id="fitment-part-form" class="fitment-admin-form"><input type="hidden" name="id" value="${esc(part.id || '')}"><div class="fitment-admin-form-grid"><label>类型<select name="type"><option value="brake" ${part.type === 'brake' ? 'selected' : ''}>刹车套件</option><option value="caliper" ${part.type === 'caliper' ? 'selected' : ''}>刹车卡钳</option><option value="rotor" ${part.type === 'rotor' ? 'selected' : ''}>刹车盘</option><option value="pad" ${part.type === 'pad' ? 'selected' : ''}>刹车片</option><option value="suspension" ${part.type === 'suspension' ? 'selected' : ''}>避震 / 绞牙</option><option value="spacer" ${part.type === 'spacer' ? 'selected' : ''}>法兰 / 垫片</option><option value="control-arm" ${part.type === 'control-arm' ? 'selected' : ''}>控制臂</option><option value="top-mount" ${part.type === 'top-mount' ? 'selected' : ''}>塔顶</option><option value="tire" ${part.type === 'tire' ? 'selected' : ''}>轮胎</option><option value="other" ${!part.type || part.type === 'other' ? 'selected' : ''}>其他</option></select></label><label>品牌<input name="brand" required value="${esc(part.brand || '')}" placeholder="Brembo / Wilwood / Bilstein"></label><label>型号<input name="model" required value="${esc(part.model || '')}" placeholder="GT / B14 / AERO6"></label><label>零件号<input name="part_number" value="${esc(part.part_number || '')}" placeholder="1A1.3004A"></label><label>适配轴<select name="axle"><option value="universal" ${!part.axle || part.axle === 'universal' ? 'selected' : ''}>通用</option><option value="front" ${part.axle === 'front' ? 'selected' : ''}>前轴</option><option value="rear" ${part.axle === 'rear' ? 'selected' : ''}>后轴</option><option value="both" ${part.axle === 'both' ? 'selected' : ''}>前后轴</option></select></label><label>状态<select name="status"><option value="active" ${part.status === 'active' ? 'selected' : ''}>启用</option><option value="draft" ${!part.status || part.status === 'draft' ? 'selected' : ''}>草稿</option><option value="archived" ${part.status === 'archived' ? 'selected' : ''}>归档</option></select></label><label>可信度<select name="confidence"><option value="source-listed" ${part.confidence === 'source-listed' ? 'selected' : ''}>来源已列出</option><option value="operator-verified" ${part.confidence === 'operator-verified' ? 'selected' : ''}>人工核验</option><option value="customer-measured" ${part.confidence === 'customer-measured' ? 'selected' : ''}>客户实测</option><option value="needs-review" ${!part.confidence || part.confidence === 'needs-review' ? 'selected' : ''}>待复核</option></select></label><label>来源名称<input name="source_label" value="${esc(part.source_label || '')}" placeholder="Brembo Gran Turismo application list"></label><label class="field-wide">来源链接<input name="source_url" value="${esc(part.source_url || '')}" placeholder="https://..."></label><label class="field-wide">适配规则 JSON<textarea name="fitment_rules" rows="5" placeholder='[{"year_from":2015,"year_to":2020,"make":"BMW","model":"M3"}]'>${esc(JSON.stringify(part.fitment_rules || [], null, 2))}</textarea></label><label class="field-wide">规格 JSON<textarea name="specs" rows="8" placeholder='{"caliper_pistons":6,"rotor_diameter_mm":380,"min_wheel_diameter_in":19}'>${esc(JSON.stringify(part.specs || {}, null, 2))}</textarea></label><label class="field-wide">备注<textarea name="notes" rows="3" placeholder="适配注意事项、模板要求、来源说明">${esc(part.notes || '')}</textarea></label></div><div class="actions"><button class="console-btn is-primary" type="submit">${editing ? '保存部件' : '新增部件'}</button></div><p class="message" id="fitment-part-message" role="status"></p></form></div>`;
}

function fitmentPartEditorMarkup(part = {}) {
  const editing = Boolean(part.id);
  const sourceRefs = JSON.stringify(part.source_refs || [], null, 2);
  const reviewReasons = JSON.stringify(part.review_reasons || [], null, 2);
  return `<div class="console-card fitment-part-editor"><div class="fitment-admin-head"><div><h3>${editing ? '编辑适配部件' : '新增适配部件'}</h3><p class="card-note">系列参数只用于初筛；只有车型、零件号和刹车 / 轮毂模板完成核验后，才允许自动匹配。</p></div><button class="console-btn" type="button" data-fitment-cancel>取消</button></div><form id="fitment-part-form" class="fitment-admin-form"><input type="hidden" name="id" value="${esc(part.id || '')}"><div class="fitment-admin-form-grid"><label>类型<select name="type"><option value="brake" ${part.type === 'brake' ? 'selected' : ''}>刹车套件</option><option value="caliper" ${part.type === 'caliper' ? 'selected' : ''}>刹车卡钳</option><option value="rotor" ${part.type === 'rotor' ? 'selected' : ''}>刹车盘</option><option value="pad" ${part.type === 'pad' ? 'selected' : ''}>刹车片</option><option value="suspension" ${part.type === 'suspension' ? 'selected' : ''}>避震 / 绞牙</option><option value="spacer" ${part.type === 'spacer' ? 'selected' : ''}>法兰 / 垫片</option><option value="control-arm" ${part.type === 'control-arm' ? 'selected' : ''}>控制臂</option><option value="top-mount" ${part.type === 'top-mount' ? 'selected' : ''}>塔顶</option><option value="tire" ${part.type === 'tire' ? 'selected' : ''}>轮胎</option><option value="other" ${!part.type || part.type === 'other' ? 'selected' : ''}>其他</option></select></label><label>品牌<input name="brand" required value="${esc(part.brand || '')}" placeholder="Brembo / Wilwood / Bilstein"></label><label>型号<input name="model" required value="${esc(part.model || '')}" placeholder="GT / B14 / AERO6"></label><label>零件号<input name="part_number" value="${esc(part.part_number || '')}" placeholder="1A1.3004A"></label><label>适配轴<select name="axle"><option value="universal" ${!part.axle || part.axle === 'universal' ? 'selected' : ''}>通用</option><option value="front" ${part.axle === 'front' ? 'selected' : ''}>前轴</option><option value="rear" ${part.axle === 'rear' ? 'selected' : ''}>后轴</option><option value="both" ${part.axle === 'both' ? 'selected' : ''}>前后轴</option></select></label><label>状态<select name="status"><option value="active" ${part.status === 'active' ? 'selected' : ''}>启用</option><option value="draft" ${!part.status || part.status === 'draft' ? 'selected' : ''}>草稿</option><option value="archived" ${part.status === 'archived' ? 'selected' : ''}>归档</option></select></label><label>可信度<select name="confidence"><option value="source-listed" ${part.confidence === 'source-listed' ? 'selected' : ''}>来源已列出</option><option value="operator-verified" ${part.confidence === 'operator-verified' ? 'selected' : ''}>人工核验</option><option value="customer-measured" ${part.confidence === 'customer-measured' ? 'selected' : ''}>客户实测</option><option value="catalog-extracted" ${part.confidence === 'catalog-extracted' ? 'selected' : ''}>目录提取</option><option value="marketplace-listed" ${part.confidence === 'marketplace-listed' ? 'selected' : ''}>商城列出</option><option value="needs-review" ${!part.confidence || part.confidence === 'needs-review' ? 'selected' : ''}>待复核</option></select></label><label>核验状态<select name="verification_status"><option value="source_catalog" ${part.verification_status === 'source_catalog' ? 'selected' : ''}>来源目录</option><option value="application_verified" ${part.verification_status === 'application_verified' ? 'selected' : ''}>车型已核验</option><option value="template_verified" ${part.verification_status === 'template_verified' ? 'selected' : ''}>模板已核验</option><option value="customer_measured" ${part.verification_status === 'customer_measured' ? 'selected' : ''}>客户实测</option><option value="needs-review" ${!part.verification_status || part.verification_status === 'needs-review' ? 'selected' : ''}>待复核</option></select></label><label>参数范围<select name="parameter_scope"><option value="application" ${part.parameter_scope === 'application' ? 'selected' : ''}>具体车型套件</option><option value="kit" ${part.parameter_scope === 'kit' ? 'selected' : ''}>套件</option><option value="family" ${!part.parameter_scope || part.parameter_scope === 'family' ? 'selected' : ''}>系列参数</option><option value="unknown" ${part.parameter_scope === 'unknown' ? 'selected' : ''}>未知</option></select></label><label>自动匹配<select name="auto_match_enabled"><option value="false" ${!part.auto_match_enabled ? 'selected' : ''}>仅人工复核</option><option value="true" ${part.auto_match_enabled ? 'selected' : ''}>允许自动匹配</option></select></label><label>需要轮毂 / 刹车模板<select name="clearance_template_required"><option value="true" ${part.clearance_template_required !== false ? 'selected' : ''}>需要</option><option value="false" ${part.clearance_template_required === false ? 'selected' : ''}>不需要</option></select></label><label>模板编号<input name="clearance_template_id" value="${esc(part.clearance_template_id || '')}" placeholder="template-id"></label><label>来源名称<input name="source_label" value="${esc(part.source_label || '')}" placeholder="Manufacturer catalogue / application list"></label><label class="field-wide">来源链接<input name="source_url" value="${esc(part.source_url || '')}" placeholder="https://..."></label><label class="field-wide">来源证据 / 核验说明<textarea name="source_evidence" rows="3" placeholder="记录来源页、参数范围、车型套件核验方式">${esc(part.source_evidence || '')}</textarea></label><label class="field-wide">来源引用 JSON<textarea name="source_refs" rows="5" placeholder='[{"label":"Manufacturer","url":"https://...","kind":"manufacturer-catalog","evidence":"Exact page / table"}]'>${esc(sourceRefs)}</textarea></label><label class="field-wide">待复核原因 JSON<textarea name="review_reasons" rows="4" placeholder='["Exact vehicle application required","Wheel clearance template required"]'>${esc(reviewReasons)}</textarea></label><label class="field-wide">适配规则 JSON<textarea name="fitment_rules" rows="5" placeholder='[{"year_from":2015,"year_to":2020,"make":"BMW","model":"M3"}]'>${esc(JSON.stringify(part.fitment_rules || [], null, 2))}</textarea></label><label class="field-wide">规格 JSON<textarea name="specs" rows="8" placeholder='{"caliper_pistons":6,"rotor_diameter_mm":380,"min_wheel_diameter_in":19}'>${esc(JSON.stringify(part.specs || {}, null, 2))}</textarea></label><label class="field-wide">备注<textarea name="notes" rows="3" placeholder="适配注意事项、模板要求、来源说明">${esc(part.notes || '')}</textarea></label></div><div class="actions"><button class="console-btn is-primary" type="submit">${editing ? '保存部件' : '新增部件'}</button></div><p class="message" id="fitment-part-message" role="status"></p></form></div>`;
}

function fitmentAdminAxleMarkup(axle, label) {
  const field = (name, fieldLabel, help = '', placeholder = '', options = {}) => `<label class="${options.wide ? 'field-wide' : ''}"><span>${fieldLabel}</span>${help ? `<small class="fitment-admin-help">${help}</small>` : ''}<input name="${name}" ${options.type ? `type="${options.type}"` : ''} ${options.step ? `step="${options.step}"` : ''} placeholder="${placeholder}"></label>`;
  const currentFields = [
    field(`current_${axle}_diameter`, '当前轮毂直径（英寸）', '读取现车轮毂标识或可靠订单。', '18', { type: 'number', step: '0.5' }),
    field(`current_${axle}_width`, '当前轮毂宽度（英寸）', '胎唇座宽度，例如 8.5J 填 8.5。', '8.5', { type: 'number', step: '0.5' }),
    field(`current_${axle}_offset`, '当前 ET（毫米）', '当前轮毂安装面偏距。', '35', { type: 'number', step: '0.1' }),
    field(`current_${axle}_spacer_mm`, '当前垫片（毫米）', '没有垫片填 0。', '0', { type: 'number', step: '0.1' }),
    field(`current_${axle}_tire`, '当前轮胎规格', '用于计算滚动直径和胎肩位置。', '255/35R19', { wide: true })
  ].join('');
  const targetFields = [
    field(`${axle}_diameter`, '目标轮毂直径（英寸）', '客户希望的胎唇座直径。', '19', { type: 'number', step: '0.5' }),
    field(`${axle}_width`, '目标轮毂宽度（英寸）', '可先填店家经验规格，系统会按间隙修正。', '9', { type: 'number', step: '0.5' }),
    field(`${axle}_offset`, '候选 ET（毫米，可留空）', '留空时由当前基准和实测间隙反算。', '38', { type: 'number', step: '0.1' }),
    field(`${axle}_pcd`, '目标 PCD', '孔数 × 孔距圆直径，例如 5x112。', '5x112'),
    field(`${axle}_center_bore`, '目标中心孔（毫米）', '不得小于车辆轴头；最终按图纸加工。', '66.6', { type: 'number', step: '0.1' }),
    field(`${axle}_spacer_mm`, '目标垫片（毫米）', '量产方案尽量不依赖垫片；没有填 0。', '0', { type: 'number', step: '0.1' })
  ].join('');
  const clearanceFields = [
    field(`${axle}_inner_clearance_mm`, '当前轮毂内桶到避震最小间隙（毫米）', '量内桶、轮胎内侧到避震筒或弹簧座的最小值。', '20', { type: 'number', step: '0.1' }),
    field(`${axle}_spoke_clearance_mm`, '当前辐条背面到卡钳最小间隙（毫米）', '模板优先；手量时记录卡钳最高点。', '6', { type: 'number', step: '0.1' }),
    field(`${axle}_fender_clearance_mm`, '当前轮胎肩部到轮眉最小间隙（毫米）', axle === 'front' ? '打满左右方向并受载后取最小值。' : '车辆受载后取轮胎到轮眉最小值。', '18', { type: 'number', step: '0.1' }),
    field(`${axle}_compression_clearance_mm`, '当前完全压缩最小间隙（毫米）', '悬挂压缩到可用行程末端，取轮胎、轮眉、避震和内桶最小值。', '24', { type: 'number', step: '0.1' }),
    field(`${axle}_camber_deg`, '当前倾角（度）', '按四轮定位单填写；负值表示上端向内。', '-1.5', { type: 'number', step: '0.01' }),
    field(`${axle}_toe_deg`, '当前该轴总前束（度）', '按四轮定位单填写，不能用肉眼估算。', '0.00', { type: 'number', step: '0.01' })
  ].join('');
  const tireFields = [
    field(`${axle}_tire`, '目标轮胎规格', '宽度 / 扁平比 / 轮圈，例如 255/35R19。', '255/35R19'),
    field(`${axle}_tire_maker`, '轮胎品牌', '用于核对厂商批准轮圈宽度。', 'Michelin'),
    field(`${axle}_tire_model`, '轮胎型号', '必须对应具体花纹系列。', 'Pilot Sport 4 S'),
    field(`${axle}_tire_load_index`, '载重指数', '按车型轴荷和轮胎目录核对。', '96'),
    field(`${axle}_tire_speed_rating`, '速度级别', '例如 Y、W、V。', 'Y'),
    field(`${axle}_tire_rim_min`, '厂商允许轮圈宽度下限（英寸）', '来自该尺寸轮胎技术目录。', '8.5', { type: 'number', step: '0.5' }),
    field(`${axle}_tire_rim_max`, '厂商允许轮圈宽度上限（英寸）', '来自同一轮胎技术目录。', '10', { type: 'number', step: '0.5' })
  ].join('');
  return `<div class="fitment-admin-axle"><h4>${label}</h4><section class="fitment-admin-subgroup"><h5>01 当前安装基准</h5><div class="fitment-admin-check-grid">${currentFields}</div></section><section class="fitment-admin-subgroup"><h5>02 客户目标 / 店家候选规格</h5><div class="fitment-admin-check-grid">${targetFields}</div></section><section class="fitment-admin-subgroup"><h5>03 现车实测间隙</h5><div class="fitment-admin-check-grid">${clearanceFields}</div></section><section class="fitment-admin-subgroup"><h5>04 目标轮胎许可</h5><div class="fitment-admin-check-grid">${tireFields}<label><span>轮胎安装方式</span><small class="fitment-admin-help">标准安装优先；拉伸安装必须另外动态复测。</small><select name="${axle}_tire_fitment_style"><option value="standard">标准安装</option><option value="mild-stretch">轻度拉伸</option><option value="aggressive-stretch">激进拉伸</option></select></label></div></section></div>`;
}

function fitmentAdminInstallationMarkup() {
  const checks = [
    ['caliper', '辐条到卡钳间隙已复检'],
    ['suspension', '内桶 / 轮胎到避震间隙已复检'],
    ['steering_lock', '左右打满方向间隙已复检'],
    ['full_travel', '悬挂完整有效行程已复检'],
    ['fender_loaded', '受载后的轮眉间隙已复检'],
    ['road_test', '四轮定位和路试已完成']
  ].map(([key, label]) => `<label><input type="checkbox" name="installation_check_${key}"><span>${label}</span></label>`).join('');
  return `<details class="fitment-admin-installation"><summary>记录安装后的真实结果（可选）</summary><div class="fitment-admin-form-grid"><label>安装结果<select name="installation_outcome"><option value="candidate">仅候选 / 尚未安装</option><option value="installed_clear">安装并复检无干涉</option><option value="installed_after_correction">修正规格后安装成功</option><option value="interference_found">发现干涉 / 待修正</option></select></label><label>安装日期<input type="date" name="installation_date"></label><label>安装人员 / 工单号<input name="installation_reference" placeholder="Alex / WO-024"></label><label class="field-wide">安装后备注<input name="installation_note" placeholder="记录最终垫片、定位、轮胎或干涉修正"></label></div><fieldset class="fitment-admin-installation-checks"><legend>安装后六项复检</legend>${checks}</fieldset></details>`;
}

function fitmentAdminVehicleReferenceMarkup() {
  const data = state.fitmentVehicleReference;
  if (state.fitmentVehicleReferenceLoading) return `<section id="fitment-admin-vehicle-reference" class="fitment-admin-vehicle-reference is-loading"><strong>正在查询车型参考…</strong></section>`;
  if (state.fitmentVehicleReferenceError) return `<section id="fitment-admin-vehicle-reference" class="fitment-admin-vehicle-reference is-error"><strong>车型参考查询失败</strong><p>${esc(state.fitmentVehicleReferenceError)}</p></section>`;
  if (!data) return `<section id="fitment-admin-vehicle-reference" class="fitment-admin-vehicle-reference is-empty"><strong>车型参数参考</strong><p>填写年份、品牌和车型后点击“查询车型参考”，系统会显示已有的 PCD、中心孔、原厂轮毂、ET、轮胎和刹车基线。</p></section>`;
  const exact = data.exact_record || null;
  const platform = data.platform_reference || null;
  if (!exact && !platform) return `<section id="fitment-admin-vehicle-reference" class="fitment-admin-vehicle-reference is-empty"><strong>没有匹配记录</strong><p>请用 VIN、准确配置、当前轮毂标识和实车测量继续建档，也可在车型库新增人工核验记录。</p></section>`;
  const specs = exact?.oem_wheel_specs || {};
  const verified = exact?.spec_status === 'verified';
  const wheelSpec = [specs.diameter && specs.width ? `${specs.diameter} × ${specs.width}J` : specs.diameter ? `${specs.diameter} in` : '', specs.offset ? `ET ${specs.offset}` : '', specs.tire || ''].filter(Boolean).join(' · ') || platform?.wheel_target_not_approved || '—';
  const source = [...new Set([exact?.spec_source || specs.source || '', platform?.source_limitations || ''].filter(Boolean))].join(' · ') || 'F-Box reference library';
  return `<section id="fitment-admin-vehicle-reference" class="fitment-admin-vehicle-reference ${verified ? 'is-verified' : ''}"><header><div><small>车型参数参考</small><strong>${esc(exact ? [exact.year, exact.make, exact.model, exact.trim, exact.drive].filter(Boolean).join(' ') : platform.platform)}</strong></div><span>${verified ? '准确车型已核验' : '参考值 · 不自动批准'}</span></header><dl><div><dt>PCD</dt><dd>${esc(specs.pcd || platform?.pcd || '—')}</dd></div><div><dt>中心孔</dt><dd>${esc(specs.center_bore || platform?.center_bore_mm || '—')}${specs.center_bore || platform?.center_bore_mm ? ' mm' : ''}</dd></div><div><dt>原厂 / 常见轮毂与轮胎</dt><dd>${esc(wheelSpec)}</dd></div><div><dt>刹车基线</dt><dd>${esc(platform?.oem_brake_baseline || exact?.notes || '—')}</dd></div></dl><footer><span>来源：${esc(source)}</span>${platform?.source_url ? `<a href="${esc(platform.source_url)}" target="_blank" rel="noreferrer">查看来源</a>` : ''}</footer><p>只有“准确车型已核验”的 PCD / 中心孔记录可参与硬校验；ET、轮宽、轮胎和刹车间隙仍按当前配置与实测计算。</p></section>`;
}

function fitmentCheckFormMarkup() {
  const brakeParts = state.fitmentParts.filter(part => ['brake', 'caliper'].includes(part.type) && part.status === 'active');
  const rotorParts = state.fitmentParts.filter(part => part.type === 'rotor' && part.status === 'active');
  const padParts = state.fitmentParts.filter(part => part.type === 'pad' && part.status === 'active');
  const suspensionParts = state.fitmentParts.filter(part => part.type === 'suspension' && part.status === 'active');
  const options = parts => `<option value="">未选择</option><option value="oem">原厂（按准确配置核对）</option>${parts.map(part => `<option value="${esc(part.id)}">${esc(`${part.brand} ${part.model}`)}</option>`).join('')}`;
  return `<div class="console-card fitment-check-panel"><div class="fitment-admin-head"><div><h3>客户定制轮毂方案计算</h3><p class="card-note">输入店家熟悉的候选规格和现车测量，系统给出修正后的前后轴方案；计算结果仍需模板、复测和具名工程批准后才能生产锁定。</p></div></div><form id="fitment-admin-check-form" class="fitment-admin-form"><div class="fitment-admin-form-grid"><label>年份<input name="year" type="number" placeholder="2021"></label><label>品牌<input name="make" placeholder="BMW"></label><label>车型<input name="model" placeholder="M3"></label><label>配置<input name="trim" placeholder="Competition"></label><label>驱动<input name="drive" placeholder="AWD / RWD"></label><label>使用场景<select name="usage"><option value="street">日常街道</option><option value="spirited">激烈驾驶</option><option value="show">展示 / 低趴</option><option value="track">赛道</option></select></label><label>适配目标<select name="fitment_goal"><option value="oem_safe">原厂安全取向</option><option value="flush_street">齐边街道取向</option><option value="performance">性能 / 赛道取向</option><option value="show">展示 / 低趴取向</option></select></label><label>姿态状态<select name="stance_profile"><option value="oem">原厂车高</option><option value="lowered">降低车身</option><option value="static-low">静态低趴</option><option value="air">气动避震</option></select></label><label>当前降低高度 (mm)<input name="ride_height_drop_mm" type="number" step="1" min="0" placeholder="0"></label><label>经验规格来源<select name="calibration_basis"><option value="current_vehicle_measured">本车实测</option><option value="same_vehicle_successful_install">同配置成功安装</option><option value="manufacturer_drawing">厂商图纸 / 车型目录</option><option value="shop_experience">店家经验候选</option></select></label><label class="field-wide">成功案例 / 校准依据<input name="calibration_reference" placeholder="例如：工单 024，同车型同卡钳，19x9 ET38，复测无干涉"></label><label>前刹车 / 卡钳<select name="front_brake_id">${options(brakeParts)}</select></label><label>后刹车 / 卡钳<select name="rear_brake_id">${options(brakeParts)}</select></label><label>前刹车盘<select name="front_rotor_id">${options(rotorParts)}</select></label><label>后刹车盘<select name="rear_rotor_id">${options(rotorParts)}</select></label><label>前刹车片<select name="front_pad_id">${options(padParts)}</select></label><label>后刹车片<select name="rear_pad_id">${options(padParts)}</select></label><label>避震 / 绞牙<select name="suspension_id">${options(suspensionParts)}</select></label></div>${fitmentAdminVehicleReferenceMarkup()}${fitmentAdminInstallationMarkup()}<div class="fitment-admin-axles">${fitmentAdminAxleMarkup('front', '前轴定制方案')}${fitmentAdminAxleMarkup('rear', '后轴定制方案')}</div><div class="actions"><button class="console-btn" type="button" data-fitment-reference>查询车型参考</button><button class="console-btn is-primary" type="submit">计算并生成定制规格</button></div><p class="message" id="fitment-check-message" role="status"></p></form>${state.fitmentResult ? fitmentAdminResultMarkup(state.fitmentResult) : ''}</div>`;
}

function fitmentAdminResultMarkup(result) {
  const stage = result?.solution?.stage || 'measurement_required';
  const stageLabels = { identity_required: '车型身份待核验', measurement_required: '已计算 · 需要补测', correction_required: '已给出修正方案', engineering_ready: '工程资料已齐', production_locked: '生产规格已锁定' };
  const status = result?.solution?.production_release ? 'pass' : result?.status === 'conflict' || stage === 'correction_required' ? 'conflict' : 'needs_review';
  const statusText = stageLabels[stage] || '需要复核';
  const messages = [...(result?.issues || []), ...(result?.warnings || []), ...(result?.missing || [])];
  const baseline = result?.research_baseline;
  const axles = ['front', 'rear'].map(axle => {
    const item = result?.axles?.[axle] || {};
    const recommendation = item.recommendation || {};
    const geometry = item.geometry || {};
    const target = geometry.target_wheel || {};
    const diameter = target.diameter_in ?? recommendation.diameter_in;
    const width = target.width_in ?? recommendation.width_in;
    const et = target.et_mm ?? recommendation.et_mm;
    const etRange = geometry.feasible_et_range_mm || recommendation.et_estimate_range;
    const tire = target.tire_size || recommendation.tire_size || '待确认';
    const spec = diameter && width && Number.isFinite(Number(et)) ? `${diameter} × ${width}J · ET${et}` : '缺少当前基准或目标尺寸';
    const metric = (label, value, suffix = ' mm') => `<span><small>${label}</small><b>${Number.isFinite(Number(value)) ? `${esc(value)}${suffix}` : '待测'}</b></span>`;
    return `<div class="fitment-admin-result-axle"><div class="fitment-admin-axle-spec"><small>${axle === 'front' ? '前轴最终建议' : '后轴最终建议'}</small><strong>${esc(spec)}</strong><em>${esc(tire)}</em></div><span><small>PCD / 加工中心孔</small><b>${esc(recommendation.pcd || '待确认')} / ${recommendation.center_bore_mm ? `${esc(recommendation.center_bore_mm)} mm` : '待确认'}</b></span><span><small>可用 ET 范围</small><b>${etRange?.length === 2 ? `ET ${esc(etRange[0])}–${esc(etRange[1])}` : '待测'}</b></span>${metric('预计内侧剩余', geometry.predicted_inner_clearance_mm)}${metric('预计轮眉剩余', geometry.predicted_outer_clearance_mm)}${metric('预计完全压缩剩余', geometry.predicted_full_compression_clearance_mm)}${metric('滚动直径变化', geometry.rolling_diameter_delta_percent, '%')}</div>`;
  }).join('');
  const baselineMarkup = baseline ? `<div class="fitment-admin-research"><strong>研究平台基线（仅参考，不是批准值）</strong><span>${esc(baseline.platform)} · PCD ${esc(baseline.pcd || '—')} · CB ${baseline.center_bore_mm ? `${esc(baseline.center_bore_mm)} mm` : '—'}</span><small>${esc(baseline.wheel_target_not_approved || '')}</small></div>` : '';
  const corrections = result?.solution?.corrections || [];
  const confirmations = result?.solution?.required_confirmations || [];
  const lockMarkup = `<div class="fitment-admin-lock ${result?.solution?.production_release ? 'is-locked' : ''}"><strong>${result?.solution?.production_release ? '生产规格已锁定' : '当前仍不是生产批准'}</strong><span>${esc(result?.solution?.production_lock_reason || '需要完成全部测量、模板和工程图纸批准。')}</span>${confirmations.length ? `<small>还需完成 ${confirmations.length} 项证据：${confirmations.slice(0, 6).map(esc).join('、')}</small>` : ''}</div>`;
  const correctionMarkup = corrections.length ? `<div class="fitment-admin-corrections"><strong>系统已修正 ${corrections.length} 项</strong>${corrections.map(item => `<span>${item.axle === 'front' ? '前轴' : '后轴'} ${esc(item.field)}：${esc(item.entered ?? '未填')} → ${esc(item.recommended ?? '待确认')}</span>`).join('')}</div>` : '';
  return `<div class="fitment-admin-result"><div class="fitment-admin-result-head"><strong>客户定制规格方案</strong><span class="fitment-admin-status fitment-admin-status-${status}">${statusText}</span></div>${baselineMarkup}<div class="fitment-admin-result-grid">${axles}</div>${lockMarkup}${correctionMarkup}${messages.length ? `<details class="fitment-admin-diagnostics"><summary>查看 ${messages.length} 条工程证据与复核说明</summary><ul>${messages.slice(0, 20).map(message => `<li>${esc(message)}</li>`).join('')}</ul></details>` : '<p class="fitment-result-clear">已知输入没有冲突；最终仍需将所选款式图纸与刹车模板叠加确认。</p>'}<div class="actions"><button class="console-btn is-primary" type="button" data-fitment-save-case>保存为客户适配案例</button></div></div>`;
}

async function renderFitment() {
  const root = el('#console-view');
  root.innerHTML = '<div class="console-loading">正在读取适配库…</div>';
  try {
    const params = new URLSearchParams();
    if (state.fitmentFilter.q) params.set('q', state.fitmentFilter.q);
    if (state.fitmentFilter.type) params.set('type', state.fitmentFilter.type);
    if (state.fitmentFilter.status) params.set('status', state.fitmentFilter.status);
    const payload = await api(`/api/fbox-ops/fitment/parts?${params}`);
    state.fitmentParts = payload.data || [];
    root.innerHTML = `${fitmentCheckFormMarkup()}${fitmentPartListMarkup(state.fitmentParts)}`;
    wireFitmentView();
  } catch (error) { root.innerHTML = `<div class="console-error">${esc(error.message)}</div>`; }
}

function fitmentPartListMarkupLegacy(parts) {
  const editing = state.fitmentEditingId && state.fitmentEditingId !== 'new' ? parts.find(part => part.id === state.fitmentEditingId) : {};
  const rows = parts.map(part => `<tr><td class="cell-main"><strong>${esc(part.brand)} ${esc(part.model)}</strong><br><span class="cell-muted">${esc(part.part_number || 'No part number')}</span></td><td>${fitmentTypeLabel(part.type)}</td><td>${esc(part.axle || 'universal')}</td><td><span class="chip chip-${part.status === 'active' ? 'approved' : part.status === 'draft' ? 'pending' : 'hidden'}">${fitmentStatusLabel(part.status)}</span></td><td class="cell-muted">${fitmentConfidenceLabel(part.confidence)}</td><td class="cell-muted">${esc(part.source_label || 'Manual')}</td><td><button class="console-btn is-small" data-fitment-edit="${esc(part.id)}">编辑</button><button class="console-btn is-small is-danger" data-fitment-delete="${esc(part.id)}">删除</button></td></tr>`).join('');
  return `${state.fitmentEditingId ? fitmentPartEditorMarkup(editing) : ''}<div class="console-toolbar"><button class="console-btn is-primary" data-fitment-new>新增适配部件</button><input id="fitment-q" placeholder="搜品牌 / 型号 / 零件号" value="${esc(state.fitmentFilter.q)}"><select id="fitment-type"><option value="">全部类型</option>${Object.entries(fitmentTypeLabels).map(([key, label]) => `<option value="${key}" ${state.fitmentFilter.type === key ? 'selected' : ''}>${label}</option>`).join('')}</select><select id="fitment-status"><option value="">全部状态</option><option value="active" ${state.fitmentFilter.status === 'active' ? 'selected' : ''}>启用</option><option value="draft" ${state.fitmentFilter.status === 'draft' ? 'selected' : ''}>草稿</option><option value="archived" ${state.fitmentFilter.status === 'archived' ? 'selected' : ''}>归档</option></select><span class="spacer"></span><span class="card-note">${parts.length} 条当前记录</span></div><p class="card-note">适配库先覆盖主要刹车和避震系列，后台可以继续加入品牌型号、车辆范围和测量模板；前台只读取“启用”记录。</p><div class="console-table-wrap"><table class="console-table"><thead><tr><th>部件</th><th>类型</th><th>轴位</th><th>状态</th><th>可信度</th><th>来源</th><th>操作</th></tr></thead><tbody>${rows || '<tr><td colspan="7" class="cell-muted">还没有匹配记录。</td></tr>'}</tbody></table></div>`;
}

function fitmentPartListMarkup(parts) {
  const editing = state.fitmentEditingId && state.fitmentEditingId !== 'new' ? parts.find(part => part.id === state.fitmentEditingId) : {};
  const rows = parts.map(part => `<tr><td class="cell-main"><strong>${esc(part.brand)} ${esc(part.model)}</strong><br><span class="cell-muted">${esc(part.part_number || 'No part number')}</span></td><td>${fitmentTypeLabel(part.type)}</td><td>${esc(part.axle || 'universal')}</td><td><span class="chip chip-${part.status === 'active' ? 'approved' : part.status === 'draft' ? 'pending' : 'hidden'}">${fitmentStatusLabel(part.status)}</span></td><td class="cell-muted">${fitmentConfidenceLabel(part.confidence)}</td><td class="cell-muted">${fitmentVerificationLabel(part.verification_status)}</td><td><span class="chip chip-${part.auto_match_enabled ? 'approved' : 'pending'}">${part.auto_match_enabled ? '自动匹配' : '人工复核'}</span></td><td class="cell-muted">${esc(part.source_label || 'Manual')}</td><td><button class="console-btn is-small" data-fitment-edit="${esc(part.id)}">编辑</button><button class="console-btn is-small is-danger" data-fitment-delete="${esc(part.id)}">删除</button></td></tr>`).join('');
  return `${state.fitmentEditingId ? fitmentPartEditorMarkup(editing) : ''}<div class="console-toolbar"><button class="console-btn is-primary" data-fitment-new>新增适配部件</button><input id="fitment-q" placeholder="搜品牌 / 型号 / 零件号" value="${esc(state.fitmentFilter.q)}"><select id="fitment-type"><option value="">全部类型</option>${Object.entries(fitmentTypeLabels).map(([key, label]) => `<option value="${key}" ${state.fitmentFilter.type === key ? 'selected' : ''}>${label}</option>`).join('')}</select><select id="fitment-status"><option value="">全部状态</option><option value="active" ${state.fitmentFilter.status === 'active' ? 'selected' : ''}>启用</option><option value="draft" ${state.fitmentFilter.status === 'draft' ? 'selected' : ''}>草稿</option><option value="archived" ${state.fitmentFilter.status === 'archived' ? 'selected' : ''}>归档</option></select><span class="spacer"></span><span class="card-note">${parts.length} 条当前记录</span></div><p class="card-note">目录数据可以帮助筛选，但只要没有具体车型、零件号和刹车 / 轮毂模板核验，就只能人工复核，不能自动放行。</p><div class="console-table-wrap"><table class="console-table"><thead><tr><th>部件</th><th>类型</th><th>轴位</th><th>状态</th><th>可信度</th><th>核验状态</th><th>自动匹配</th><th>来源</th><th>操作</th></tr></thead><tbody>${rows || '<tr><td colspan="9" class="cell-muted">还没有匹配记录。</td></tr>'}</tbody></table></div>`;
}

function fitmentAdminPayload(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  const axle = name => ({ diameter: values[`${name}_diameter`], width: values[`${name}_width`], offset: values[`${name}_offset`], pcd: values[`${name}_pcd`], center_bore: values[`${name}_center_bore`], spacer_mm: values[`${name}_spacer_mm`], inner_clearance_mm: values[`${name}_inner_clearance_mm`], spoke_clearance_mm: values[`${name}_spoke_clearance_mm`], camber_deg: values[`${name}_camber_deg`], toe_deg: values[`${name}_toe_deg`], fender_clearance_mm: values[`${name}_fender_clearance_mm`], compression_clearance_mm: values[`${name}_compression_clearance_mm`], tire_fitment_style: values[`${name}_tire_fitment_style`] });
  const currentAxle = name => ({ diameter: values[`current_${name}_diameter`], width: values[`current_${name}_width`], offset: values[`current_${name}_offset`], spacer_mm: values[`current_${name}_spacer_mm`] });
  const tire = name => ({ size: values[`${name}_tire`], manufacturer: values[`${name}_tire_maker`], model: values[`${name}_tire_model`], load_index: values[`${name}_tire_load_index`], speed_rating: values[`${name}_tire_speed_rating`], approved_rim_min_in: values[`${name}_tire_rim_min`], approved_rim_max_in: values[`${name}_tire_rim_max`] });
  const installationChecks = Object.fromEntries(['caliper', 'suspension', 'steering_lock', 'full_travel', 'fender_loaded', 'road_test'].map(key => [key, values[`installation_check_${key}`] === 'on']));
  return { values, payload: { locale: 'zh-CN', vehicle: { year: values.year, make: values.make, model: values.model, trim: values.trim, drive: values.drive }, usage: values.usage, fitment_goal: values.fitment_goal, calibration: { basis: values.calibration_basis, reference: values.calibration_reference, installation: { outcome: values.installation_outcome, installed_at: values.installation_date, reference: values.installation_reference, note: values.installation_note, checks: installationChecks } }, stance_profile: values.stance_profile || (values.usage === 'show' ? 'static-low' : Number(values.ride_height_drop_mm || 0) > 0 ? 'lowered' : 'oem'), front_brake_id: values.front_brake_id, rear_brake_id: values.rear_brake_id, front_rotor_id: values.front_rotor_id, rear_rotor_id: values.rear_rotor_id, front_pad_id: values.front_pad_id, rear_pad_id: values.rear_pad_id, suspension_id: values.suspension_id, suspension: { ride_height_drop_mm: values.ride_height_drop_mm }, current_setup: { wheels: { front: currentAxle('front'), rear: currentAxle('rear') }, tires: { front: { size: values.current_front_tire }, rear: { size: values.current_rear_tire } } }, wheels: { front: axle('front'), rear: axle('rear') }, tires: { front: tire('front'), rear: tire('rear') } } };
}

function wireFitmentView() {
  el('[data-fitment-new]')?.addEventListener('click', () => { state.fitmentEditingId = 'new'; renderFitment(); });
  el('[data-fitment-cancel]')?.addEventListener('click', () => { state.fitmentEditingId = ''; renderFitment(); });
  let timer = null;
  el('#fitment-q')?.addEventListener('input', event => { window.clearTimeout(timer); timer = window.setTimeout(() => { state.fitmentFilter.q = event.target.value.trim(); renderFitment(); }, 350); });
  el('#fitment-type')?.addEventListener('change', event => { state.fitmentFilter.type = event.target.value; renderFitment(); });
  el('#fitment-status')?.addEventListener('change', event => { state.fitmentFilter.status = event.target.value; renderFitment(); });
  document.querySelectorAll('[data-fitment-edit]').forEach(button => button.addEventListener('click', () => { state.fitmentEditingId = button.dataset.fitmentEdit; renderFitment(); }));
  document.querySelectorAll('[data-fitment-delete]').forEach(button => button.addEventListener('click', async () => { if (!window.confirm('确认删除这条适配部件？')) return; try { await api(`/api/fbox-ops/fitment/parts/${encodeURIComponent(button.dataset.fitmentDelete)}`, { method: 'DELETE' }); renderFitment(); } catch (error) { window.alert(error.message); } }));
  el('#fitment-part-form')?.addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const message = el('#fitment-part-message');
    let fitmentRules;
    let specs;
    let sourceRefs;
    let reviewReasons;
    try { fitmentRules = JSON.parse(values.fitment_rules || '[]'); specs = JSON.parse(values.specs || '{}'); sourceRefs = JSON.parse(values.source_refs || '[]'); reviewReasons = JSON.parse(values.review_reasons || '[]'); } catch { message.textContent = '适配规则、规格、来源引用或待复核原因 JSON 格式不正确。'; message.className = 'message error'; return; }
    message.textContent = '正在保存…';
    const payload = { ...values, fitment_rules: fitmentRules, specs, source_refs: sourceRefs, review_reasons: reviewReasons };
    delete payload.id;
    try { await api(values.id ? `/api/fbox-ops/fitment/parts/${encodeURIComponent(values.id)}` : '/api/fbox-ops/fitment/parts', { method: values.id ? 'PUT' : 'POST', body: JSON.stringify(payload) }); state.fitmentEditingId = ''; await renderFitment(); } catch (error) { message.textContent = error.message; message.className = 'message error'; }
  });
  el('[data-fitment-reference]')?.addEventListener('click', async () => {
    const form = el('#fitment-admin-check-form');
    const values = Object.fromEntries(new FormData(form).entries());
    if (!values.year || !values.make || !values.model) {
      state.fitmentVehicleReferenceError = '请先填写年份、品牌和车型。';
      el('#fitment-admin-vehicle-reference')?.replaceWith(document.createRange().createContextualFragment(fitmentAdminVehicleReferenceMarkup()));
      return;
    }
    state.fitmentVehicleReferenceLoading = true;
    state.fitmentVehicleReferenceError = '';
    el('#fitment-admin-vehicle-reference')?.replaceWith(document.createRange().createContextualFragment(fitmentAdminVehicleReferenceMarkup()));
    const params = new URLSearchParams({ year: values.year, make: values.make, model: values.model, trim: values.trim || '', drive: values.drive || '' });
    try {
      const response = await api(`/api/fbox-content/fitment/vehicle-reference?${params}`);
      state.fitmentVehicleReference = response.data || response;
    } catch (error) {
      state.fitmentVehicleReference = null;
      state.fitmentVehicleReferenceError = error.message;
    } finally {
      state.fitmentVehicleReferenceLoading = false;
      el('#fitment-admin-vehicle-reference')?.replaceWith(document.createRange().createContextualFragment(fitmentAdminVehicleReferenceMarkup()));
    }
  });
  el('#fitment-admin-check-form')?.addEventListener('submit', async event => {
    event.preventDefault();
    const { values, payload } = fitmentAdminPayload(event.currentTarget);
    const message = el('#fitment-check-message');
    message.textContent = '正在运行规则…';
    try { const response = await api('/api/fbox-content/fitment/check', { method: 'POST', body: JSON.stringify(payload) }); state.fitmentResult = response.data || response; state.fitmentCheckPayload = payload; await renderFitment(); } catch (error) { message.textContent = error.message; message.className = 'message error'; }
  });
  el('[data-fitment-save-case]')?.addEventListener('click', async () => {
    if (!state.fitmentResult) return;
    try { await api('/api/fbox-ops/fitment/cases', { method: 'POST', body: JSON.stringify({ vehicle: state.fitmentCheckPayload?.vehicle || state.fitmentResult.vehicle || {}, part_ids: (state.fitmentResult.selected_parts || []).map(part => part.id), request: state.fitmentCheckPayload || {}, result: state.fitmentResult, status: 'open' }) }); state.fitmentCaseMessage = '适配案例已保存。'; renderFitment(); } catch (error) { window.alert(error.message); }
  });
}

// -------------------------------------------------------------- site assets
function fileSizeLabel(value) {
  const bytes = Number(value || 0);
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const stagedSiteAssetFiles = new Map();

function siteAssetCard(asset) {
  const isVideo = asset.type === 'video';
  const dimensions = asset.width && asset.height ? `${asset.width} × ${asset.height}` : '等待上传';
  const updated = asset.updated_at ? new Date(asset.updated_at).toLocaleString('zh-CN') : '暂无文件';
  const preview = asset.url
    ? isVideo
      ? `<video src="${esc(asset.url)}" controls muted playsinline preload="metadata" aria-label="${esc(asset.label)}"></video>`
      : `<img src="${esc(asset.url)}" alt="${esc(asset.label)}" loading="lazy">`
    : `<span class="site-asset-empty"><b>${isVideo ? 'VIDEO' : 'IMAGE'}</b>当前素材缺失，选择文件后可预览</span>`;
  return `<article class="site-asset-card" data-site-asset-card="${esc(asset.id)}" data-site-asset-type="${esc(asset.type || 'image')}" data-site-asset-search="${esc(`${asset.group} ${asset.label} ${asset.usage} ${asset.file}`.toLowerCase())}">
    <div class="site-asset-preview ${asset.status !== 'ready' ? 'is-missing' : ''}">
      <div class="site-asset-current" data-site-asset-current="${esc(asset.id)}">${preview}</div>
      <span class="site-asset-format">${esc(asset.output_format || 'WebP')}</span>
    </div>
    <div class="site-asset-body">
      <div class="site-asset-title"><div><small>${esc(asset.group)}</small><h3>${esc(asset.label)}</h3></div><span class="chip ${asset.status === 'ready' ? 'chip-approved' : 'chip-hidden'}">${asset.status === 'ready' ? '使用中' : '缺失'}</span></div>
      <p>${esc(asset.usage)}</p>
      <dl class="site-asset-meta"><div><dt>当前尺寸</dt><dd>${esc(dimensions)}</dd></div><div><dt>文件大小</dt><dd>${esc(fileSizeLabel(asset.bytes))}</dd></div><div><dt>建议比例</dt><dd>${esc(asset.ratio)}</dd></div><div><dt>更新时间</dt><dd>${esc(updated)}</dd></div></dl>
      <div class="site-asset-file"><code>${esc(asset.relative_path || asset.file)}</code><span>${isVideo ? '提交后输出 MP4 · H.264/AAC · Fast Start' : '提交后输出 WebP · 保留透明通道'}</span></div>
      <label class="site-asset-upload"><input type="file" accept="${esc(asset.accept || (isVideo ? 'video/mp4,video/quicktime,video/webm' : 'image/png,image/jpeg,image/webp'))}" data-site-asset-upload="${esc(asset.id)}"><span>选择${isVideo ? '视频' : '图片'}</span><small data-site-asset-file-label="${esc(asset.id)}">最大 ${esc(fileSizeLabel(asset.max_upload_bytes))} · 选择后先预览</small></label>
      <div class="site-asset-submit-row"><button class="console-btn" type="button" data-site-asset-reset="${esc(asset.id)}" disabled>取消</button><button class="console-btn is-primary" type="button" data-site-asset-submit="${esc(asset.id)}" disabled>提交并转换</button></div>
      <p class="site-asset-message" data-site-asset-message="${esc(asset.id)}" role="status"></p>
    </div>
  </article>`;
}

function siteAssetsMarkup(assets, meta = {}) {
  const groups = [...new Set(assets.map(asset => asset.group))];
  const notice = state.siteAssetNotice ? `<div class="site-assets-notice">${esc(state.siteAssetNotice)}</div>` : '';
  const imageCount = Number(meta.counts?.image || assets.filter(asset => asset.type !== 'video').length);
  const videoCount = Number(meta.counts?.video || assets.filter(asset => asset.type === 'video').length);
  return `<div class="site-assets-head"><div><p class="eyebrow">STOREFRONT ASSET MANAGER</p><h3>网站图片与视频</h3><p class="card-note">在同一个后台预览并替换首页、车型、工厂、品牌和视频素材。选择文件不会立即覆盖；确认预览后点击“提交并转换”才会生效。</p></div><div class="site-assets-summary"><span><b>${num(imageCount)}</b>图片</span><span><b>${num(videoCount)}</b>视频</span><span><b>${num(groups.length)}</b>分组</span><a class="console-btn" href="/" target="_blank" rel="noopener">打开前台 ↗</a></div></div>${notice}<div class="site-assets-toolbar"><label><span>搜索素材</span><input type="search" data-site-asset-search placeholder="页面、位置或文件名"></label><div role="group" aria-label="素材类型"><button class="is-active" data-site-asset-filter="all">全部 <b>${assets.length}</b></button><button data-site-asset-filter="image">图片 <b>${imageCount}</b></button><button data-site-asset-filter="video">视频 <b>${videoCount}</b></button></div></div><div class="site-assets-guide"><strong>转换与发布</strong><span>${esc(meta.conversion || '图片转 WebP，视频转 MP4。')}</span><span>目标地址保持不变，前台会重新验证缓存。</span><span>每次覆盖前自动保留上一版文件备份。</span></div>${groups.map(group => `<section class="site-assets-group" data-site-asset-group><header><div><span>${esc(group)}</span><strong>${assets.filter(asset => asset.group === group).length} 项</strong></div></header><div class="site-assets-grid">${assets.filter(asset => asset.group === group).map(siteAssetCard).join('')}</div></section>`).join('')}<div class="site-assets-empty" data-site-assets-empty hidden>没有找到匹配的素材。</div>`;
}

function wireSiteAssetsView() {
  const applyFilters = () => {
    const query = state.siteAssetSearch.trim().toLowerCase();
    let visibleCount = 0;
    document.querySelectorAll('[data-site-asset-card]').forEach(card => {
      const matchesType = state.siteAssetFilter === 'all' || card.dataset.siteAssetType === state.siteAssetFilter;
      const matchesSearch = !query || String(card.dataset.siteAssetSearch || '').includes(query);
      card.hidden = !(matchesType && matchesSearch);
      if (!card.hidden) visibleCount += 1;
    });
    document.querySelectorAll('[data-site-asset-group]').forEach(group => {
      group.hidden = !group.querySelector('[data-site-asset-card]:not([hidden])');
    });
    const empty = document.querySelector('[data-site-assets-empty]');
    if (empty) empty.hidden = visibleCount > 0;
  };
  document.querySelectorAll('[data-site-asset-filter]').forEach(button => button.addEventListener('click', () => {
    state.siteAssetFilter = button.dataset.siteAssetFilter || 'all';
    document.querySelectorAll('[data-site-asset-filter]').forEach(item => item.classList.toggle('is-active', item === button));
    applyFilters();
  }));
  document.querySelector('[data-site-asset-search]')?.addEventListener('input', event => {
    state.siteAssetSearch = event.currentTarget.value || '';
    applyFilters();
  });
  document.querySelectorAll('[data-site-asset-upload]').forEach(input => input.addEventListener('change', event => {
    const inputElement = event.currentTarget;
    const file = inputElement.files?.[0];
    const id = inputElement.dataset.siteAssetUpload;
    const card = document.querySelector(`[data-site-asset-card="${CSS.escape(id)}"]`);
    const message = document.querySelector(`[data-site-asset-message="${CSS.escape(id)}"]`);
    const asset = state.siteAssets.find(item => item.id === id);
    if (!file || !card || !message) return;
    const isVideo = asset?.type === 'video';
    const allowed = isVideo
      ? ['video/mp4', 'video/quicktime', 'video/x-m4v', 'video/webm', 'video/x-matroska']
      : ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowed.includes(file.type)) {
      message.textContent = isVideo ? '请选择 MP4、MOV、M4V、WebM 或 MKV 视频。' : '请选择 PNG、JPG 或 WebP 图片。';
      message.className = 'site-asset-message is-error';
      return;
    }
    const maxBytes = Number(asset?.max_upload_bytes || (isVideo ? state.siteAssetsMeta?.max_video_upload_bytes : state.siteAssetsMeta?.max_upload_bytes) || 14 * 1024 * 1024);
    if (file.size > maxBytes) {
      message.textContent = `${isVideo ? '视频' : '图片'}不能超过 ${fileSizeLabel(maxBytes)}。`;
      message.className = 'site-asset-message is-error';
      return;
    }
    const previous = stagedSiteAssetFiles.get(id);
    if (previous?.previewUrl) URL.revokeObjectURL(previous.previewUrl);
    const previewUrl = URL.createObjectURL(file);
    stagedSiteAssetFiles.set(id, { file, previewUrl });
    const preview = card.querySelector(`[data-site-asset-current="${CSS.escape(id)}"]`);
    if (preview) preview.innerHTML = isVideo
      ? `<video src="${esc(previewUrl)}" controls muted playsinline preload="metadata"></video>`
      : `<img src="${esc(previewUrl)}" alt="待提交预览">`;
    card.querySelector(`[data-site-asset-file-label="${CSS.escape(id)}"]`).textContent = `${file.name} · ${fileSizeLabel(file.size)}`;
    card.querySelector(`[data-site-asset-submit="${CSS.escape(id)}"]`).disabled = false;
    card.querySelector(`[data-site-asset-reset="${CSS.escape(id)}"]`).disabled = false;
    message.textContent = '已选择并生成本地预览；点击“提交并转换”后才会替换前台素材。';
    message.className = 'site-asset-message';
  }));
  document.querySelectorAll('[data-site-asset-reset]').forEach(button => button.addEventListener('click', async () => {
    const draft = stagedSiteAssetFiles.get(button.dataset.siteAssetReset);
    if (draft?.previewUrl) URL.revokeObjectURL(draft.previewUrl);
    stagedSiteAssetFiles.delete(button.dataset.siteAssetReset);
    await renderSiteAssets();
  }));
  document.querySelectorAll('[data-site-asset-submit]').forEach(button => button.addEventListener('click', async () => {
    const id = button.dataset.siteAssetSubmit;
    const draft = stagedSiteAssetFiles.get(id);
    const card = document.querySelector(`[data-site-asset-card="${CSS.escape(id)}"]`);
    const message = document.querySelector(`[data-site-asset-message="${CSS.escape(id)}"]`);
    const asset = state.siteAssets.find(item => item.id === id);
    if (!draft?.file || !card || !message || !asset) return;
    card.classList.add('is-uploading');
    card.querySelectorAll('button,input').forEach(control => { control.disabled = true; });
    message.textContent = asset.type === 'video' ? '正在压缩并转换视频，请保持页面打开…' : '正在转换为 WebP 并替换…';
    message.className = 'site-asset-message';
    try {
      const payload = await api(`/api/fbox-assets/site/${encodeURIComponent(id)}`, {
        method: 'POST',
        headers: {
          'Content-Type': draft.file.type || 'application/octet-stream',
          'X-FBox-Filename': encodeURIComponent(draft.file.name)
        },
        body: draft.file
      });
      if (draft.previewUrl) URL.revokeObjectURL(draft.previewUrl);
      stagedSiteAssetFiles.delete(id);
      state.siteAssetNotice = `${payload.data?.label || '网站素材'}已替换，输出 ${payload.data?.output_format || (asset.type === 'video' ? 'MP4' : 'WebP')} ${fileSizeLabel(payload.data?.converted_bytes)}。上一版已保留备份。`;
      await renderSiteAssets();
    } catch (error) {
      card.classList.remove('is-uploading');
      card.querySelectorAll('button,input').forEach(control => { control.disabled = false; });
      message.textContent = error.message;
      message.className = 'site-asset-message is-error';
    }
  }));
  applyFilters();
}

async function renderSiteAssets() {
  const root = el('#console-view');
  root.innerHTML = '<div class="console-loading">正在读取网站图片与视频…</div>';
  try {
    const payload = await api('/api/fbox-assets/site');
    state.siteAssets = Array.isArray(payload.data) ? payload.data : [];
    state.siteAssetsMeta = payload.meta || {};
    root.innerHTML = siteAssetsMarkup(state.siteAssets, state.siteAssetsMeta);
    wireSiteAssetsView();
  } catch (error) {
    root.innerHTML = `<div class="console-error">${esc(error.message)}</div>`;
  }
}

// --------------------------------------------------------------- visualizer
function visualizerImageUrl(value) {
  const source = String(value || '').trim();
  if (source.startsWith('/')) return source;
  try {
    const parsed = new URL(source, window.location.origin);
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : '';
  } catch { return ''; }
}
function visualizerStatusLabel(status) {
  return { queued: '排队中', running: '生成中', succeeded: '已完成', reviewed: '已复核', failed: '失败' }[status] || status || '未知';
}
function visualizerStatusClass(status) {
  return status === 'succeeded' || status === 'reviewed' ? 'approved' : status === 'failed' ? 'hidden' : 'pending';
}
function visualizerJobImages(job) {
  return (Array.isArray(job?.results) ? job.results : []).map((result, index) => ({
    url: visualizerImageUrl(result?.image_url || result?.imageUrl || result?.url),
    angle: result?.angle || `View ${index + 1}`
  })).filter(item => item.url);
}
function visualizerJobCard(job) {
  const images = visualizerJobImages(job);
  const product = job.product_name || job.product_id || '未记录商品';
  const vehicle = job.vehicle_name || job.vehicle_file_name || '未记录车型';
  const imageMarkup = images.length
    ? `<div class="visualizer-job-images">${images.map((image, index) => `<button class="visualizer-job-image" type="button" data-visualizer-image="${esc(image.url)}" data-visualizer-title="${esc(`${product} · ${image.angle}`)}" aria-label="放大查看 ${esc(image.angle)}"><img src="${esc(image.url)}" alt="${esc(`${product} ${image.angle}`)}" loading="lazy"><span>${esc(image.angle)} · 点击放大</span></button>`).join('')}</div>`
    : `<div class="visualizer-job-empty">${job.status === 'failed' ? esc(job.message || '生成失败，请查看任务信息。') : '任务完成后，效果图会出现在这里。'}</div>`;
  return `<article class="visualizer-job-card"><div class="visualizer-job-head"><div><span class="visualizer-job-id">${esc(job.job_id || job.id || 'visualizer task')}</span><h3>${esc(product)}</h3></div><span class="chip chip-${visualizerStatusClass(job.status)}">${visualizerStatusLabel(job.status)}</span></div><div class="visualizer-job-meta"><span><b>车型</b>${esc(vehicle)}</span><span><b>创建</b>${dateLabel(job.created_at)}</span><span><b>更新</b>${dateLabel(job.updated_at)}</span><span><b>角度</b>${num(job.angles || images.length || 0)}</span></div>${imageMarkup}${job.admin_note ? `<p class="visualizer-job-note">后台备注：${esc(job.admin_note)}</p>` : ''}</article>`;
}
function visualizerViewerMarkup() {
  const viewer = state.visualizerViewer;
  if (!viewer?.url) return '';
  return `<div class="visualizer-image-viewer" data-visualizer-close><div class="visualizer-image-viewer-panel" role="dialog" aria-modal="true" aria-label="效果图放大查看"><header><div><span>F-BOX VISUAL TASK</span><h3>${esc(viewer.title || '效果图')}</h3></div><button class="console-btn" type="button" data-visualizer-close>关闭</button></header><div class="visualizer-image-viewer-stage"><img src="${esc(viewer.url)}" alt="${esc(viewer.title || '效果图')}"></div></div></div>`;
}
function visualizerGalleryMarkup(jobs) {
  const completed = jobs.filter(job => ['succeeded', 'reviewed'].includes(job.status)).length;
  const pending = jobs.filter(job => ['queued', 'running'].includes(job.status)).length;
  return `<div class="visualizer-gallery-head"><div><p class="eyebrow">客户效果图任务</p><h3>效果图图库</h3><p class="card-note">客户生成的每组角度会在这里集中展示。点击任意图片放大查看，移动端也可以直接查看。</p></div><div class="visualizer-gallery-stats"><span><b>${num(jobs.length)}</b>全部任务</span><span><b>${num(completed)}</b>已完成</span><span><b>${num(pending)}</b>处理中</span></div></div>${jobs.length ? `<div class="visualizer-job-grid">${jobs.map(visualizerJobCard).join('')}</div>` : '<div class="empty-console">还没有客户效果图任务。</div>'}${visualizerViewerMarkup()}`;
}
function wireVisualizerView() {
  document.querySelectorAll('[data-visualizer-image]').forEach(button => button.addEventListener('click', () => {
    state.visualizerViewer = { url: button.dataset.visualizerImage, title: button.dataset.visualizerTitle || '效果图' };
    renderVisualizer();
  }));
  document.querySelectorAll('[data-visualizer-close]').forEach(button => button.addEventListener('click', event => {
    if (event.currentTarget.classList.contains('visualizer-image-viewer') && event.target !== event.currentTarget) return;
    state.visualizerViewer = null;
    renderVisualizer();
  }));
}
async function renderVisualizer() {
  const root = el('#console-view');
  root.innerHTML = '<div class="console-loading">正在读取客户效果图任务…</div>';
  try {
    const payload = await api('/api/fbox-ops/jobs');
    state.visualizerJobs = Array.isArray(payload.data) ? payload.data : [];
    root.innerHTML = visualizerGalleryMarkup(state.visualizerJobs);
    wireVisualizerView();
  } catch (error) { root.innerHTML = `<div class="console-error">${esc(error.message)}</div>`; }
}

// -------------------------------------------------------------------- wire
el('#console-login-form')?.addEventListener('submit', async event => {
  event.preventDefault();
  const values = new FormData(event.currentTarget);
  const messageEl = el('#console-login-message');
  messageEl.textContent = '正在登录…';
  try {
    const response = await fetch('/api/fbox-auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ username: values.get('username'), password: values.get('password') })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || payload.detail || '登录失败');
    state.token = `${payload?.data?.tokenHead || 'Bearer '}${payload?.data?.token || ''}`.trim();
    localStorage.setItem('fbox-console-token', state.token);
    messageEl.textContent = '';
    showApp();
    setView(initialConsoleView);
  } catch (error) {
    messageEl.textContent = error.message;
    messageEl.className = 'message error';
  }
});

document.querySelectorAll('.console-nav-item').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
el('#console-range')?.addEventListener('change', event => { state.range = event.target.value; renderDashboard(); });
el('#console-refresh')?.addEventListener('click', () => renderView());
el('#console-logout')?.addEventListener('click', async () => {
  try { await api('/api/fbox-auth/logout', { method: 'POST' }); } catch { /* best-effort */ }
  state.token = '';
  localStorage.removeItem('fbox-console-token');
  localStorage.removeItem('user');
  showAuth();
});

ensureSession().then(ok => { if (ok) setView(initialConsoleView); });
