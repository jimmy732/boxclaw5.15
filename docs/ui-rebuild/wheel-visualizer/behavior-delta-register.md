# Behavior Delta Register: wheel visualizer

| Delta ID | Requested change | Existing contract | Decision | Implementation | Verification |
| --- | --- | --- | --- | --- | --- |
| D-001 | Add preview flow only for wheel product detail pages | Existing catalog, vehicle, cart and checkout flows remain frozen | Approved by the current task | `app.js`, `styles.css` and scoped docs | Browser/local flow passed |
| D-002 | Add an explicit fifth Results step and a separate wheel-reference step | Previous preview prototype moved directly from crop to generation | Approved | Five-step rail; `reference` state; selected gallery image is sent as product reference | Static state/network checks |
| D-003 | Add a real backend and admin page to the independent 4174 storefront without touching BoxClaw | Independent static prototype had no real server bridge | Approved | 4174 local backend + `/admin` + direct LingkeAI media protocol | Unconfigured route and admin status checked |
| D-004 | Keep generation free for the customer | Existing product commerce flows use their own cart/checkout state | Approved | No credit, price or billing fields; F-Box backend uses official sponsorship | Payload inspection and UI copy |

No existing business behavior was intentionally changed.
