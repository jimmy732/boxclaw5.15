(function () {
  'use strict';

  const state = { jobs: [], observer: null, queued: false, lastTrigger: null };

  const cleanUrl = value => {
    const source = String(value || '').trim();
    if (!source) return '';
    if (source.startsWith('/')) return source;
    try {
      const parsed = new URL(source, window.location.origin);
      return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : '';
    } catch {
      return '';
    }
  };

  const fileSize = value => {
    const bytes = Number(value || 0);
    if (!bytes) return '';
    if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const imageMeta = job => {
    const dimensions = Number(job.vehicle_image_width) && Number(job.vehicle_image_height)
      ? `${job.vehicle_image_width} × ${job.vehicle_image_height}`
      : '';
    return [dimensions, fileSize(job.vehicle_image_bytes), job.vehicle_image_mime?.replace('image/', '').toUpperCase()]
      .filter(Boolean)
      .join(' · ');
  };

  const statusLabel = status => ({
    queued: '排队中',
    running: '生成中',
    succeeded: '已完成',
    reviewed: '已复核',
    failed: '失败'
  })[status] || status || '未知';

  const resultImages = job => (Array.isArray(job?.results) ? job.results : []).map((result, index) => ({
    id: result?.id || `result-${index + 1}`,
    url: cleanUrl(result?.image_url || result?.imageUrl || result?.url),
    label: result?.angle || `生成结果 ${index + 1}`,
    selected: false
  })).filter(item => item.url);

  function taskImages(job) {
    const results = resultImages(job);
    const selectedUrl = cleanUrl(job?.selected_image_url);
    if (!selectedUrl) return results;
    const selected = {
      id: job.selected_concept_id || 'selected-concept',
      url: selectedUrl,
      label: '选中方案',
      selected: true
    };
    if (job.design_phase !== 'multiview') return [selected, ...results];
    const byId = new Map(results.map(item => [item.id, item]));
    const multiviewOrder = [
      'front', 'front-right-45', 'right-90',
      'front-left-315', 'selected-concept', 'rear-right-135',
      'left-270', 'rear-left-225', 'rear-180'
    ];
    byId.set('selected-concept', selected);
    const ordered = multiviewOrder.map(id => byId.get(id)).filter(Boolean);
    results.forEach(item => {
      if (!ordered.includes(item)) ordered.push(item);
    });
    return ordered;
  }

  function ensureViewer() {
    let viewer = document.getElementById('fbox-job-photo-viewer');
    if (viewer) return viewer;
    viewer = document.createElement('div');
    viewer.id = 'fbox-job-photo-viewer';
    viewer.className = 'fbox-job-photo-viewer';
    viewer.hidden = true;
    viewer.innerHTML = `
      <div class="fbox-job-photo-dialog" role="dialog" aria-modal="true" aria-labelledby="fbox-job-photo-title">
        <header>
          <div>
            <span id="fbox-job-photo-kicker">客户上传原图</span>
            <h2 id="fbox-job-photo-title">车辆照片</h2>
            <p id="fbox-job-photo-meta"></p>
          </div>
          <button type="button" class="fbox-job-photo-close" aria-label="关闭大图预览">×</button>
        </header>
        <div class="fbox-job-task-summary" hidden>
          <div class="fbox-job-task-facts"></div>
          <div class="fbox-job-task-prompt" hidden><b>客户需求</b><p></p></div>
          <div class="fbox-job-task-error" hidden><b>失败原因</b><p></p></div>
        </div>
        <div class="fbox-job-photo-stage"></div>
        <footer>
          <span id="fbox-job-photo-footer">可放大查看车身角度、光线和轮比例</span>
          <a id="fbox-job-photo-link" target="_blank" rel="noopener noreferrer">在新窗口打开 ↗</a>
        </footer>
      </div>`;
    viewer.addEventListener('click', event => {
      if (event.target === viewer || event.target.closest('.fbox-job-photo-close')) closeViewer();
    });
    document.body.appendChild(viewer);
    return viewer;
  }

  function openViewer(url, title, meta, fallback, trigger) {
    const source = cleanUrl(url);
    if (!source) return;
    const viewer = ensureViewer();
    const stage = viewer.querySelector('.fbox-job-photo-stage');
    const summary = viewer.querySelector('.fbox-job-task-summary');
    const link = viewer.querySelector('#fbox-job-photo-link');
    viewer.querySelector('#fbox-job-photo-title').textContent = title || '车辆照片';
    viewer.querySelector('#fbox-job-photo-kicker').textContent = fallback ? '历史任务 · 原图未留存' : '客户上传原图';
    viewer.querySelector('#fbox-job-photo-meta').textContent = fallback
      ? '该旧任务只保存了文件名，当前展示第 1 张生成结果供追溯。'
      : (meta || '原始车辆照片');
    summary.hidden = true;
    stage.className = 'fbox-job-photo-stage';
    stage.textContent = '';
    const image = document.createElement('img');
    image.src = source;
    image.alt = title || '车辆照片';
    stage.appendChild(image);
    viewer.querySelector('#fbox-job-photo-footer').textContent = '可放大查看车身角度、光线和轮比例';
    link.href = source;
    link.hidden = false;
    viewer.hidden = false;
    state.lastTrigger = trigger || document.activeElement;
    document.body.classList.add('fbox-job-photo-viewer-open');
    viewer.querySelector('.fbox-job-photo-close').focus({ preventScroll: true });
  }

  function openTaskViewer(job, trigger) {
    if (!job) return;
    const viewer = ensureViewer();
    const images = taskImages(job);
    const results = resultImages(job);
    const expected = Number(job.angles || 0);
    const hasSelected = Boolean(cleanUrl(job.selected_image_url));
    const isHistoricalMultiview = job.design_phase === 'multiview' && !hasSelected;
    const stage = viewer.querySelector('.fbox-job-photo-stage');
    const summary = viewer.querySelector('.fbox-job-task-summary');
    const facts = viewer.querySelector('.fbox-job-task-facts');
    const prompt = viewer.querySelector('.fbox-job-task-prompt');
    const error = viewer.querySelector('.fbox-job-task-error');
    const link = viewer.querySelector('#fbox-job-photo-link');

    viewer.querySelector('#fbox-job-photo-kicker').textContent = job.design_phase === 'multiview'
      ? '客户九宫格任务'
      : '客户生成任务';
    viewer.querySelector('#fbox-job-photo-title').textContent = job.product_name || job.job_id || job.id || '效果图任务';
    viewer.querySelector('#fbox-job-photo-meta').textContent = job.job_id || job.id || '';
    facts.textContent = '';
    [
      ['状态', statusLabel(job.status)],
      ['生成结果', `${results.length}${expected ? ` / ${expected}` : ''}`],
      ['模型', job.generation_model || '未记录'],
      ['适配信息', job.product_fitment || job.vehicle_name || '未记录']
    ].forEach(([label, value]) => {
      const item = document.createElement('span');
      const key = document.createElement('b');
      key.textContent = label;
      item.append(key, document.createTextNode(value));
      facts.appendChild(item);
    });
    prompt.hidden = !job.design_prompt;
    prompt.querySelector('p').textContent = job.design_prompt || '';
    error.hidden = job.status !== 'failed' && !job.message;
    error.querySelector('p').textContent = job.message || '';
    summary.hidden = false;

    stage.className = 'fbox-job-photo-stage is-gallery';
    stage.textContent = '';
    if (images.length) {
      const grid = document.createElement('div');
      grid.className = `fbox-job-result-grid${hasSelected && job.design_phase === 'multiview' ? ' is-nine' : ''}`;
      images.forEach((item, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `fbox-job-result-card${item.selected ? ' is-selected' : ''}`;
        button.setAttribute('aria-label', `放大查看 ${item.label}`);
        const image = document.createElement('img');
        image.src = item.url;
        image.alt = item.label;
        image.loading = 'lazy';
        const caption = document.createElement('span');
        caption.textContent = item.label;
        button.append(image, caption);
        button.addEventListener('click', () => openViewer(item.url, item.label, `${job.job_id || job.id || ''} · 第 ${index + 1} 张`, false, button));
        grid.appendChild(button);
      });
      stage.appendChild(grid);
    } else {
      const empty = document.createElement('div');
      empty.className = 'fbox-job-result-empty';
      empty.textContent = job.message || (['queued', 'running'].includes(job.status) ? '任务仍在生成中，刷新后可查看结果。' : '这个任务没有保存可查看的生成结果。');
      stage.appendChild(empty);
    }
    viewer.querySelector('#fbox-job-photo-footer').textContent = isHistoricalMultiview
      ? `已保存 ${results.length} 张生成角度；这条历史任务未保存中间的“选中方案”。`
      : `已保存 ${results.length} 张生成结果${hasSelected ? '，并保留了选中方案。' : '。'}`;
    link.hidden = true;
    link.removeAttribute('href');
    viewer.hidden = false;
    state.lastTrigger = trigger || document.activeElement;
    document.body.classList.add('fbox-job-photo-viewer-open');
    viewer.querySelector('.fbox-job-photo-close').focus({ preventScroll: true });
  }

  function closeViewer() {
    const viewer = document.getElementById('fbox-job-photo-viewer');
    if (!viewer || viewer.hidden) return;
    viewer.hidden = true;
    viewer.querySelector('.fbox-job-photo-stage').textContent = '';
    document.body.classList.remove('fbox-job-photo-viewer-open');
    state.lastTrigger?.focus?.({ preventScroll: true });
  }

  function jobForRow(row) {
    const firstCellText = row.querySelector('td')?.textContent || '';
    return state.jobs.find(job => firstCellText.includes(job.job_id || job.id || '')) || null;
  }

  function columnIndex(table, label) {
    const headers = Array.from(table.querySelectorAll('.el-table__header-wrapper thead th'));
    return headers.findIndex(header => header.textContent.trim().includes(label));
  }

  function decorateTable(table) {
    const photoIndex = columnIndex(table, '车辆照片');
    const resultIndex = columnIndex(table, '结果');
    if (photoIndex < 0 && resultIndex < 0) return;
    table.querySelectorAll('.el-table__body-wrapper tbody tr').forEach(row => {
      const job = jobForRow(row);
      if (!job) return;
      const cells = row.querySelectorAll(':scope > td');
      const cell = cells[photoIndex];
      const jobId = job.job_id || job.id;
      if (cell && cell.dataset.fboxPhotoJob !== jobId) {
        const filename = job.vehicle_file_name || job.vehicle_name || '匿名上传';
        const originalUrl = cleanUrl(job.vehicle_image_url);
        const fallbackUrl = cleanUrl(job.results?.[0]?.image_url || job.results?.[0]?.imageUrl || job.results?.[0]?.url);
        const url = originalUrl || fallbackUrl;
        const fallback = !originalUrl && Boolean(fallbackUrl);
        cell.dataset.fboxPhotoJob = jobId;
        const content = cell.querySelector('.cell') || cell;
        content.textContent = '';

        if (!url) {
          const empty = document.createElement('div');
          empty.className = 'fbox-job-photo-empty';
          empty.innerHTML = `<span></span><div><strong></strong><small>历史任务未保存原图</small></div>`;
          empty.querySelector('strong').textContent = filename;
          content.appendChild(empty);
        } else {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = `fbox-job-photo-thumb${fallback ? ' is-history-fallback' : ''}`;
          button.setAttribute('aria-label', `放大查看 ${filename}`);
          button.innerHTML = `<span class="fbox-job-photo-image"><img loading="lazy" alt=""><i>放大</i></span><span class="fbox-job-photo-copy"><strong></strong><small></small></span>`;
          const image = button.querySelector('img');
          image.src = url;
          image.alt = filename;
          image.addEventListener('error', () => button.classList.add('is-broken'), { once: true });
          button.querySelector('strong').textContent = filename;
          button.querySelector('small').textContent = fallback
            ? '历史任务 · 点击查看第 1 张结果'
            : (imageMeta(job) || '原始车辆照片 · 点击放大');
          button.addEventListener('click', () => openViewer(url, filename, imageMeta(job), fallback, button));
          content.appendChild(button);
        }
      }

      const resultCell = cells[resultIndex];
      if (!resultCell || resultCell.dataset.fboxResultsJob === jobId) return;
      resultCell.dataset.fboxResultsJob = jobId;
      const resultContent = resultCell.querySelector('.cell') || resultCell;
      const images = resultImages(job);
      resultContent.textContent = '';
      const details = document.createElement('button');
      details.type = 'button';
      details.className = `fbox-job-results-button is-${job.status || 'unknown'}`;
      details.innerHTML = '<strong></strong><small></small>';
      details.querySelector('strong').textContent = images.length
        ? `查看 ${images.length} 张`
        : (job.status === 'failed' ? '查看失败原因' : '查看任务');
      details.querySelector('small').textContent = images.length && Number(job.angles)
        ? `${images.length} / ${job.angles} 已保存`
        : statusLabel(job.status);
      details.addEventListener('click', () => openTaskViewer(job, details));
      resultContent.appendChild(details);
    });
  }

  function decorate() {
    state.queued = false;
    if (!state.jobs.length) return;
    document.querySelectorAll('.el-table').forEach(decorateTable);
  }

  function scheduleDecorate() {
    if (state.queued) return;
    state.queued = true;
    window.requestAnimationFrame(decorate);
  }

  const nativeFetch = window.fetch.bind(window);
  window.fetch = async function (...args) {
    const response = await nativeFetch(...args);
    const requestUrl = String(typeof args[0] === 'string' ? args[0] : args[0]?.url || '');
    if (/\/api\/fbox-ops\/jobs(?:\?|$)/.test(requestUrl) && response.ok) {
      response.clone().json().then(payload => {
        state.jobs = Array.isArray(payload?.data) ? payload.data : [];
        scheduleDecorate();
      }).catch(() => {});
    }
    return response;
  };

  window.FBoxAdminPhotoViewer = { open: openViewer, openTask: openTaskViewer, close: closeViewer };
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeViewer();
  });
  window.addEventListener('hashchange', scheduleDecorate);
  document.addEventListener('DOMContentLoaded', () => {
    state.observer = new MutationObserver(scheduleDecorate);
    state.observer.observe(document.body, { childList: true, subtree: true });
    scheduleDecorate();
  });
})();
