const wheelProducts = [
  { name: 'HALO 20-SPOKE', meta: '单片式 · 多辐深唇', image: '/assets/fbox-products/halo-20-spoke-01.png', href: '#product/fbox-halo-20-spoke' },
  { name: 'MERIDIAN', meta: '单片式 · 精密多辐', image: '/assets/fbox-products/meridian-multi-spoke-01.png', href: '#product/fbox-meridian-multi-spoke' },
  { name: 'VANTA 10', meta: '两片式 · 十辐深唇', image: '/assets/fbox-products/vanta-10-01.jpg', href: '#product/fbox-vanta-10' },
  { name: 'APEX', meta: '单片式 · 性能分叉辐', image: '/assets/fbox-products/apex-split-spoke-01.jpg', href: '#product/fbox-apex-split-spoke' },
];

const featureTiles = [
  { label: '品牌与制造', title: '策锐制造', copy: '从锻造坯料到精密加工', image: '/assets/cerui/cerui-factory-floor-wide-v1.webp', href: '#manufacture' },
  { label: '生产与技术', title: '精密加工', copy: 'CNC、表面处理与成品检测', image: '/assets/cerui/cerui-factory-cnc-v1.webp', href: '#technology' },
  { label: '全国网络', title: '直营网点与代理', copy: '从杭州连接全国改装市场', image: '/assets/domestic/media/cerui-china-network-map.webp', href: '#network' },
  { label: '轮毂适配', title: '车型参数实验室', copy: '选车型、算参数、生成上车效果', image: '/assets/cerui/cerui-event-wheel-wall-v1.webp', href: '/fitment-lab', appPath: true },
];

const vehicleFallback = {
  Audi: ['A4', 'A6', 'A7', 'Q5'],
  BMW: ['3 Series', '4 Series', '5 Series', 'M3', 'M4', 'X3', 'X4'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'AMG GT', 'GLE'],
  Porsche: ['911', 'Panamera', 'Macan', 'Cayenne', 'Taycan'],
  Volkswagen: ['Golf', 'Arteon', 'Passat', 'Touareg'],
  Tesla: ['Model 3', 'Model Y', 'Model S', 'Model X'],
};

const vehicleFallbackLabels = {
  Audi: '奥迪 / Audi',
  BMW: '宝马 / BMW',
  'Mercedes-Benz': '奔驰 / Mercedes-Benz',
  Porsche: '保时捷 / Porsche',
  Volkswagen: '大众 / Volkswagen',
  Tesla: '特斯拉 / Tesla',
};

let vehicleDirectoryRequest;

function loadVehicleDirectory() {
  if (!vehicleDirectoryRequest) {
    vehicleDirectoryRequest = fetch('/data/fbox-vehicle-directory.json', {
      cache: 'no-cache',
      headers: { Accept: 'application/json' },
    }).then(response => {
      if (!response.ok) throw new Error(`车型目录读取失败（${response.status}）`);
      return response.json();
    });
  }
  return vehicleDirectoryRequest;
}

function productMarkup(product) {
  return `<a class="wf-product" href="${product.href}" data-reveal>
    <figure><img src="${product.image}" alt="策锐 ${product.name} ${product.meta}锻造轮毂" loading="lazy" decoding="async"></figure>
    <div><h3>${product.name}</h3><p>${product.meta}</p><span>查看轮毂</span></div>
  </a>`;
}

function featureMarkup(item) {
  return `<a class="wf-feature" href="${item.href}" ${item.appPath ? 'data-app-path' : ''} data-reveal>
    <img src="${item.image}" alt="策锐锻造${item.title}" loading="lazy" decoding="async">
    <div><small>${item.label}</small><h3>${item.title}</h3><p>${item.copy}</p><span>了解更多</span></div>
  </a>`;
}

