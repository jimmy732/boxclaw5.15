# Verification Matrix: F-Box wheel visualizer

This matrix records the local wiring for the five-step sponsored visualizer. It does not claim that a real provider image was generated until a valid LingkeAI API key is saved in the F-Box admin page.

| Check | Expected | Local evidence | Result |
| --- | --- | --- | --- |
| Product entry | Wheel product detail keeps the existing product, price, gallery, reviews, cart and checkout behavior | `#product/fbox-axis-19` entry card is rendered beside the existing detail form | Pass |
| Five-step rail | Upload, Frame, Reference, Generate, Results | `app.js` step rail has `01`–`05`; `results` activates step 05 | Pass |
| Vehicle upload | User photo is held transiently in memory | FileReader/object URL path; no new visualizer localStorage key | Pass |
| Framing | Zoom/x/y update the image above immediately | `data-wheel-crop` input and drag handlers update the crop image | Pass |
| Wheel reference | Selecting another gallery thumbnail changes the selected reference before generation | `wheel-reference` updates `state.wheelVisualizer.referenceImage`; reference step displays the selected image | Pass |
| Public request boundary | Browser sends JSON only to same-origin `/api/wheel-visualizer/jobs` | No provider key, prompt, model, credits or price fields in `wheelVisualizerRemoteJob` | Pass |
| Independent backend | 4174 handles the job and admin routes without BoxClaw | `local-fbox-server.mjs` imports `fbox-visualizer-backend.mjs` | Pass |
| Admin configuration | Operator saves the provider connection through `http://localhost:4174/admin` | `/api/fbox-admin/config` verifies `/v1/models` and stores the key outside the repository | Pass |
| Unconfigured runtime | No false AI success when the provider is not configured | 4174 returns 503 with a safe setup message; frontend renders an actionable error | Pass |
| Live runtime contract | Three parallel `gpt-image-2` calls use fixed server prompt and selected wheel reference | `fbox-visualizer-backend.mjs` calls LingkeAI `media/generate` and polls `media/status` | Ready; provider key not entered locally |
| Commerce isolation | Visualizer does not change fitment, product price, reviews, cart or checkout | Separate `state.wheelVisualizer`; existing handlers unchanged | Pass |
| Recovery | Retry and choose another photo keep the flow recoverable | `wheel-reset`, `wheel-retry`, reference back/next handlers | Pass |

## To enable real output locally

1. Open `http://localhost:4174/admin` and paste the LingkeAI API key.
2. Save and wait for `/v1/models` verification to succeed; this does not create an image task.
3. Return to a wheel product, upload the car photo, choose the exact wheel reference and click Generate.
4. Re-run the visualizer. The UI should move from `queued/running` to three result URLs; otherwise it will show a safe error rather than provider internals.
