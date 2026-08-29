# 前端交付说明

## 前台

- `app.js` 的客服会话加载 quote 消息并渲染报价卡。
- PayPal 按钮调用 `/api/fbox-content/quotes/:quoteId/paypal`，拿到 `approval_url` 后浏览器跳转。
- PayPal 返回站点后，前端将 `paypal_quote`、`paypal_token`、PayPal `token` 发送到 capture 接口，再刷新会话状态。

## 后台

- `/admin/` 运营中心的询盘抽屉展示完整上下文并创建报价卡。
- 图片生成配置页同时保存 PayPal sandbox/live、Client ID 和 Client Secret。
- 成本价只在后台报价表单和管理员 API 中出现；公共 `publicQuote()` 会剥离成本价和支付供应商订单字段。