export function domesticHomePage(uiIcons = {}) {
  const icon = (name, fallback) => uiIcons[name] || fallback;
  return `<main class="wf-home" id="home">
    <header class="wf-header" data-wf-header>
      <a class="wf-header-brand" href="#home" aria-label="策锐锻造首页">
        <img src="/assets/cerui/cerui-logo-black-v1.webp" alt="策锐锻造 CIRUI FORGED">
      </a>
      <div class="wf-header-actions">
        <button type="button" data-wf-menu aria-label="打开导航菜单" aria-expanded="false" aria-controls="wf-site-menu">${icon('menu', '菜单')}</button>
      </div>
    </header>

    <aside class="wf-menu" id="wf-site-menu" aria-hidden="true">
      <button class="wf-menu-close" type="button" data-wf-menu-close aria-label="关闭导航菜单">${icon('close', '关闭')}</button>
      <nav aria-label="策锐官网导航">
        <a href="#wheels"><span>01</span>轮毂系列</a>
        <a href="/fitment-lab" data-app-path><span>02</span>车型适配实验室</a>
        <a href="#manufacture"><span>03</span>制造实力</a>
        <a href="#technology"><span>04</span>生产与技术</a>
        <a href="#videos"><span>05</span>视频专区</a>
        <a href="#network"><span>06</span>全国网络</a>
      </nav>
      <footer><small>适配咨询 · 李炜</small><a href="tel:+8618658191106">186 5819 1106</a><span>杭州策锐贸易有限公司</span></footer>
    </aside>
    <div class="wf-menu-backdrop" data-wf-menu-close></div>

    <section class="wf-hero" aria-labelledby="wf-hero-title">
      <div class="wf-bbs-video-stage" aria-hidden="true">
        <video class="wf-bbs-hero-video" autoplay muted loop playsinline preload="auto" poster="/assets/domestic/videos/cerui-global-hero-hd-montage-poster.webp" data-wf-bbs-video>
          <source src="/assets/domestic/videos/cerui-global-hero-hd-montage-720p30-web.mp4?v=20260915-stream-v3" type="video/mp4">
        </video>
      </div>
      <div class="wf-hero-secondary-brand" aria-hidden="true">
        <img src="/assets/cerui/cerui-logo-black-v1.webp" alt="">
      </div>
      <div class="wf-hero-copy">
        <p>始于 2008 · 中国锻造轮毂品牌</p>
        <h1 id="wf-hero-title">始终领先一步。</h1>
        <span>探索策锐锻造的轮毂、制造与车型适配能力。</span>
      </div>
      <a class="wf-scroll" href="#vehicle">向下探索</a>
    </section>

    <section class="wf-vehicle" id="vehicle">
      <div class="wf-container" data-reveal>
        <p class="wf-eyebrow">车型适配</p>
        <h2>选择你的车型</h2>
        <form class="wf-vehicle-form" data-wf-vehicle-form>
          <label><span>车型年份</span><select name="year" data-wf-year><option value="">全部年份</option></select></label>
          <label><span>汽车品牌</span><select name="make" data-wf-make><option value="">选择品牌</option>${Object.keys(vehicleFallback).map(make => `<option value="${make}">${vehicleFallbackLabels[make] || make}</option>`).join('')}</select></label>
          <label><span>车型</span><select name="model" data-wf-model disabled><option value="">选择车型</option></select></label>
          <label><span>使用方向</span><select name="use"><option>日常道路</option><option>姿态改装</option><option>制动升级</option><option>赛道使用</option></select></label>
          <button type="submit">进入适配实验室</button>
        </form>
        <p class="wf-vehicle-note" data-wf-vehicle-note>正在载入完整车型目录。车型未列出也可以进入实验室继续填写驱动、制动与实测间隙。</p>
      </div>
    </section>

    <section class="wf-fitment-intro">
      <div class="wf-container wf-fitment-grid">
        <div data-reveal>
          <p class="wf-eyebrow wf-eyebrow-light">轮毂适配</p>
          <h2>百分之百围绕这台车。<br>不把参数交给运气。</h2>
          <p>从准确车型、轮毂宽度、偏距、孔距、中心孔，到制动空间和目标姿态，策锐用同一份车辆工程记录完成计算、选型与上车效果生成。</p>
          <a class="wf-button wf-button-light" href="/fitment-lab" data-app-path>开始计算</a>
        </div>
        <figure data-reveal><img src="/assets/cerui/cerui-event-wheel-wall-v1.webp" alt="策锐锻造轮毂展示墙" loading="lazy" decoding="async"></figure>
      </div>
    </section>

    <section class="wf-manufacture" id="manufacture">
      <div class="wf-container wf-manufacture-grid">
        <div class="wf-manufacture-film" data-reveal>
          <video controls playsinline preload="metadata" poster="/assets/cerui/cerui-factory-line-v1.webp">
            <source src="/assets/domestic/videos/cerui-factory-story-720p30-web.mp4?v=20260829-factory-film-v1" type="video/mp4">
          </video>
          <small>策锐真实工厂 · 生产与锻造全流程</small>
        </div>
        <div class="wf-copy" data-reveal>
          <p class="wf-eyebrow">制造实力</p>
          <h2>策锐制造</h2>
          <div class="wf-columns"><p>资料显示，策锐在 2022 年投资建设轮毂工厂，逐步打通从产品设计、模具开发、锻造坯料到 CNC 精密加工的上下游生产链。</p><p>围绕一片式、两片式与三片式锻造轮毂，生产过程覆盖表面处理、检测、包装与交付，并与车型适配数据保持一致。</p></div>
          <a class="wf-text-link" href="#technology">查看生产与技术</a>
        </div>
      </div>
    </section>

    <section class="wf-products" id="wheels">
      <div class="wf-container">
        <header class="wf-section-head" data-reveal><div><p class="wf-eyebrow">策锐轮毂</p><h2>精选轮毂系列</h2></div><a href="#store" data-category-link="Wheels">查看所有轮毂</a></header>
        <div class="wf-product-grid">${wheelProducts.map(productMarkup).join('')}</div>
      </div>
    </section>

    <section class="wf-features" id="technology">
      ${featureTiles.map(featureMarkup).join('')}
    </section>

    <section class="wf-drops">
      <div class="wf-container">
        <header class="wf-section-head wf-section-head-dark" data-reveal><div><p class="wf-eyebrow wf-eyebrow-light">新品与定制</p><h2>最新轮毂方向</h2></div><a href="/fitment-lab" data-app-path>生成我的车型效果</a></header>
        <div class="wf-drop-grid">
          <article data-reveal><img src="/assets/fbox-products/meridian-multi-spoke-01.png" alt="策锐多辐锻造轮毂" loading="lazy"><div><small>精密多辐</small><h3>MERIDIAN</h3><p>围绕豪华轿车与高性能车型定制宽度、偏距和表面。</p></div></article>
          <article data-reveal><img src="/assets/fbox-products/apex-split-spoke-01.jpg" alt="策锐性能分叉辐锻造轮毂" loading="lazy"><div><small>性能分叉辐</small><h3>APEX</h3><p>为大尺寸制动与运动姿态保留清晰的结构语言。</p></div></article>
        </div>
      </div>
    </section>

    <section class="wf-social" aria-label="策锐品牌现场">
      <div class="wf-social-copy" data-reveal><p>策锐现场</p><h2>与中国汽车文化保持连接</h2><span>品牌发布 · 轮毂展览 · GT SHOW · 赛道文化</span></div>
    </section>

    <section class="wf-videos" id="videos">
      <div class="wf-container">
        <header class="wf-section-head" data-reveal><div><p class="wf-eyebrow">视频专区</p><h2>策锐品牌影像</h2></div><p>从品牌发布到产品系列亮相，保留真实现场与制造过程。</p></header>
        <div class="wf-video-grid">
          <article data-reveal><video controls playsinline preload="metadata" poster="/assets/domestic/media/cerui-brand-launch-poster.webp"><source src="/assets/domestic/videos/cerui-brand-launch.mp4" type="video/mp4"></video><h3>策锐锻造品牌发布</h3><p>中国汽车文化节 · 品牌现场</p></article>
          <article data-reveal><video controls playsinline preload="metadata" poster="/assets/domestic/media/cerui-1990-launch-poster.webp"><source src="/assets/domestic/videos/cerui-1990-launch.mp4" type="video/mp4"></video><h3>1990 系列亮相</h3><p>轻量 · 空气动力 · 未来感</p></article>
          <article data-reveal><video controls playsinline preload="metadata" poster="/assets/cerui/cerui-factory-line-v1.webp"><source src="/assets/domestic/videos/cerui-factory-story-720p30-web.mp4?v=20260829-factory-film-v1" type="video/mp4"></video><h3>策锐真实工厂</h3><p>生产 · 锻造 · 精密加工 · 成品交付</p></article>
        </div>
      </div>
    </section>

    <section class="wf-network" id="network">
      <div class="wf-container wf-network-grid">
        <div class="wf-copy" data-reveal>
          <p class="wf-eyebrow">总部与全国网络</p>
          <h2>总部位于杭州。</h2>
          <div class="wf-columns"><p>企业资料列明杭州总部，以及北京、广州、郑州、武汉、廊坊、厦门、成都、合肥、乌鲁木齐等直营网点及代理城市。</p><p>现有材料可确认一座自有轮毂工厂。仓库节点与具体数量尚无完整公开资料，正式上线前需要由策锐确认。</p></div>
          <dl class="wf-network-facts"><div><dt>1</dt><dd>杭州总部</dd></div><div><dt>1</dt><dd>资料确认的轮毂工厂</dd></div><div><dt>9</dt><dd>直营网点及代理城市</dd></div></dl>
        </div>
        <figure data-reveal><img src="/assets/domestic/media/cerui-china-network-map.webp" alt="策锐锻造全国直营网点与代理网络地图" loading="lazy" decoding="async"><figcaption>地图依据策锐企业介绍资料整理</figcaption></figure>
      </div>
    </section>

    <section class="wf-story">
      <div class="wf-container wf-story-grid">
        <figure data-reveal><img src="/assets/domestic/media/cerui-awards.webp" alt="策锐锻造行业资质与奖项" loading="lazy" decoding="async"></figure>
        <div class="wf-copy" data-reveal><p class="wf-eyebrow">品牌历程</p><h2>从渠道经验，走向品牌与制造。</h2><p>2008 年进入汽车轮毂行业，2016 年注册“策锐”商标，2019 至 2021 年连续亮相全国 GT SHOW，2022 年投资建设轮毂工厂。</p><a class="wf-button" href="/fitment-lab" data-app-path>开始我的轮毂方案</a></div>
      </div>
    </section>

    <footer class="wf-footer">
      <div class="wf-container">
        <div class="wf-footer-main"><div><img src="/assets/cerui/cerui-logo-black-v1.webp" alt="策锐锻造 CIRUI FORGED"><p>车型适配 · 锻造轮毂设计 · 参数计算 · 效果生成 · 定制生产</p></div><nav><section><h3>轮毂与适配</h3><a href="#wheels">轮毂系列</a><a href="/fitment-lab" data-app-path>车型适配实验室</a><a href="#technology">生产与技术</a></section><section><h3>品牌信息</h3><a href="#manufacture">制造实力</a><a href="#videos">视频专区</a><a href="#network">全国网络</a></section><section class="wf-footer-contact"><h3>业务咨询 · 李炜</h3><button type="button" class="wf-footer-contact-phone" data-wf-contact-open>186 5819 1106</button><span>杭州策锐贸易有限公司</span><button type="button" class="wf-footer-wechat" data-wf-contact-open aria-label="打开李炜的电话和微信二维码联系卡片"><img src="/assets/domestic/media/cerui-wechat-contact-qr.webp" alt="李炜微信二维码" loading="lazy" decoding="async"><small>扫码加微信 · 点击查看</small></button></section></nav></div>
        <div class="wf-footer-bottom"><span>© 2026 杭州策锐贸易有限公司</span><a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">浙ICP备2026075816号-1</a></div>
      </div>
    </footer>
    <dialog class="wf-contact-dialog" data-wf-contact-dialog aria-labelledby="wf-contact-title">
      <button type="button" class="wf-contact-close" data-wf-contact-close aria-label="关闭联系卡片">×</button>
      <p class="wf-contact-eyebrow">策锐锻造 · 业务咨询</p>
      <h2 id="wf-contact-title">联系李炜</h2>
      <p class="wf-contact-intro">确认车型适配、定制细节与轮毂方案。可直接拨打电话，或扫码添加微信。</p>
      <div class="wf-contact-grid">
        <a class="wf-contact-call" href="tel:+8618658191106"><small>电话咨询</small><strong>186 5819 1106</strong><span>点击拨打电话 ↗</span></a>
        <div class="wf-contact-qr"><small>微信咨询 · 扫码加好友</small><a href="/assets/domestic/media/cerui-wechat-contact-qr.webp" target="_blank" rel="noopener noreferrer" aria-label="放大查看李炜的微信二维码"><img src="/assets/domestic/media/cerui-wechat-contact-qr.webp" alt="李炜微信二维码，扫码添加好友" loading="lazy" decoding="async"></a><span>点击二维码可放大查看</span></div>
      </div>
    </dialog>
  </main>`;
}

