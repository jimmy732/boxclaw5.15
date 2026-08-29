# Feature Map: wheel visualizer

## Scope

- Domains: product detail, wheel visualization, F-Box independent image-job backend.
- Included routes: `#product/:id`; no new browser route or query parameter.
- Actors: public storefront visitor; the F-Box backend owns provider credentials and sponsored usage.
- Backend mode: `local independent backend` — the storefront calls a same-origin API on 4174. The F-Box backend calls LingkeAI directly; `/admin` is the operator UI for saving the provider connection and is never called by the public browser.
- Out of scope: replacing the catalog, changing product prices or reviews, checkout/payment, user credits, account permissions, or vehicle fitment rules.
- Evidence date: 2026-08-17.

## Functional Contract

| ID | Business result | Route / domain | Trigger | Frontend owner | Backend contract | State transition | Side effect | Semantic contract | Proof |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| F-001 | Start a preview for the selected wheel | `#product/:id` | Click “Upload car photo” | `wheelVisualizerTrigger`, `wheelVisualizerModal` | `POST /api/wheel-visualizer/jobs` | `closed -> upload` | Opens isolated dialog | Button is keyboard reachable and names the selected wheel flow | Browser snapshot: product detail entry card |
| F-002 | Validate and stage a car image | dialog / upload | Select or drop an image | `wheelVisualizerHandleFile` | Browser-only staging; upload occurs only on generate | `upload -> crop` or `upload -> error` | Object URL held in memory only | Accepts image/*, 12 MB limit, error is announced | Browser file chooser test with local asset |
| F-003 | Adjust image framing | dialog / crop | Change zoom, horizontal or vertical sliders | `wheelVisualizer` state + `data-wheel-crop` | Crop metadata is submitted with the job | `crop -> crop` | Updates preview without leaving dialog | Range controls expose values and retain focus | Browser snapshot: three sliders and reset |
| F-004 | Lock the exact wheel reference | dialog / reference | Continue after framing or click a gallery thumbnail | `wheelVisualizerReferencePicker`, reference state | Selected gallery asset is converted to a temporary data URL | `crop -> reference` or `results/error -> reference` | Changes only the visualizer reference, not product state | Active thumbnail and selected reference are announced | Browser snapshot: reference step with selected wheel |
| F-005 | Create three visual angles | dialog / generate | Click “Generate 3 angles” from reference step | `wheelVisualizerStart` | JSON job goes to `/api/wheel-visualizer/jobs`; F-Box backend calls LingkeAI `media/generate` three times and polls `media/status` | `reference -> generating -> results/error` | Async job creation and polling | No provider key/model/charge fields in browser | Network test: unconfigured route returns safe error |
| F-006 | Review exactly three results | dialog / results | Job succeeds with three provider URLs | `wheelVisualizerResultCard` | Response has three image results with angle labels | `results -> closed` or `results -> upload` | User can retry with another photo or close | Results identify angle and selected wheel reference | Browser snapshot: 3 result cards, step 05 active |
| F-007 | Recover from service failure | dialog / error | Validation, timeout or server failure | `wheelVisualizer` error state | `failed` response includes safe message | `generating -> error -> crop/reference/upload/generating` | Retry keeps the staged file when possible | Error is visible, actionable and never exposes provider details | Contract test covers authorized route and mock-mode 503 |

## State Catalog

| Component | Default | Loading | Empty | Error | Disabled | Permission / plan denied | Dirty / pending | Success / retry / cancel | Narrow viewport |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Upload zone | Empty upload prompt | N/A | Prompt explains accepted image | Invalid type or >12 MB | N/A | Never shown to public user; server owns policy | Selected file held in memory | Choose another photo resets | Full-width drop zone |
| Crop stage | N/A | N/A | N/A | Missing image returns to upload | Generate disabled by absence of file in browser behavior | N/A | Slider values are dirty until submit | Reset frame or generate | Controls stack vertically |
| Generation | N/A | Animated wheel orbit and progress rail | N/A | Server error or timeout | Dialog remains closable | Server may reject safely without exposing billing | Job is pending; browser does not charge | Poll to results or retry | Full-height scrollable sheet |
| Results | N/A | N/A | Server response with fewer than 3 is treated as error | Retry or choose another photo | N/A | N/A | N/A | Exactly three cards, close or retry | Cards stack one per row |

## Authority Map

| Concern | Display owner | Authoritative owner | Must not move into the UI |
| --- | --- | --- | --- |
| Selected product reference | F-Box product data | F-Box backend validator | Trusting arbitrary client price or product image for commerce |
| Image-job routing | Status text only | F-Box backend and LingkeAI worker | Provider key, model name, provider URL, fallback routing |
| Sponsored usage | “Included with your build” copy | F-Box backend policy | Credits, charges, plan gates or cost calculation |
| Prompt and quality rules | No editable prompt field | F-Box backend constant | User-editable prompt that can weaken wheel/vehicle constraints |
| Async lifecycle | Progress and retry UI | F-Box job store / provider polling | Claiming success before three output assets exist |
| Admin configuration | “Included with your build” and safe error text | `http://localhost:4174/admin` plus local F-Box runtime | Calling Admin UI from the storefront or exposing route credentials |

## Open Questions And Explicit Deltas

| ID | Question or desired behavior change | Current decision | Status |
| --- | --- | --- | --- |
| D-001 | Should users see the raw generation prompt? | No. Prompt is fixed server-side to protect fitment and quality. | decided |
| D-002 | Should localhost show real provider output? | The independent F-Box backend calls LingkeAI after a key is configured. If configuration or provider calls fail, the UI shows a safe error and never fabricates a local layout preview. | decided |
| D-003 | Should a preview be chargeable? | No. F-Box officially sponsors this flow; no billing fields are accepted from frontend. | decided |
