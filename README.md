# F-Box Fitment Store

一个与 BoxClaw 完全独立的前端演示项目：F-Box 汽车配件外贸独立站，覆盖轮毂、卡钳、刹车盘、刹车片和基于车型的适配筛选。

## 运行

这是一个无构建依赖的静态 SPA。若只查看页面，可以启动静态服务器；若要测试轮毂效果图与 F-Box 独立后端的完整链路，请使用本地服务器：

```powershell
cd "D:\文档\ChatGPT\开源系统\local-mall-dev"
node local-fbox-server.mjs
```

然后打开 <http://localhost:4174/>，管理页是 <http://localhost:4174/admin>。当前服务器会保留商城原有 `/api`、`/admin-api` 代理，并由 F-Box 自己处理 `/api/fbox-admin/*` 与 `/api/wheel-visualizer/*`；不会调用或修改 BoxClaw 后端。

若只需要静态页面，也可以运行：

```powershell
cd "D:\文档\ChatGPT\开源系统\f-box-fitment-store"
python -m http.server 4174
```

但静态服务器没有 F-Box API，效果图流程无法调用模型；请使用上面的 `local-fbox-server.mjs`。

## 已实现交互

- F-Box 独立品牌头部、搜索框、导航和 Shop mega menu
- 业务联系人：李炜 · +86 186 5819 1106
- 语言选择器：English、简体中文、繁體中文、日本語、한국어、Deutsch、Français、Español、Italiano、Português、Русский、العربية、Türkçe、Tiếng Việt 等
- IP 国家自动识别语言：优先读取 `https://ipapi.co/json/` 的 `country_code`；失败时回退到浏览器语言，再失败默认 English
- 可手动切换语言，手动选择会写入 `localStorage` 并优先于 IP 自动识别；选择 Auto detect 可恢复自动判断
- 年份 → 品牌 → 车型 → 配置 → 驱动方式的级联车型适配器
- 轮毂 / 卡钳 / 刹车盘 / 刹车片商品目录
- F-Box AI 风格的搜索、产品类型、折扣、表面处理、尺寸、价格、评分筛选和排序
- 商品卡片 hover spotlight、收藏、快速预览、详情页图片切换
- 商品详情：价格 / 四件套价格 / 分期提示 / 运费估算 / finish 选择 / specs / reviews
- 评价列表的 stagger reveal、Load more、Write a review modal
- localStorage 购物车、数量增减、移除、优惠码提示、checkout 三步演示弹窗
- Cookie banner、在线聊天浮窗、账户弹窗、响应式移动端布局
- Anime.js v4 CDN 动效；加载失败时使用 CSS reveal 作为降级

## 参考与素材说明

