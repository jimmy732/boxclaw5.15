# Persistence And Side-Effect Map: wheel visualizer

## Browser Storage

| Key / prefix | Storage | Owner | Data | Read timing | Write / clear trigger | Compatibility |
| --- | --- | --- | --- | --- | --- | --- |
| none for visualizer | in-memory state | `app.js` | `vehicleFile`, object URL, crop values, job state and result URLs | While dialog is open | Set on open/upload; revoke on close/reset | No migration; personal car photos are not persisted by the storefront |
| `fbox-cart` | `localStorage` | existing cart flow | Product quantities | Existing app startup | Existing add/remove/checkout actions | Frozen; visualizer never changes it |
| `fbox-vehicle` | `localStorage` | existing fitment flow | Year/make/model/trim/drive | Existing app startup | Existing fitment selectors | Frozen; visualizer reads product context only |

## Other Effects

| Functional ID | Effect | Owner | Trigger | Expected behavior | Cleanup / recovery |
| --- | --- | --- | --- | --- | --- |
| F-001 | Dialog | `app.js` | Open/close button, overlay, Escape | Isolated from existing `state.modal` | Close revokes object URL and clears transient state |
| F-002 | File chooser / drag and drop | browser + `app.js` | Image selection | File stays in memory until generate | Invalid type/size becomes error; reset clears it |
| F-003 | Local object URL | browser | Accepted file | Used only for crop/result mock | `URL.revokeObjectURL` on reset and close |
| F-004 | POST upload/job creation | 4174 same-origin F-Box backend → LingkeAI | Generate after the reference step | JSON data URLs + product reference + crop metadata; files are converted in memory | Server controls provider auth, job ownership, routing and sponsored usage |
| F-004 | Polling | `wheelVisualizerPoll` | Server returns queued/running | Polls up to 45 attempts, then gives recoverable error | Retry or close stops further UI ownership; server job continues under server policy |
| F-005 | Result rendering | `app.js` | Three successful outputs | Does not alter cart, fitment, product or checkout state | Close releases local asset URL |

## Compatibility Plan For Any Approved Storage Change

No storage change is approved for this feature. Do not persist customer vehicle photos, generated images or generation prompts in the public storefront localStorage.
