import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createBrotliCompress, createGzip, constants as zlibConstants } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { getPublicWorkshopProjectForSeo, handleFBoxAdminApi, handleFBoxAssetApi, handleFBoxAuthApi, handleFBoxOperationsApi, handleFBoxStoreApi, handleWheelDesignApi, handleWheelVisualizerApi } from './fbox-visualizer-backend.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.FBOX_PORT || process.env.PORT || 4174);
const assetCdnBaseUrl = String(process.env.FBOX_ASSET_CDN_BASE_URL || '').trim().replace(/\/+$/, '');
const assetCdnPathPrefix = String(process.env.FBOX_ASSET_CDN_PATH_PREFIX || 'fbox/static/assets').trim().replace(/^\/+|\/+$/g, '');
const assetCdnMediaPathPrefix = String(process.env.FBOX_ASSET_CDN_MEDIA_PATH_PREFIX || process.env.FBOX_QINIU_MEDIA_PREFIX || 'fbox/media').trim().replace(/^\/+|\/+$/g, '');
const assetCdnEnabled = String(process.env.FBOX_ASSET_CDN_ENABLED || '').toLowerCase() === 'true' && /^https:\/\/[^/]+/i.test(assetCdnBaseUrl);
const adminDist = path.join(root, 'admin-dist');
const developmentAdminDist = path.resolve(root, '..', '_mall-admin-web', 'dist');
function resolveAdminDist() {
  if (fs.existsSync(adminDist)) return adminDist;
  if (fs.existsSync(developmentAdminDist)) return developmentAdminDist;
  return null;
}

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon'
};

function json(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(payload));
}

function staticCacheControl(filePath, useAdmin) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === '.html') return 'no-cache';
  if (/cerui-global-hero-hd-montage-\d+p\d+-web\.mp4$/i.test(filePath)) return 'public, max-age=604800, stale-while-revalidate=2592000';
  if (filePath.includes(`${path.sep}assets${path.sep}cerui${path.sep}`)) return 'no-cache';
  if (filePath.includes(`${path.sep}assets${path.sep}domestic${path.sep}`)) return 'no-cache';
  if (useAdmin && /-[a-zA-Z0-9_-]{8,}\./.test(path.basename(filePath))) return 'public, max-age=31536000, immutable';
  if (['.js', '.css', '.json'].includes(extension)) return 'no-cache';
  if (['.png', '.jpg', '.jpeg', '.webp', '.mp4', '.svg', '.ico', '.woff', '.woff2'].includes(extension)) return 'public, max-age=86400, stale-while-revalidate=604800';
  return 'public, max-age=300, stale-while-revalidate=86400';
}

function serveRuntimeConfig(req, res) {
  const body = Buffer.from(`window.__FBOX_RUNTIME__ = Object.freeze(${JSON.stringify({
    assetCdnEnabled,
    assetCdnBaseUrl: assetCdnEnabled ? assetCdnBaseUrl : '',
    assetCdnPathPrefix: assetCdnEnabled ? assetCdnPathPrefix : '',
    assetCdnMediaPathPrefix: assetCdnEnabled ? assetCdnMediaPathPrefix : ''
  }).replace(/</g, '\\u003c')});\n`);
  res.writeHead(200, {
    'Content-Type': 'text/javascript; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Length': body.length
  });
  if (req.method === 'HEAD') return res.end();
  res.end(body);
}

