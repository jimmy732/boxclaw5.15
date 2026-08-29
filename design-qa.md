# 策锐中国官网 · Wheelforce 公共页面验收

## 结论

- 最终结果：PASSED
- 当前没有可执行的 P0、P1 或 P2 问题。
- 用户锁定的首页顶部与首屏结构保持不变；仅按最新参考图，在主文案上方增加第二处真实“策锐锻造”Logo。
- 管理后台不在本次改造范围，公共功能页面使用独立的 `wf-public-page` 样式作用域，不会污染后台或首页首屏。

## 授权来源与设计基准

- 授权官网首页：`https://wheelforce.de/`
- 授权产品页：`https://wheelforce.de/wf-cf3-ff-rhodium_26`
- 授权品牌历程页：`https://wheelforce.de/meilensteine`
- 页面、CSS 与字体来源快照：`C:\Users\ADMINHT\Documents\ChatGPT\forcar\artifacts\reference\wheelforce-authorized-source`
- 桌面和移动端截图：`C:\Users\ADMINHT\Documents\ChatGPT\forcar\artifacts\reference\wheelforce-authorized-pages`

实际提取并本地化使用：

- `Lato` 300 / 400 / 700 正文字体
- `suissnordregular` 展示字体
- 黑、白、`#f6f6f6`、`#e9e9e9`、`#9d9d9d`、`#4f4f4f`、`#282828` 色板
- 1300 px 内容宽度、2 px 控件圆角、69 px 桌面头部、黑底页脚、细线分隔与方形产品卡片

## 完成范围

- 公共页统一头部：搜索、居中品牌、收藏、效果预览、购物车、菜单和移动导航。
- 产品目录：筛选、搜索、排序、车型入口、产品收藏与效果预览入口。
- 产品详情：授权风格黑色标题带、画廊缩略图、车型适配、表面选择、价格、购物车、评论与关联产品。
- 购物车：商品加入、数量调整、结算信息和空状态。
- 适配实验室：从款式开始、从车辆参数开始、结果页和可操作空状态。
- 效果生成：产品页入口和预览弹层可正常打开。
- 账户、收藏、博客、品牌故事、全国网络、视频与制造内容的视觉和交互统一。
- 桌面 1440 × 1000 与移动 390 × 844 响应式适配、键盘焦点、降低动态效果和无横向溢出。

## 对照图与可视验收

已将同一视口和同一页面状态的授权源截图与本地实现合并后逐张检查：

- 产品页桌面：`C:\Users\ADMINHT\Documents\ChatGPT\forcar\cerui-cn-site\qa\public-wheelforce\comparisons\product-desktop-source-vs-cirui.png`
- 产品页移动端：`C:\Users\ADMINHT\Documents\ChatGPT\forcar\cerui-cn-site\qa\public-wheelforce\comparisons\product-mobile-source-vs-cirui.png`
- 品牌故事桌面：`C:\Users\ADMINHT\Documents\ChatGPT\forcar\cerui-cn-site\qa\public-wheelforce\comparisons\story-desktop-source-vs-cirui.png`
- 品牌故事移动端：`C:\Users\ADMINHT\Documents\ChatGPT\forcar\cerui-cn-site\qa\public-wheelforce\comparisons\story-mobile-source-vs-cirui.png`
- 产品完整页面：`C:\Users\ADMINHT\Documents\ChatGPT\forcar\cerui-cn-site\qa\public-wheelforce\comparisons\product-full-source-vs-cirui.png`

检查结果：字体、黑白灰层级、标题比例、标题带、头部搜索和图标、产品图片尺度、卡片边界、桌面/移动断点均一致且无明显破版。中文内容长度导致的自然换行已在独立版式中消化，没有裁切或重叠。

## 自动化功能验收

- 公共功能页：76 passed，0 failed。
  - 证据：`C:\Users\ADMINHT\Documents\ChatGPT\forcar\cerui-cn-site\qa\public-wheelforce\functional-qa.json`
- 锁定首页与 BBS 首屏资源：26 passed，0 failed。
  - 证据：`C:\Users\ADMINHT\Documents\ChatGPT\forcar\cerui-cn-site\qa\functional-qa.json`
- 浏览器控制台可执行错误：0
- 同源资源与路由 HTTP 失败：0
- 1440 px / 390 px 横向溢出：0
- 浏览器：Microsoft Edge

## 后续资料项

- 企业资料只确认一座自有轮毂工厂，未提供完整仓库数量和地址；页面没有虚构仓库节点。获得正式仓库资料后可继续扩充全国网络模块。

final result: passed
