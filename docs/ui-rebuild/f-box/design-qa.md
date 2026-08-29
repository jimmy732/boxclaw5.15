# F-Box design QA

QA pass completed against the local static build at `http://localhost:4174/`.

## Verified

- Desktop home: sticky utility header, dark navigation, hero, vehicle cascade, trust strip, guide cards, category cards, wheel cards, brake lab, review proof, footer.
- Vehicle cascade: selecting `2020 → Honda → Civic → Sport → FWD` populates each dependent field and persists the selected vehicle into the store context.
- Catalog: product count, product-type filter, sale-only toggle, finish, diameter, price range, rating and sort controls update the grid.
- Product card: wishlist, quick view, details route and add-to-cart.
- Product detail: image thumbnail switching, finish controls, specs, financing copy, fitment selector, add-to-cart, buy-now and review sections.
- Reviews: stagger reveal, Load more and Write a review modal.
- Cart: quantity controls, remove, subtotal, coupon feedback, checkout modal and three checkout steps.
- Utilities: account modal, chat widget, cookie dismissal and hash-based navigation.
- Localization: manual language select, IP-country auto detection, browser-language fallback, English default for unknown countries and Arabic RTL direction.
- Mobile: header collapses to search + icon actions + hamburger, hero fitment controls stack vertically, product grid stays two-up, detail and cart layouts collapse to one column.

## Intentional demo boundaries

- Account, checkout, payment, inventory, tax, shipping and order tracking are local demonstrations; no request is sent to an external service.
- IP language detection is a best-effort browser-side request to `https://ipapi.co/json/`; production should move geolocation to the site's own edge/server layer and update privacy consent accordingly.
- Prices and reviews are replaceable seed data. Replace them with F-Box data before a commercial launch.
- Google Fonts and Anime.js are loaded from CDNs; CSS reveal remains available if Anime.js is unavailable.
- All copied reference images used in the demo are stored locally under `assets/`. Confirm commercial image/data rights before publishing.
## Latest vehicle-fitment and UI pass

- Year select now contains 2027 through 1980 (49 options including the placeholder).
- The sample path from the supplied reference is supported: `2015 → Audi → Q3 → Premium Plus → FWD`.
- Vehicle data covers common global makes and model families with year availability, trim lists and drive options.
- After the trim/drive selection is complete, a shadcnblocks-inspired popover/card treatment reveals matched wheel, caliper, rotor and brake-pad products.
- `Shop now` and `View all matching parts` preserve the selected vehicle context on the catalog page.
- `Change vehicle` clears the saved fitment and returns to the selector.

## Latest full-page localization pass

- Manual language switching now re-renders the full page and translates visible marketing copy, navigation, form labels, filter controls, reviews, cart, checkout and dynamic modals.
- Repeated labels are translated across every matching DOM node while the translation request is de-duplicated and cached.
- Product names, vehicle names, brands, specifications, Part Numbers and company identity remain protected from machine translation.
- Arabic switches the document to RTL; unknown or unsupported IP countries fall back to English.
- Browser QA verified Chinese home/store/cart/modal states, Arabic RTL, English reset and zero application console errors.

## Latest custom-wheel homepage pass

- Home is now positioned around made-to-order wheels and fitment-led custom briefs without changing the existing catalog or checkout state machine.
- The new hierarchy is: custom-wheel Hero → vehicle brief / fitment selector → buyer use cases → process proof → finish directions → existing gallery → existing ready-to-buy wheel cards → brakes → reviews.
- Primary custom CTA scrolls to the existing vehicle selector; `Shop finished wheels` routes to the existing Wheels catalog state; product cards still open the existing Quick View and detail routes.
- Desktop and 390px mobile checks passed without horizontal overflow. Existing `#store`, `#product/*` and `#cart` navigation was rechecked after the Home swap.
- The supplied Alibaba storefront currently serves an anti-bot verification page in this environment, so no CAPTCHA bypass was attempted and no unverified factory image was presented as an actual factory photo.