页面信息架构、商品目录筛选、车型选择器、产品卡片、评价、购物车和结算流程参考了 [Fitment Industries](https://www.fitmentindustries.com/) 的公开页面行为与布局。用户明确授权本次使用参考站的图片、价格和评价内容作为视觉重建素材；如果要用于正式商业站，请确认相关图片、品牌内容、评价文本与数据的商业使用授权，并替换为 F-Box 自有素材与真实商品数据。

图片已经下载到 `assets/`，成品不依赖参考站的图片 URL。产品价格和评价为可替换的演示数据，支付、账号、订单、库存、税费与物流仍需接入真实后端。

## React Bits / 动效来源

本项目没有引入完整 React 运行时，而是从本地 React Bits CSS 参考中提取并改写了两种技术：

- `SpotlightCard`：产品卡和 Fitment guide 卡通过 CSS 变量 `--mouse-x / --mouse-y` 跟随 pointer 移动光晕。
- `AnimatedList`：评价卡片按索引错峰进入，并保留 CSS-only fallback，避免动效库不可用时页面失效。

Anime.js 仅负责轻量 reveal；商品筛选、购物车与弹窗全部是本地原生 JS 状态，不依赖 BoxClaw。

## 多语言和 IP 定位说明

语言选择器支持 19 个常用市场语言。核心电商操作词和导航提供对应语言包；没有单独词条的商品名称、规格、品牌与营销文案保留英文，避免错误翻译汽车零部件术语。未识别的国家映射到 English。

IP 自动判断使用 ipapi.co 的公开 JSON 接口读取访客国家代码；正式上线前建议在自己的服务端或 CDN 边缘层完成地理识别，并根据隐私政策、Cookie 同意和当地法规处理 IP 地理信息。参考接口文档：[ipapi API Reference](https://ipapi.co/api/)。
## shadcnblocks UI patterns

本轮车型匹配 UI 参考了 [shadcnblocks](https://www.shadcnblocks.com/) 的 ecommerce hero、product list、popover、hover card、badge 和 announcement 组件分类，再用当前 F-Box 的原生 HTML/CSS/JS 结构改写，没有把 React/Tailwind 依赖强行引入这个静态项目。

## Full-page translation

语言切换现在会在每次渲染后扫描并翻译可见页面文案、按钮、链接、输入提示、无障碍标签、筛选项、评价、购物车、结算和动态弹窗。翻译请求按语言与短语缓存，并让同一句文案在页面中的所有重复节点同步更新。品牌名、车型、产品型号、规格、Part Number 和公司名等关键专有名词会保留原文；无法识别的国家默认 English，Arabic 自动使用 RTL 排版。

本地词典覆盖核心电商操作词，其他页面文案通过公开翻译接口补齐。正式上线时建议将翻译请求迁移到自己的服务端/API，并在隐私政策中说明 IP 定位与翻译服务的处理方式。

## Custom wheel homepage direction

## Wheel-on-vehicle visual preview

The wheel product detail page now includes an isolated F-Box Visual Studio flow:

- upload or drag in one vehicle photo;
- adjust zoom and framing without changing the existing fitment selector;
- select the exact gallery image to use as the wheel reference;
- request three angles through the F-Box independent async backend;
- review results in the fifth step, retry, or close without touching cart, checkout, prices, reviews, or product state.

On `localhost`, `app.js` calls `POST /api/wheel-visualizer/jobs`; the F-Box backend creates three asynchronous LingkeAI `gpt-image-2` media tasks and polls `/v1/media/status` until each result is final. Configure the provider connection from <http://localhost:4174/admin>. The route is intentionally real-only: before an API key is saved, the website returns a clear configuration error and never fabricates a pasted-wheel result. Provider keys, model routing, the fixed prompt and sponsored/no-charge policy belong to the F-Box backend. The complete request/response contract, verification matrix and hardcoded prompt are in `docs/ui-rebuild/wheel-visualizer/`.

## Local F-Box backend connection

- Public storefront: <http://localhost:4174/>
- F-Box independent admin: <http://localhost:4174/admin>
- LingkeAI base URL: `https://api.lk888.ai/v1`
- Storefront bridge: `POST /api/wheel-visualizer/jobs` and `GET /api/wheel-visualizer/jobs/:job_id`
- Admin status/config: `GET /api/fbox-admin/status` and `PUT /api/fbox-admin/config`
- Customer billing: none; this visualizer is sponsored by F-Box and sends no credits, price, plan or charge fields.

To enable real images locally, open `http://localhost:4174/admin`, paste the LingkeAI API key from your provider account and save. The admin page verifies `/v1/models` without creating a billable image task, then stores the key in the local runtime file outside the public repository. The fixed server prompt uses the selected product reference (wheel, caliper, rotor or brake pad), the vehicle photo and fitment constraints, and requests three parallel `gpt-image-2` outputs. The official F-Box backend sponsors the generation; the customer is never charged.

Home 首页现在以定制轮毂为第一叙事，强调 four buyer jobs：street builds、show cars、track setups、dealers / brands。文案围绕 custom size、width、PCD、ET、center bore、brake clearance、finish、center cap、logo 和 production approval 展开；这些卖点来自本轮对定制锻造轮毂品牌与 Alibaba 供应商公开页面的研究。

本轮只替换 Home 的内容层与布局层。现有成品商品、商品详情、车型选择器、匹配产品预览、Quick View、购物车、结算、刹车产品区和评价区均继续使用原有状态与路由。

你提供的 Alibaba 店铺短链会跳转到 `fsbk007.en.alibaba.com`，当前抓取结果被 Alibaba 的反爬验证页拦截，因此本轮没有绕过验证或把验证码素材当成工厂实拍。首页的工程/成品视觉使用项目里已有的本地轮毂素材；获得你授权的 CNC、喷涂、检测和包装照片后，可直接替换 `custom-workshop-media` 与 `custom-finish-collage` 的图片。
