# F-Box independent API contract: wheel visualizer

This contract keeps the public storefront thin. The browser never calls LingkeAI directly, never receives a provider key and never sends billing or model-selection fields. The filename is retained for compatibility with earlier handoff links; this flow does not use or modify BoxClaw.

## Create a job

`POST /api/wheel-visualizer/jobs`

The public endpoint is a same-origin 4174 API owned by F-Box. The independent backend creates three LingkeAI media tasks through `POST https://api.lk888.ai/v1/media/generate`, then polls `GET https://api.lk888.ai/v1/media/status?task_id=...`. The operator configures the provider connection in `http://localhost:4174/admin`; the UI itself is not a public API.

Request: `application/json`

| Field | Type | Required | Rule |
| --- | --- | --- | --- |
| `vehicle_image` | string data URL | yes | `data:image/...;base64,...`; the adapter converts the selected file in memory and the server re-validates type, dimensions and size |
| `product_id` | string | yes | Must resolve to a wheel in the F-Box catalog |
| `product_name` | string | yes | Display/reference hint; server resolves authoritative catalog data |
| `product_finish` | string | yes | Display/reference hint; server resolves authoritative finish |
| `product_fitment` | string | yes | Display/reference hint; server resolves authoritative fitment |
| `product_image` | string data URL | yes | Selected gallery reference; server uses it as the authoritative wheel image |
| `crop` | object | no | `{ "zoom": number, "x": number, "y": number }`; server clamps values |
| `angles` | number | yes | Must be `3`; server may reject other values |

The browser deliberately does not send `model`, `api_key`, `provider`, `credits`, `price`, `plan`, `prompt` or `quality` fields.

Response `202 Accepted`:

```json
{
  "data": {
    "job_id": "wv_01J...",
    "status": "queued"
  }
}
```

The server may return `200` with `status: "succeeded"` for a synchronous test adapter. The browser accepts either shape.

## Read a job

`GET /api/wheel-visualizer/jobs/:job_id`

```json
{
  "data": {
    "job_id": "wv_01J...",
    "status": "succeeded",
    "mode": "fbox-lingkeai",
    "results": [
      { "id": "front-left", "angle": "front_left", "image_url": "https://cdn.example/fbox/wv_01/front-left.webp", "width": 1536, "height": 1024 },
      { "id": "front-right", "angle": "front_right", "image_url": "https://cdn.example/fbox/wv_01/front-right.webp", "width": 1536, "height": 1024 },
      { "id": "side-profile", "angle": "side_profile", "image_url": "https://cdn.example/fbox/wv_01/side-profile.webp", "width": 1536, "height": 1024 }
    ]
  }
}
```

Valid statuses: `queued`, `running`, `succeeded`, `failed`, `canceled`.

Failure response:

```json
{
  "error": { "code": "IMAGE_JOB_FAILED", "message": "We could not finish this preview. Please try again." }
}
```

Do not return provider error bodies, prompts, internal model names, API keys, margin, token usage or customer billing data.

## Server invariants

1. Keep the LingkeAI API key only in the server-side F-Box runtime; do not send it from browser JavaScript.
2. Resolve/validate the product by `product_id`; ignore client price and untrusted catalog metadata for commerce.
3. Apply the fixed prompt in `boxclaw-fixed-prompt.md`; do not accept a browser prompt override.
4. Use the official F-Box sponsored policy. This job must not decrement customer credits or create a customer charge.
5. Queue three provider tasks through LingkeAI and retain job status, timestamps and three output references in the F-Box job store. The current local implementation uses an in-memory store for development only.
6. Do not mark success until three distinct image outputs are available.
7. Apply image retention and deletion policy server-side; the storefront does not persist the uploaded photo.

## Local route and failure behavior

The local F-Box route is `/api/wheel-visualizer/jobs`. It accepts only the fixed three-angle payload, calls LingkeAI with `gpt-image-2`, and returns safe job status/results without provider details. When the API key is not configured or LingkeAI fails, it returns a safe error; the storefront never renders a fake layout as an AI result.
