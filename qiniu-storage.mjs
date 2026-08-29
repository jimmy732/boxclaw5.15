import { createHmac } from 'node:crypto';

function envValue(...names) {
  for (const name of names) {
    const value = String(process.env[name] || '').trim();
    if (value) return value;
  }
  return '';
}

function urlSafeBase64(value) {
  const bytes = Buffer.isBuffer(value) ? value : Buffer.from(value);
  return bytes.toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
}

function storageConfig() {
  const enabled = envValue('FBOX_QINIU_ENABLED').toLowerCase() === 'true';
  const accessKey = envValue('FBOX_QINIU_ACCESS_KEY', 'QINIU_ACCESS_KEY');
  const secretKey = envValue('FBOX_QINIU_SECRET_KEY', 'QINIU_SECRET_KEY');
  const bucket = envValue('FBOX_QINIU_BUCKET', 'QINIU_BUCKET_STATIC');
  const uploadUrl = envValue('FBOX_QINIU_UPLOAD_URL') || 'https://up-na0.qiniup.com';
  const publicBaseUrl = envValue('FBOX_QINIU_PUBLIC_BASE_URL', 'QINIU_PUBLIC_BASE_URL').replace(/\/+$/, '');
  const configured = enabled
    && Boolean(accessKey && secretKey && bucket)
    && /^https:\/\//i.test(uploadUrl)
    && (!publicBaseUrl || /^https:\/\//i.test(publicBaseUrl));
  return { enabled, configured, accessKey, secretKey, bucket, uploadUrl, publicBaseUrl };
}

function normalizeObjectKey(value) {
  const key = String(value || '').replace(/\\/g, '/').replace(/^\/+/, '');
  if (!key || key.includes('..') || /[\u0000-\u001f]/.test(key)) throw new Error('Invalid Qiniu object key.');
  return key;
}

function uploadToken(config, key, expiresInSeconds = 3600) {
  const policy = urlSafeBase64(JSON.stringify({
    scope: `${config.bucket}:${key}`,
    deadline: Math.floor(Date.now() / 1000) + expiresInSeconds,
    insertOnly: 0
  }));
  const signature = urlSafeBase64(createHmac('sha1', config.secretKey).update(policy).digest());
  return `${config.accessKey}:${signature}:${policy}`;
}

export function qiniuStorageStatus() {
  const config = storageConfig();
  return {
    enabled: config.enabled,
    configured: config.configured,
    uploadUrl: config.configured ? config.uploadUrl : '',
    publicBaseUrl: config.configured ? config.publicBaseUrl : ''
  };
}

export async function uploadQiniuObject({ key: inputKey, bytes, mime = 'application/octet-stream', timeoutMs = 30000 }) {
  const config = storageConfig();
  if (!config.configured) return { uploaded: false, reason: config.enabled ? 'incomplete-config' : 'disabled' };
  const key = normalizeObjectKey(inputKey);
  const form = new FormData();
  form.set('token', uploadToken(config, key));
  form.set('key', key);
  form.set('file', new Blob([bytes], { type: mime }), key.split('/').pop());
  const response = await fetch(config.uploadUrl, {
    method: 'POST',
    body: form,
    signal: AbortSignal.timeout(timeoutMs)
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Qiniu upload failed (${response.status}).`);
  return {
    uploaded: true,
    key: payload.key || key,
    hash: payload.hash || '',
    url: config.publicBaseUrl ? `${config.publicBaseUrl}/${encodeURI(payload.key || key)}` : ''
  };
}