function serveStatic(req, res, pathname) {
  const standaloneAdminPage = ['/admin/fitment-lab', '/admin/fitment-lab/', '/admin/site-assets', '/admin/site-assets/'].includes(pathname);
  const useAdmin = !standaloneAdminPage && (pathname === '/admin' || pathname === '/admin/' || pathname.startsWith('/admin/'));
  const resolvedAdminDist = useAdmin ? resolveAdminDist() : null;
  const staticRoot = resolvedAdminDist || root;
  const relative = standaloneAdminPage
    ? 'admin.html'
    : resolvedAdminDist
    ? (pathname === '/admin' || pathname === '/admin/' ? 'index.html' : pathname.slice('/admin/'.length))
    : (pathname === '/' ? 'index.html' : pathname === '/admin' || pathname === '/admin/' ? 'admin.html' : pathname.replace(/^\/+/, ''));
  let filePath = path.resolve(staticRoot, relative);
  if (resolvedAdminDist && (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory())) filePath = path.join(resolvedAdminDist, 'index.html');
  if (!filePath.startsWith(`${staticRoot}${path.sep}`) && filePath !== path.join(staticRoot, 'index.html')) return json(res, 403, { message: 'Forbidden' });
  fs.stat(filePath, (error, stat) => {
    if (error || !stat.isFile()) return json(res, 404, { message: 'Not found' });
    const extension = path.extname(filePath).toLowerCase();
    const etag = `W/\"${stat.size.toString(16)}-${Math.trunc(stat.mtimeMs).toString(16)}\"`;
    const headers = {
      'Content-Type': contentTypes[extension] || 'application/octet-stream',
      'Cache-Control': staticCacheControl(filePath, Boolean(resolvedAdminDist)),
      'Last-Modified': stat.mtime.toUTCString(),
      ETag: etag
    };
    if (extension === '.mp4') headers['Accept-Ranges'] = 'bytes';
    if (!req.headers.range && req.headers['if-none-match'] === etag) {
      res.writeHead(304, headers);
      return res.end();
    }
    if (extension === '.mp4' && req.headers.range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(String(req.headers.range));
      if (!match) {
        res.writeHead(416, { ...headers, 'Content-Range': `bytes */${stat.size}` });
        return res.end();
      }
      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Math.min(Number(match[2]), stat.size - 1) : stat.size - 1;
      if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || start > end || start >= stat.size) {
        res.writeHead(416, { ...headers, 'Content-Range': `bytes */${stat.size}` });
        return res.end();
      }
      res.writeHead(206, {
        ...headers,
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Content-Length': end - start + 1
      });
      if (req.method === 'HEAD') return res.end();
      fs.createReadStream(filePath, { start, end }).pipe(res);
      return;
    }
    if (req.method === 'HEAD') {
      res.writeHead(200, { ...headers, 'Content-Length': stat.size });
      return res.end();
    }
    const compressible = ['.html', '.js', '.css', '.txt', '.xml', '.json', '.svg'].includes(extension);
    const acceptedEncoding = String(req.headers['accept-encoding'] || '');
    let compressor = null;
    if (compressible && /\bbr\b/.test(acceptedEncoding)) {
      headers['Content-Encoding'] = 'br';
      compressor = createBrotliCompress({ params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 5 } });
    } else if (compressible && /\bgzip\b/.test(acceptedEncoding)) {
      headers['Content-Encoding'] = 'gzip';
      compressor = createGzip({ level: 6 });
    } else {
      headers['Content-Length'] = stat.size;
    }
    if (compressible) headers.Vary = 'Accept-Encoding';
    res.writeHead(200, headers);
    const stream = fs.createReadStream(filePath);
    if (compressor) stream.pipe(compressor).pipe(res);
    else stream.pipe(res);
  });
}

