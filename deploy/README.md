# Production deployment

This repository is the independent CIRUI China storefront, fitment lab and
admin backend. It must be deployed separately from the existing overseas site.

## Fixed production layout

- Repository: `https://github.com/jimmy732/boxclaw5.15.git`
- Branch: `codex/cerui-cn-site-4188`
- Checkout: `/opt/fbox/cerui-cn-site`
- Listener: `127.0.0.1:4188`
- Runtime data: `/var/lib/cerui-cn-site/runtime`
- Environment file: `/etc/cerui-cn-site/cerui-cn-site.env`
- Systemd unit: `cerui-cn-site.service`

The application and admin API run in one Node service. Runtime files, admin
sessions, uploaded media and provider credentials are kept outside Git.

## First deployment

```bash
sudo install -d -o admin -g admin /opt/fbox/cerui-cn-site
sudo install -d -o admin -g admin /var/lib/cerui-cn-site/runtime
sudo install -d -m 0750 -o root -g admin /etc/cerui-cn-site
git clone --branch codex/cerui-cn-site-4188 --single-branch \
  https://github.com/jimmy732/boxclaw5.15.git /opt/fbox/cerui-cn-site
cd /opt/fbox/cerui-cn-site
npm ci --omit=dev
sudo cp deploy/fbox.service /etc/systemd/system/cerui-cn-site.service
sudo systemctl daemon-reload
sudo systemctl enable --now cerui-cn-site.service
```

## Updates

```bash
cd /opt/fbox/cerui-cn-site
git fetch origin codex/cerui-cn-site-4188
git switch codex/cerui-cn-site-4188
git pull --ff-only origin codex/cerui-cn-site-4188
npm ci --omit=dev
sudo systemctl restart cerui-cn-site.service
```

Verify locally on the server before changing any public reverse proxy:

```bash
curl -fsS http://127.0.0.1:4188/ >/dev/null
curl -fsS http://127.0.0.1:4188/api/fbox-store/products >/dev/null
curl -fsS http://127.0.0.1:4188/admin >/dev/null
sudo systemctl --no-pager --full status cerui-cn-site.service
```

The sample Nginx proxy uses port `4188`. Merge it only into the dedicated
Chinese-site hostname after that hostname and certificate are confirmed.

## Optional Qiniu asset mirror

Qiniu credentials are never committed. Configure them in
`/etc/cerui-cn-site/cerui-cn-site.env`, then run `npm run sync:qiniu`. Keep
`FBOX_ASSET_CDN_ENABLED=false` until the CDN domain, HTTPS certificate and all
uploaded paths have been verified.
