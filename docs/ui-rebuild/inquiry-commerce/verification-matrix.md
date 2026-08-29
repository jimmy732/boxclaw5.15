# 验证矩阵

| 场景 | 验证方式 | 结果 |
|---|---|---|
| 店铺首页 | `GET /` | 200 |
| 独立后台静态入口 | `GET /admin/` | 200 |
| 前台车型接口 | `GET /api/fbox-content/vehicles` | 200，返回 OEM wheel specs |
| 不存在的在线会话 | `GET /api/fbox-content/chat/not-found` | 404 |
| 无效报价支付 token | `POST /api/fbox-content/quotes/not-found/paypal` | 404，不创建 PayPal 订单 |
| 后端语法 | `node --check` backend/server/app | 通过 |
| 管理后台构建 | `npm run build` | type-check + Vite build 通过 |

正式支付测试需要在后台填写 PayPal Sandbox Client ID/Secret，并用 PayPal Sandbox 买家账号完成批准与返回 capture。