function serveIndependentConsole(req, res) {
  const filePath = path.join(root, 'admin.html');
  fs.stat(filePath, (error, stat) => {
    if (error || !stat.isFile()) return json(res, 404, { message: 'Console not found' });
    const headers = { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache', 'Content-Length': stat.size };
    res.writeHead(200, headers);
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(filePath).pipe(res);
  });
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function workshopVehicleName(project = {}) {
  const vehicle = project.vehicle || {};
  return [vehicle.year, vehicle.make, vehicle.model, vehicle.trim, vehicle.drive].filter(Boolean).join(' ') || '定制车型';
}

const socialShareImage = 'https://crforged.cn/assets/social/cerui-brand-share-card-zh-v1.jpg?v=20260907';
const socialShareImageAlt = '策锐锻造定制锻造轮毂品牌官网';

function injectDocumentMeta(template, { title, description, canonical, robots = 'index,follow', structuredData = null, initialMarkup = '' }) {
  let document = template
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/\s*<meta property="og:[^"]+"[^>]*>/gi, '')
    .replace(/\s*<meta name="twitter:[^"]+"[^>]*>/gi, '')
    .replace(/\s*<meta name="(?:robots|thumbnail)"[^>]*>/gi, '')
    .replace(/\s*<meta itemprop="(?:name|description|image)"[^>]*>/gi, '')
    .replace(/\s*<link rel="(?:canonical|image_src)"[^>]*>/gi, '')
    .replace('</head>', `    <meta name="robots" content="${escapeHtml(robots)}${robots.startsWith('index') ? ',max-image-preview:large' : ''}" />\n    <link rel="canonical" href="${escapeHtml(canonical)}" />\n    <link rel="image_src" href="${socialShareImage}" />\n    <meta property="og:type" content="website" />\n    <meta property="og:site_name" content="策锐锻造" />\n    <meta property="og:title" content="${escapeHtml(title)}" />\n    <meta property="og:description" content="${escapeHtml(description)}" />\n    <meta property="og:url" content="${escapeHtml(canonical)}" />\n    <meta property="og:locale" content="zh_CN" />\n    <meta property="og:image" content="${socialShareImage}" />\n    <meta property="og:image:secure_url" content="${socialShareImage}" />\n    <meta property="og:image:type" content="image/jpeg" />\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />\n    <meta property="og:image:alt" content="${socialShareImageAlt}" />\n    <meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:title" content="${escapeHtml(title)}" />\n    <meta name="twitter:description" content="${escapeHtml(description)}" />\n    <meta name="twitter:image" content="${socialShareImage}" />\n    <meta name="twitter:image:alt" content="${socialShareImageAlt}" />\n    <meta name="thumbnail" content="${socialShareImage}" />\n    <meta itemprop="name" content="${escapeHtml(title)}" />\n    <meta itemprop="description" content="${escapeHtml(description)}" />\n    <meta itemprop="image" content="${socialShareImage}" />${structuredData ? `\n    <script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>` : ''}\n  </head>`);
  if (initialMarkup) document = document.replace('<div id="app"></div>', `<div id="app">${initialMarkup}</div>`);
  return document;
}

async function serveAppDocument(req, res, pathname, project = null) {
  const template = await fs.promises.readFile(path.join(root, 'index.html'), 'utf8');
  const forwardedProto = String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim();
  const protocol = forwardedProto || (req.socket.encrypted ? 'https' : 'http');
  const origin = `${protocol}://${req.headers.host || 'crforged.cn'}`;
  const canonical = `${origin}${pathname}`;
  let status = 200;
  let title = '轮毂适配实验室｜策锐锻造';
  let description = '输入车型、刹车、避震与实测间隙，完成锻造轮毂参数适配、制动空间校验与定制方案整理。';
  let robots = 'index,follow';
  let structuredData = null;
  let initialMarkup = '';
  if (pathname.startsWith('/build/') || pathname.startsWith('/fitment-cases/')) {
    const publicCase = pathname.startsWith('/fitment-cases/');
    if (!project || (publicCase && !project.seo_indexable)) {
      status = 404;
      title = '定制轮毂方案未找到｜策锐锻造';
      description = '该策锐锻造客户方案链接已失效或暂不可访问。';
      robots = 'noindex,follow';
    } else {
      const vehicle = workshopVehicleName(project);
      const shopName = project.shop?.shop_name || '策锐锻造合作门店';
      title = `${vehicle}定制轮毂方案｜策锐锻造`;
      description = `${shopName}为${vehicle}整理的轮毂适配与定制设计方向，最终生产参数以工程审核为准。`;
      robots = publicCase ? 'index,follow' : 'noindex,follow';
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description,
        url: canonical,
        inLanguage: 'zh-CN',
        image: socialShareImage,
        isPartOf: { '@type': 'WebSite', name: '策锐锻造中国官网', url: origin },
        provider: { '@type': 'Organization', name: '策锐锻造', alternateName: 'CIRUI Forged' },
        contributor: { '@type': 'Organization', name: shopName },
        about: { '@type': 'Vehicle', name: vehicle }
      };
      initialMarkup = `<main class="workshop-seo-summary"><p>策锐锻造客户方案</p><h1>${escapeHtml(vehicle)}定制轮毂适配</h1><p>${escapeHtml(description)}</p><span>方案门店：${escapeHtml(shopName)}</span></main>`;
    }
  } else if (pathname === '/fitment-lab/result') {
    title = '定制轮毂适配方案｜策锐锻造';
    description = '根据当前车型、改装部件与实测间隙生成的私有轮毂适配方案。';
    robots = 'noindex,nofollow';
  } else if (pathname === '/ai-wheel-studio') {
    title = 'AI 轮毂原创设计室｜策锐锻造';
    description = '输入文字或上传参考图，生成原创锻造轮毂概念方案，选定方向后生成九宫格多视图概念审核图。';
  } else if (pathname === '/account') {
    title = '我的账户｜策锐锻造';
    description = '管理私有客户方案、订单与账户资料。';
    robots = 'noindex,nofollow';
  }
  const document = injectDocumentMeta(template, { title, description, canonical, robots, structuredData, initialMarkup });
  const body = Buffer.from(document);
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache', 'Content-Length': body.length });
  if (req.method === 'HEAD') return res.end();
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  if ((req.method === 'GET' || req.method === 'HEAD') && url.pathname === '/fbox-runtime-config.js') return serveRuntimeConfig(req, res);
  if ((req.method === 'GET' || req.method === 'HEAD') && ['/fbox-console', '/fbox-console/', '/admin/fitment-lab', '/admin/fitment-lab/'].includes(url.pathname)) return serveIndependentConsole(req, res);
  if (req.method === 'GET' && url.pathname === '/admin') {
    res.writeHead(301, { Location: '/admin/' });
    res.end();
    return;
  }
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'access-control-allow-headers': 'Content-Type, Authorization, X-策锐官网-Visualizer-Token'
    });
    res.end();
    return;
  }
  if (url.pathname === '/api/admin' || url.pathname.startsWith('/api/admin/') || url.pathname === '/api/fbox-auth' || url.pathname.startsWith('/api/fbox-auth/')) return handleFBoxAuthApi(req, res, url);
  if (url.pathname === '/api/fbox-store' || url.pathname.startsWith('/api/fbox-store/')) return handleFBoxStoreApi(req, res, url);
  if (url.pathname === '/api/fbox-assets' || url.pathname.startsWith('/api/fbox-assets/')) return handleFBoxAssetApi(req, res, url);
  if (url.pathname === '/api/fbox-admin' || url.pathname.startsWith('/api/fbox-admin/')) return handleFBoxAdminApi(req, res, url);
  if (url.pathname === '/api/fbox-ops' || url.pathname.startsWith('/api/fbox-ops/') || url.pathname === '/api/fbox-content' || url.pathname.startsWith('/api/fbox-content/')) return handleFBoxOperationsApi(req, res, url);
  if (url.pathname === '/api/wheel-visualizer' || url.pathname.startsWith('/api/wheel-visualizer/')) return handleWheelVisualizerApi(req, res, url);
  if (url.pathname === '/api/wheel-design' || url.pathname.startsWith('/api/wheel-design/')) return handleWheelDesignApi(req, res, url);
  const workshopBuildMatch = url.pathname.match(/^\/(?:build|fitment-cases)\/([^/]+)\/?$/);
  if ((req.method === 'GET' || req.method === 'HEAD') && workshopBuildMatch) {
    const project = await getPublicWorkshopProjectForSeo(decodeURIComponent(workshopBuildMatch[1]));
    return serveAppDocument(req, res, url.pathname.replace(/\/$/, ''), project);
  }
  if ((req.method === 'GET' || req.method === 'HEAD') && ['/fitment-lab', '/fitment-lab/result', '/ai-wheel-studio', '/account'].includes(url.pathname.replace(/\/$/, ''))) return serveAppDocument(req, res, url.pathname.replace(/\/$/, ''));
  return serveStatic(req, res, url.pathname);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`策锐官网 storefront listening on http://127.0.0.1:${port}`);
  console.log(`策锐官网 independent admin: http://127.0.0.1:${port}/admin`);
  console.log('策锐官网 visualizer backend: direct LingkeAI gpt-image-2 route');
});