export function wireDomesticHome() {
  const root = document.querySelector('.wf-home');
  if (!root) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const contactDialog = root.querySelector('[data-wf-contact-dialog]');
  root.querySelectorAll('[data-wf-contact-open]').forEach(button => button.addEventListener('click', () => contactDialog?.showModal()));
  contactDialog?.querySelector('[data-wf-contact-close]')?.addEventListener('click', () => contactDialog.close());
  contactDialog?.addEventListener('click', event => { if (event.target === contactDialog) contactDialog.close(); });
  const heroVideo = root.querySelector('[data-wf-bbs-video]');
  const showHeroVideo = () => heroVideo?.classList.add('is-ready');
  if (heroVideo) {
    if (!heroVideo.paused && heroVideo.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) showHeroVideo();
    else heroVideo.addEventListener('playing', showHeroVideo, { once: true });
    void heroVideo.play().catch(() => { /* The poster remains visible when autoplay is unavailable. */ });
  }
  const header = root.querySelector('[data-wf-header]');
  const menu = root.querySelector('.wf-menu');
  const menuButton = root.querySelector('[data-wf-menu]');
  const setHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 40);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  const setMenu = open => {
    menu?.classList.toggle('is-open', open);
    root.classList.toggle('has-open-menu', open);
    menu?.setAttribute('aria-hidden', String(!open));
    menuButton?.setAttribute('aria-expanded', String(open));
  };
  menuButton?.addEventListener('click', () => setMenu(!menu?.classList.contains('is-open')));
  root.querySelectorAll('[data-wf-menu-close]').forEach(button => button.addEventListener('click', () => setMenu(false)));

  const yearSelect = root.querySelector('[data-wf-year]');
  const makeSelect = root.querySelector('[data-wf-make]');
  const modelSelect = root.querySelector('[data-wf-model]');
  const vehicleNote = root.querySelector('[data-wf-vehicle-note]');
  let directory;

  const sourceBrandLabels = payload => {
    const labels = new Map();
    (payload?.sources || []).forEach(source => (source.make_pages || []).forEach(item => {
      if (item.make && item.source_brand) labels.set(item.make, item.source_brand);
    }));
    return labels;
  };

  const makesInDirectory = payload => [...new Set(Object.values(payload?.years || {}).flatMap(year => Object.keys(year || {})))]
    .sort((a, b) => a.localeCompare(b, 'zh-CN', { numeric: true, sensitivity: 'base' }));

  const modelsForSelection = (payload, year, make) => {
    if (!make) return [];
    const years = year ? [payload?.years?.[year]] : Object.values(payload?.years || {});
    return [...new Set(years.flatMap(entry => Object.keys(entry?.[make] || {})))]
      .sort((a, b) => a.localeCompare(b, 'zh-CN', { numeric: true, sensitivity: 'base' }));
  };

  const setOptions = (select, placeholder, options, selected = '') => {
    if (!select) return;
    select.replaceChildren(new Option(placeholder, ''), ...options.map(option => new Option(option.label, option.value)));
    if (selected && options.some(option => option.value === selected)) select.value = selected;
  };

  const updateModels = () => {
    if (!modelSelect || !makeSelect) return;
    const selectedModel = modelSelect.value;
    const models = directory
      ? modelsForSelection(directory, yearSelect?.value || '', makeSelect.value)
      : vehicleFallback[makeSelect.value] || [];
    setOptions(modelSelect, models.length ? '选择车型' : makeSelect.value ? '该年份暂无车型记录' : '请先选择品牌', models.map(model => ({ value: model, label: model })), selectedModel);
    modelSelect.disabled = !makeSelect.value || models.length === 0;
  };

  makeSelect?.addEventListener('change', updateModels);
  yearSelect?.addEventListener('change', updateModels);

  void loadVehicleDirectory().then(payload => {
    directory = payload;
    const selectedYear = yearSelect?.value || '';
    const selectedMake = makeSelect?.value || '';
    const labels = sourceBrandLabels(payload);
    const years = Object.keys(payload?.years || {}).sort((a, b) => Number(b) - Number(a));
    const makes = makesInDirectory(payload);
    setOptions(yearSelect, '全部年份', years.map(year => ({ value: year, label: `${year} 年` })), selectedYear);
    setOptions(makeSelect, '选择品牌', makes.map(make => {
      const localized = labels.get(make) || vehicleFallbackLabels[make] || '';
      return { value: make, label: localized && localized !== make ? `${localized} / ${make}` : make };
    }), selectedMake);
    updateModels();
    if (vehicleNote) vehicleNote.textContent = `已载入 ${payload?.stats?.makes || makes.length} 个品牌、${payload?.stats?.model_year_entries || 0} 条车型年份记录。选择后会带入适配实验室继续确认配置与驱动。`;
  }).catch(error => {
    if (vehicleNote) vehicleNote.textContent = `${error.message}，当前显示常用品牌；仍可进入适配实验室使用完整表单。`;
  });

  root.querySelector('[data-wf-vehicle-form]')?.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const vehicle = Object.fromEntries(['year', 'make', 'model']
      .map(field => [field, String(values.get(field) || '').trim()])
      .filter(([, value]) => value));
    if (Object.keys(vehicle).length) localStorage.setItem('fbox-vehicle', JSON.stringify(vehicle));
    else localStorage.removeItem('fbox-vehicle');
    const usage = { 日常道路: 'street', 姿态改装: 'show', 制动升级: 'spirited', 赛道使用: 'track' }[values.get('use')] || 'street';
    let draft = {};
    try { draft = JSON.parse(localStorage.getItem('fbox-fitment-draft') || '{}') || {}; } catch { /* Reset a damaged local draft. */ }
    localStorage.setItem('fbox-fitment-draft', JSON.stringify({ ...draft, workflow_mode: 'fitment-first', usage }));
    window.location.assign('/fitment-lab');
  });

  root.querySelectorAll('a[href^="#"]').forEach(link => {
    const id = link.getAttribute('href')?.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    link.addEventListener('click', event => {
      event.preventDefault();
      setMenu(false);
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  const reveals = [...root.querySelectorAll('[data-reveal]')];
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(element => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
  reveals.forEach(element => observer.observe(element));
}
