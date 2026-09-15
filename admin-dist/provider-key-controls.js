(function installProviderKeyControls() {
  'use strict';

  const nativeFetch = window.fetch.bind(window);
  const state = {
    authorization: '',
    configured: false,
    keys: [],
    primaryId: '',
    selectedId: '',
    mode: 'saved',
    modeTouched: false,
    manager: null,
    keyInput: null,
    revealedKeys: new Map(),
    busy: false
  };

  function requestUrl(resource) {
    try {
      const value = typeof resource === 'string' ? resource : resource?.url;
      return new URL(value || '', window.location.href);
    } catch {
      return null;
    }
  }

  function storedAuthorization() {
    if (state.authorization) return state.authorization;
    const findToken = (value, depth = 0) => {
      if (!value || depth > 5) return '';
      if (typeof value === 'string') return /^Bearer\s+\S+/i.test(value) ? value : '';
      if (Array.isArray(value)) {
        for (const item of value) {
          const match = findToken(item, depth + 1);
          if (match) return match;
        }
        return '';
      }
      if (typeof value === 'object') {
        for (const [key, item] of Object.entries(value)) {
          if (key === 'token' && typeof item === 'string' && item.trim()) {
            return /^Bearer\s+/i.test(item) ? item.trim() : `Bearer ${item.trim()}`;
          }
          const match = findToken(item, depth + 1);
          if (match) return match;
        }
      }
      return '';
    };
    for (let index = 0; index < window.localStorage.length; index += 1) {
      try {
        const raw = window.localStorage.getItem(window.localStorage.key(index));
        const token = findToken(JSON.parse(raw));
        if (token) return token;
      } catch {
        // Ignore unrelated local-storage entries.
      }
    }
    return '';
  }

  async function adminJson(path, options = {}) {
    const authorization = storedAuthorization();
    if (!authorization) throw new Error('无法读取管理员登录状态，请刷新页面后重试。');
    const response = await nativeFetch(path, {
      ...options,
      cache: 'no-store',
      headers: { Accept: 'application/json', Authorization: authorization, ...(options.headers || {}) }
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.detail || payload.message || '策锐官网 Key 接口请求失败。');
    return payload?.data || payload;
  }

  function setInputValue(input, value) {
    if (!input) return;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
    if (setter) setter.call(input, value);
    else input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function feedback(message, kind = '') {
    const output = state.manager?.querySelector('[data-key-feedback]');
    if (!output) return;
    output.textContent = message;
    output.dataset.kind = kind;
  }

  function renderKeys() {
    const list = state.manager?.querySelector('[data-key-list]');
    const count = state.manager?.querySelector('[data-key-count]');
    if (!list) return;
    if (count) count.textContent = `${state.keys.length} 个已保存 Key`;
    list.replaceChildren();
    if (!state.keys.length) {
      const empty = document.createElement('div');
      empty.className = 'fbox-provider-key-empty';
      empty.textContent = '服务器尚未保存 Key，请在下方添加第一个。';
      list.appendChild(empty);
      return;
    }
    state.keys.forEach((key, index) => {
      const isPrimary = key.id === state.primaryId;
      const isSelected = state.mode === 'saved' && key.id === state.selectedId;
      const revealed = state.revealedKeys.get(key.id) || '';
      const row = document.createElement('article');
      row.className = `fbox-provider-key-card${isSelected ? ' is-selected' : ''}${isPrimary ? ' is-primary' : ''}`;
      row.dataset.keyId = key.id;
      row.innerHTML = `
        <input class="fbox-provider-key-radio" type="radio" name="fbox-provider-key-preference">
        <div class="fbox-provider-key-copy"><strong></strong><small></small></div>
        <em class="fbox-provider-key-badge"></em>
        <div class="fbox-provider-key-actions">
          <button type="button" data-action="reveal"></button>
          <button type="button" data-action="copy">复制 Key</button>
        </div>
        <code class="fbox-provider-key-secret"></code>`;
      const radio = row.querySelector('.fbox-provider-key-radio');
      radio.value = key.id;
      radio.checked = isSelected;
      radio.disabled = state.busy;
      radio.setAttribute('aria-label', `优先使用 ${key.label || `Key ${index + 1}`}`);
      row.querySelector('strong').textContent = key.label || `Key ${index + 1}`;
      row.querySelector('small').textContent = key.key_preview || '已保存（脱敏）';
      const badge = row.querySelector('.fbox-provider-key-badge');
      badge.textContent = isPrimary ? '当前优先' : '可选';
      badge.dataset.primary = isPrimary ? 'true' : 'false';
      const reveal = row.querySelector('[data-action="reveal"]');
      const copy = row.querySelector('[data-action="copy"]');
      const secret = row.querySelector('.fbox-provider-key-secret');
      reveal.textContent = revealed ? '隐藏完整 Key' : '显示完整 Key';
      reveal.disabled = state.busy;
      copy.hidden = !revealed;
      copy.disabled = state.busy;
      secret.hidden = !revealed;
      secret.textContent = revealed;
      radio.addEventListener('change', () => switchPrimaryKey(key.id));
      reveal.addEventListener('click', () => toggleRevealKey(key.id));
      copy.addEventListener('click', () => copyKey(key.id));
      list.appendChild(row);
    });
  }

  function syncModeControls() {
    const addChoice = state.manager?.querySelector('[data-add-key-choice]');
    const labelWrap = state.manager?.querySelector('[data-new-key-options]');
    if (addChoice) addChoice.checked = state.mode === 'new';
    if (labelWrap) labelWrap.hidden = state.mode !== 'new';
    if (state.keyInput) {
      const adding = state.mode === 'new';
      state.keyInput.disabled = !adding;
      state.keyInput.setAttribute('aria-disabled', adding ? 'false' : 'true');
      state.keyInput.placeholder = adding ? '粘贴新的 LingkeAI 接口密钥' : '从上方 Key 池选择当前优先 Key';
      if (!adding) setInputValue(state.keyInput, '');
    }
    state.manager?.classList.toggle('is-adding-new', state.mode === 'new');
    renderKeys();
  }

  function chooseNewKey(announce = true) {
    state.mode = 'new';
    state.modeTouched = true;
    syncModeControls();
    if (announce) feedback('输入新 Key 后点击“保存并验证”，新 Key 会加入池中并成为优先项，旧 Key 会全部保留。', 'info');
    state.keyInput?.focus();
  }

  function applyStatus(payload) {
    const data = payload?.data || payload || {};
    const keys = Array.isArray(data.api_keys) ? data.api_keys : [];
    state.keys = keys.map((item, index) => ({
      id: String(item.id || `key-${index + 1}`),
      label: String(item.label || `Key ${index + 1}`),
      key_preview: String(item.key_preview || ''),
      is_primary: Boolean(item.is_primary)
    }));
    if (!state.keys.length && data.configured) {
      state.keys = [{ id: String(data.primary_api_key_id || 'legacy-primary'), label: 'Key 1', key_preview: String(data.key_preview || ''), is_primary: true }];
    }
    state.primaryId = String(data.primary_api_key_id || state.keys.find(item => item.is_primary)?.id || state.keys[0]?.id || '');
    state.configured = state.keys.length > 0;
    if (!state.modeTouched || state.mode === 'saved') {
      state.mode = state.configured ? 'saved' : 'new';
      state.selectedId = state.primaryId;
    }
    syncModeControls();
  }

  window.fetch = async function fboxKeyPoolAwareFetch(resource, options = {}) {
    const url = requestUrl(resource);
    const request = typeof Request !== 'undefined' && resource instanceof Request ? resource : null;
    const headers = new Headers(options.headers || request?.headers || {});
    const authorization = headers.get('Authorization');
    if (authorization && url?.pathname.startsWith('/api/')) state.authorization = authorization;

    let nextOptions = options;
    const method = String(options.method || request?.method || 'GET').toUpperCase();
    if (url?.pathname.replace(/\/$/, '') === '/api/fbox-admin/config' && method === 'PUT' && typeof options.body === 'string') {
      try {
        const body = JSON.parse(options.body);
        body.credential_preference = state.mode;
        if (state.mode === 'saved') {
          body.credential_id = state.selectedId || state.primaryId;
          body.api_key = '';
        } else {
          body.key_label = String(state.manager?.querySelector('[data-new-key-label]')?.value || '').trim();
        }
        nextOptions = { ...options, body: JSON.stringify(body) };
      } catch {
        // Leave non-JSON requests untouched.
      }
    }

    const response = await nativeFetch(resource, nextOptions);
    if (url?.pathname.replace(/\/$/, '') === '/api/fbox-admin/status' && response.ok) {
      response.clone().json().then(applyStatus).catch(() => {});
    }
    if (url?.pathname.replace(/\/$/, '') === '/api/fbox-admin/config' && method === 'PUT' && response.ok) {
      response.clone().json().then(payload => {
        const addedNewKey = state.mode === 'new';
        state.modeTouched = false;
        state.revealedKeys.clear();
        const labelInput = state.manager?.querySelector('[data-new-key-label]');
        if (labelInput) labelInput.value = '';
        applyStatus(payload);
        feedback(addedNewKey ? '新 Key 已加入 Key 池并设为当前优先项；原有 Key 已保留。' : '配置已保存，当前优先 Key 保持不变。', 'success');
      }).catch(() => {});
    }
    return response;
  };

  async function switchPrimaryKey(keyId) {
    if (state.busy) return;
    if (keyId === state.primaryId) {
      state.mode = 'saved';
      state.modeTouched = false;
      state.selectedId = keyId;
      syncModeControls();
      feedback('这个 Key 已经是当前优先项。', 'info');
      return;
    }
    const previousPrimaryId = state.primaryId;
    state.mode = 'saved';
    state.selectedId = keyId;
    state.busy = true;
    syncModeControls();
    feedback('正在验证并切换优先 Key…', 'info');
    try {
      const payload = await adminJson('/api/fbox-admin/keys/primary', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key_id: keyId })
      });
      state.modeTouched = false;
      applyStatus(payload);
      feedback('优先 Key 已切换，图片生成和 GPT-5.5 客服助手将使用它。', 'success');
    } catch (error) {
      state.primaryId = previousPrimaryId;
      state.selectedId = previousPrimaryId;
      feedback(error instanceof Error ? error.message : '优先 Key 切换失败。', 'error');
    } finally {
      state.busy = false;
      syncModeControls();
    }
  }

  async function toggleRevealKey(keyId) {
    if (state.revealedKeys.has(keyId)) {
      state.revealedKeys.delete(keyId);
      renderKeys();
      return;
    }
    state.busy = true;
    renderKeys();
    feedback('正在读取所选 Key…', 'info');
    try {
      const payload = await adminJson(`/api/fbox-admin/config/secret?id=${encodeURIComponent(keyId)}`);
      const apiKey = String(payload.api_key || '');
      if (!apiKey) throw new Error('服务器没有返回所选 Key。');
      state.revealedKeys.set(keyId, apiKey);
      feedback('完整 Key 仅在当前管理员页面临时显示；离开页面后会清除。', 'success');
    } catch (error) {
      feedback(error instanceof Error ? error.message : '读取所选 Key 失败。', 'error');
    } finally {
      state.busy = false;
      renderKeys();
    }
  }

  async function copyKey(keyId) {
    const apiKey = state.revealedKeys.get(keyId);
    if (!apiKey) return;
    try {
      await navigator.clipboard.writeText(apiKey);
      feedback('所选 Key 已复制到剪贴板。', 'success');
    } catch {
      feedback('浏览器不允许自动复制，请手动选择完整 Key。', 'error');
    }
  }

  function managerTemplate() {
    return `
      <section class="fbox-provider-key-manager" aria-label="API Key 池">
        <div class="fbox-provider-key-title">
          <strong>已保存 Key 池</strong>
          <span data-key-count>读取中…</span>
        </div>
        <div class="fbox-provider-key-list" data-key-list></div>
        <label class="fbox-provider-key-add">
          <input type="radio" name="fbox-provider-key-preference" value="new" data-add-key-choice>
          <span><b>添加新 Key</b><small>验证成功后加入 Key 池，不覆盖原有 Key</small></span>
        </label>
        <label class="fbox-provider-key-label" data-new-key-options hidden>
          <span>Key 名称（可选）</span>
          <input type="text" maxlength="80" placeholder="例如：主账号、备用账号 1" data-new-key-label>
        </label>
        <p class="fbox-provider-key-feedback" data-key-feedback role="status"></p>
      </section>`;
  }

  function findKeyFormItem() {
    return [...document.querySelectorAll('.config-form .el-form-item')].find(item => {
      const label = item.querySelector('.el-form-item__label');
      return label && /接口密钥|API Key/i.test(label.textContent || '');
    });
  }

  function reconcile() {
    if (!window.location.hash.startsWith('#/fbox/visualizer')) {
      state.revealedKeys.clear();
      state.modeTouched = false;
      state.manager = null;
      state.keyInput = null;
      return;
    }
    const item = findKeyFormItem();
    if (!item) return;
    const input = item.querySelector('.el-input__inner[type="password"], input[type="password"]');
    if (!input) return;
    const existingManager = item.querySelector('.fbox-provider-key-manager');
    if (existingManager) {
      state.manager = existingManager;
      state.keyInput = input;
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.innerHTML = managerTemplate().trim();
    const manager = wrapper.firstElementChild;
    const content = item.querySelector('.el-form-item__content') || item;
    let inputShell = input;
    while (inputShell.parentElement && inputShell.parentElement !== content) inputShell = inputShell.parentElement;
    if (inputShell.parentElement === content) content.insertBefore(manager, inputShell);
    else content.prepend(manager);
    state.manager = manager;
    state.keyInput = input;

    const oldHint = item.querySelector('.field-hint');
    if (oldHint) oldHint.textContent = '每个已保存 Key 都会保留在服务器 Key 池中。完整值仅在登录管理员主动查看时临时取回，不会进入公开前台构建文件。';
    manager.querySelector('[data-add-key-choice]')?.addEventListener('change', event => {
      if (event.target.checked) chooseNewKey();
    });
    applyStatus({ configured: state.configured, api_keys: state.keys, primary_api_key_id: state.primaryId });

    const authorization = storedAuthorization();
    if (authorization) {
      nativeFetch('/api/fbox-admin/status', { headers: { Accept: 'application/json', Authorization: authorization }, cache: 'no-store' })
        .then(response => response.ok ? response.json() : null)
        .then(payload => payload && applyStatus(payload))
        .catch(() => {});
    }
  }

  function blockInvalidSave(event) {
    if (!state.manager?.isConnected) return;
    const isSubmit = event.type === 'submit';
    const button = event.target instanceof Element ? event.target.closest('button') : null;
    if (!isSubmit && (!button || !/保存并验证实时路由/.test(button.textContent || ''))) return;
    const missingSaved = state.mode === 'saved' && !(state.selectedId || state.primaryId);
    const missingNew = state.mode === 'new' && !String(state.keyInput?.value || '').trim();
    if (!missingSaved && !missingNew) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    feedback(missingSaved ? 'Key 池为空，请先添加新 Key。' : '请输入新的 LingkeAI API Key 后再保存。', 'error');
    if (missingNew) state.keyInput?.focus();
  }

  document.addEventListener('click', blockInvalidSave, true);
  document.addEventListener('submit', blockInvalidSave, true);
  window.addEventListener('hashchange', () => {
    if (!window.location.hash.startsWith('#/fbox/visualizer')) state.revealedKeys.clear();
    window.setTimeout(reconcile, 0);
  });
  const observer = new MutationObserver(() => window.requestAnimationFrame(reconcile));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', reconcile, { once: true });
  else reconcile();
})();
