# F-Box UI rebuild map

## Reference surface

Reference: `https://www.fitmentindustries.com/`

The reconstruction keeps the useful shopping behavior while replacing the public-facing identity with F-Box:

| Reference behavior | F-Box surface |
| --- | --- |
| White utility header + dark navigation | F-Box sticky header with search, account, cart and mega menu |
| Hero vehicle cascade | Year / Make / Model / Trim / Drive cascade with local persistence |
| Product collection left rail | F-Box AI, ZIP, vehicle, category, finish, size, price, rating filters |
| Product cards | Local F-Box wheel and brake-part cards with prices, ratings, delivery and quick view |
| Product detail | Gallery, fitment context, price/set price, financing, specs, reviews, related products |
| Empty/cart/checkout states | Local cart with quantity controls and three-step demo checkout |
| Cookie/chat utilities | Dismissible cookie banner and canned fitment-help chat |

## Scope boundaries

This is a new standalone front-end project. It does not import or modify BoxClaw source, routes, database models, or permissions. All state is local to this demo and no real payment or account request is sent.
