(() => {
  const nativeFetch = window.fetch.bind(window);
  let latestDashboard = null;
  let renderTimer = 0;

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));

  function scheduleRender() {
    if (renderTimer) return;
    renderTimer = window.setTimeout(() => {
      renderTimer = 0;
      renderJourneyAnalytics();
    }, 30);
  }

  window.fetch = async (...args) => {
    const response = await nativeFetch(...args);
    const input = args[0];
    const requestUrl = typeof input === 'string' ? input : input?.url || '';
    if (response.ok && /\/api\/fbox-ops\/analytics(?:\?|$)/.test(requestUrl)) {
      response.clone().json().then(payload => {
        latestDashboard = payload?.data || payload;
        scheduleRender();
      }).catch(() => {});
    }
    return response;
  };

  function durationLabel(seconds) {
    if (!Number.isFinite(seconds)) return '旧数据未知';
    if (seconds < 60) return `${Math.max(0, Math.round(seconds))} 秒`;
    const minutes = Math.floor(seconds / 60);
    const rest = Math.round(seconds % 60);
    return `${minutes} 分 ${rest} 秒`;
  }

  function dateLabel(value) {
    const date = new Date(value || '');
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  }

  function outcomeClass(code) {
    if (code === 'completed') return 'is-complete';
    if (code === 'error') return 'is-error';
    if (code === 'legacy_unknown') return 'is-unknown';
    if (code === 'quick_exit') return 'is-quick';
    return 'is-abandoned';
  }

  function metric(label, value, note = '') {
    return `<article><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong>${note ? `<small>${escapeHtml(note)}</small>` : ''}</article>`;
  }

  function funnelMarkup(rows = []) {
    const base = Math.max(1, Number(rows[0]?.value || 0));
    return `<div class="fbox-journey-funnel">${rows.map((row, index) => {
      const percent = Math.round((Number(row.value || 0) / base) * 100);
      return `<div class="fbox-funnel-stage"><div><span>${String(index + 1).padStart(2, '0')}</span><b>${escapeHtml(row.label)}</b><strong>${escapeHtml(row.value)}</strong></div><i><em style="width:${percent}%"></em></i><small>${percent}%</small></div>`;
    }).join('')}</div>`;
  }

  function abandonmentMarkup(rows = []) {
    if (!rows.length) return '<p class="fbox-journey-empty">还没有可分析的离开记录。</p>';
    const max = Math.max(1, ...rows.map(row => Number(row.value || 0)));
    return `<div class="fbox-abandon-list">${rows.slice(0, 6).map(row => `<div><span title="${escapeHtml(row.label)}">${escapeHtml(row.label)}</span><i><em style="width:${Math.round((Number(row.value || 0) / max) * 100)}%"></em></i><b>${escapeHtml(row.value)}</b></div>`).join('')}</div>`;
  }

  function timelineMarkup(session) {
    const rows = Array.isArray(session.timeline) ? session.timeline : [];
    if (!rows.length) return '<p class="fbox-journey-empty">这条旧记录没有更细的行为事件。</p>';
    return `<ol class="fbox-session-timeline">${rows.map(event => `<li><time>+${escapeHtml(event.offset_seconds)}s</time><i></i><div><strong>${escapeHtml(event.label || event.action || event.type)}</strong>${event.step ? `<small>第 ${escapeHtml(event.step)} 步</small>` : ''}</div></li>`).join('')}</ol>`;
  }

  function sessionMarkup(session) {
    const locationLabel = [session.country, session.city].filter(Boolean).join(' · ') || '本地 / 未识别';
    const evidence = session.outcome_code === 'legacy_unknown'
      ? '当时版本只记了页面打开，不能反推停留或点击。'
      : `${session.event_count || 0} 个事件 · 最高到第 ${session.max_step || 0} 步`;
    return `<details class="fbox-session-row">
      <summary>
        <span class="fbox-session-time">${escapeHtml(dateLabel(session.first_seen_at))}</span>
        <span><b>${escapeHtml(locationLabel)}</b><small>${escapeHtml(session.ip || '')}</small></span>
        <span><b>${escapeHtml(session.device || '电脑')}</b><small>${escapeHtml(session.source || 'Direct')}</small></span>
        <span><b>${escapeHtml(durationLabel(session.active_seconds))}</b><small>有效停留</small></span>
        <span><b>${Number.isFinite(session.max_scroll) ? `${escapeHtml(session.max_scroll)}%` : '未知'}</b><small>最大滚动</small></span>
        <span class="fbox-session-outcome ${outcomeClass(session.outcome_code)}">${escapeHtml(session.outcome)}</span>
        <span class="fbox-session-open">查看轨迹⌄</span>
      </summary>
      <div class="fbox-session-detail"><div class="fbox-session-evidence"><b>判断依据</b><span>${escapeHtml(evidence)}</span><small>只采集页面行为，不采集输入框文字。</small></div>${timelineMarkup(session)}</div>
    </details>`;
  }

  function journeyMarkup(analytics) {
    const summary = analytics.summary || {};
    const sessions = Array.isArray(analytics.sessions) ? analytics.sessions : [];
    const unknownCount = Math.max(0, Number(summary.sessions || 0) - Number(summary.known_sessions || 0));
    const median = Number.isFinite(summary.median_active_seconds) ? durationLabel(summary.median_active_seconds) : '待采集';
    return `<section id="fbox-fitment-journeys" class="fbox-journey-card">
      <header><div><span>FITMENT JOURNEY</span><h3>适配实验室点击与停留分析</h3><p>判断访客是快速离开、只浏览、开始填写后流失、遇到错误，还是完成了计算。</p></div><b>新版本上线后生效</b></header>
      ${unknownCount ? `<div class="fbox-journey-notice"><strong>${unknownCount} 条旧访问无法还原停留</strong><span>包括截图里的历史访问；从新版本上线后的访问开始会有完整轨迹。</span></div>` : ''}
      <div class="fbox-journey-metrics">
        ${metric('访问会话', summary.sessions || 0, `${summary.known_sessions || 0} 条有完整轨迹`)}
        ${metric('有效浏览', summary.engaged || 0, '≥10 秒 / 有滚动 / 有操作')}
        ${metric('开始使用', summary.started || 0, `开始率 ${summary.start_rate || 0}%`)}
        ${metric('完成计算', summary.completed || 0, `使用后完成率 ${summary.completion_rate || 0}%`)}
        ${metric('中位有效停留', median, '仅计算有停留数据的访问')}
      </div>
      <div class="fbox-journey-grid"><article><h4>使用漏斗</h4><p>从进入页面到完成计算，每一步还有多少访问。</p>${funnelMarkup(analytics.funnel || [])}</article><article><h4>离开位置</h4><p>优先查看人数最多的流失节点，再针对该步骤改界面。</p>${abandonmentMarkup(analytics.abandonment || [])}</article></div>
      <div class="fbox-session-list"><div class="fbox-session-head"><div><h4>最近访问旅程</h4><p>点击一行展开，查看该访客在页面内的操作顺序。</p></div><span>${sessions.length} 条</span></div>${sessions.length ? sessions.map(sessionMarkup).join('') : '<p class="fbox-journey-empty is-large">还没有适配实验室访问。</p>'}</div>
    </section>`;
  }

  function renderJourneyAnalytics() {
    const existing = document.querySelector('#fbox-fitment-journeys');
    if (!location.hash.startsWith('#/analytics')) {
      existing?.remove();
      return;
    }
    const page = document.querySelector('.analytics-page');
    const analytics = latestDashboard?.fitment_analytics;
    if (!page || !analytics) return;
    if (existing?.__fboxJourneyAnalytics === analytics) return;
    const anchor = page.querySelector('.kpi-row') || page.querySelector('.page-header');
    if (!anchor) return;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = journeyMarkup(analytics);
    const next = wrapper.firstElementChild;
    next.__fboxJourneyAnalytics = analytics;
    if (existing) existing.replaceWith(next);
    else anchor.insertAdjacentElement('afterend', next);
  }

  const observer = new MutationObserver(scheduleRender);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('hashchange', scheduleRender);
})();
