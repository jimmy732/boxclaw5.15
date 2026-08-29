# UI Migration Contract: wheel visualizer

## Outcome

- Product outcome: let a visitor see a selected F-Box wheel against their own car before ordering, with three angle outputs and a clear fitment caveat.
- Audience: international public storefront visitors on desktop and mobile.
- Primary journey: product detail → upload → frame → select exact wheel reference → generate → review.
- Responsive targets: desktop detail page; mobile full-height sheet with stacked results.
- Approved direction: F-Box dark ink, lime action accent, lavender utility accent, editorial automotive typography and restrained anime.js/CSS motion.

## Scope

- Included route: existing `#product/:id` only.
- Included components: entry card, isolated dialog, file staging, crop controls, gallery reference picker, explicit reference confirmation step, generating state, three result cards and error recovery.
- Explicit exclusions: product catalog, year/make/model/trim/drive selector, price/review data, cart, checkout, account and mall integration.
- Current backend mode: local 4174 F-Box independent backend → LingkeAI GPT Image 2; when the key is absent or the provider fails, the UI shows a safe error and never falls back to a fake layout preview.

## Frozen Contracts

| Contract type | Frozen value / behavior | Evidence |
| --- | --- | --- |
| URLs and route | `#product/:id` remains the entry; no new route | `app.js:getRoute`, browser product snapshot |
| Existing product state | Product price, gallery, reviews, add-to-cart, buy-now and checkout remain unchanged | Product snapshot and unchanged existing handlers |
| API boundary | Browser may call only `/api/wheel-visualizer/jobs` and its status route; provider calls stay in the F-Box backend | `app.js:wheelVisualizerRemoteJob`, `feature-map.md` |
| Async states | upload, crop, reference, generating, results, error; exactly three results required | `app.js:wheelVisualizerModal`, `feature-map.md` |
| Billing | F-Box official sponsorship; frontend sends no cost, credit, plan or provider fields | `feature-map.md`, backend contract |
| Storage | Vehicle image is transient in-memory object URL; no new localStorage key | `persistence-and-side-effects.md` |
| Accessibility | Dialog role/label, keyboard-close Escape, labelled file input, range controls and visible errors | DOM snapshot + `app.js` event handlers |

## Repository Constraints

- Stack and router: no-build vanilla JS/CSS SPA; hash navigation.
- Existing primitives to retain: `btn`, `modal`, `overlay`, `icon-btn`, fitment selector, product detail card and translation pass.
- New data boundary: `window.FBOX_WHEEL_VISUALIZER_API.create(request)` may be injected by an integration host; otherwise production uses the documented relative API.
- Forbidden: direct provider SDK import, browser API key, user-editable prompt, billing calculation or persistent personal photo storage.

## State Catalog To Implement

| Flow | Required states | Recovery / a11y |
| --- | --- | --- |
| Upload | empty, invalid, too large, accepted | File chooser and drop zone; error role; no upload without user selection |
| Crop | preview, dirty slider state, reset | Slider outputs update in place; mobile controls stack |
| Generate | pending animation, no duplicate generation control | Dialog remains closable; server owns job state |
| Results | exactly three outputs, F-Box AI label | Angle names and wheel reference alt text; retry/close actions |
| Error | invalid input, API failure, too few results, timeout | Message is actionable and does not expose provider internals |

## Implementation Plan

1. `app.js`: add an isolated transient state machine and backend adapter; inject the entry card after the existing product detail form only for wheel products.
2. `styles.css`: add responsive sheet, crop stage, result cards and reduced-motion-compatible progress styling.
3. `docs/ui-rebuild/wheel-visualizer/`: freeze the API, prompt, persistence and verification contracts before provider wiring.
4. F-Box backend: accept the JSON data-URL payload, apply the fixed prompt, use the sponsored policy, queue three LingkeAI media jobs and return output URLs behind `/api/wheel-visualizer`.

## Acceptance Evidence

| Functional ID | Component proof | User behavior proof | Network proof | A11y proof | Visual proof | Live backend | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F-001 | Browser snapshot shows entry region | Button opens isolated dialog | No request on open | Button is named | F-Box entry card | Not run | passed locally |
| F-002 | Crop state appears after chooser | Local asset moves upload → crop | No provider request on staging | File input and drop zone | Crop stage | Not run | passed locally |
| F-003 | Three sliders in dialog | Values update without leaving page | Crop metadata held in state | Range controls exposed | Crop guide | Not run | passed locally |
| F-004 | Reference step snapshot | Gallery selection changes the authoritative reference | No network request before generate | Active thumbnail has label | Reference lockup | Not run | passed locally |
| F-005 | Generating state snapshot | Generate shows pending animation | 4174 independent backend; unconfigured route returns 503 | Dialog remains closable | Orbit/progress rail | Unconfigured route checked | passed locally |
| F-006 | Three result articles | Results show 3 angle cards and step 05 | Live provider output is labeled F-Box AI | Result alt text/actions | Result grid | Live provider awaits key | ready for live key |
