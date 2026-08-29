# 持久化与副作用

- 运行时数据：`local-mall-dev/.runtime/fbox-operations.json`。
- PayPal Client ID、Client Secret、sandbox/live 模式：`local-mall-dev/.runtime/fbox-visualizer-config.json`，只由 Node 后端读取。
- 前端只接收 PayPal approval URL 和一次报价 checkout token；不会打包 API Key、PayPal Client Secret 或成本价。
- 创建报价会追加报价记录和 admin quote 消息，并将询盘置为 `in_progress`。
- PayPal capture 返回 `COMPLETED` 后才将报价标记为 `paid` 并将询盘标记为 `resolved`。正式环境应继续接入 `PAYMENT.CAPTURE.COMPLETED` webhook 做幂等确认。
