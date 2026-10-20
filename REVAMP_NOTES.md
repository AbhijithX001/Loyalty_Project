# Responsive revamp notes

## Causes found in the original prototype

- The original shared CSS was compact and relied on a single breakpoint, so intermediate tablet layouts did not have an explicit 640px/1024px progression.
- Auth and dashboard cards did not have a shared fluid type/layout system tied to the FixNow reference, creating uneven widths and vertical rhythm.
- Dashboard content used fixed visual assumptions for navigation and sheets. Bottom navigation, FABs and toasts needed safe-area-aware spacing and content clearance.
- Sheet sizing used `90vh` rather than dynamic viewport height and did not explicitly provide a resilient inner scroll surface.
- Several flex and grid areas lacked explicit `min-width: 0`, allowing long names, links and report rows to push their parents.
- Seller menu and report grids needed mobile-first `minmax(0, 1fr)` columns and deliberate desktop expansion rather than stretching the phone layout.
- Input sizing needed an explicit 16px minimum to prevent iOS zoom.
- Small stepper and icon controls needed a 44px minimum tap target.
- Charts needed fluid width rules. The SVG sparkline already had a viewBox; the new system keeps it at width 100%, and the bar chart now uses flexible columns.
- Data lists needed bordered, stacked mobile rows with controlled text truncation so customer, referral and report content cannot create page overflow.

## Fixes applied

- Rebuilt `css/base.css` mobile-first with explicit 640px and 1024px media queries, safe-area padding, `dvh`, focus states, reduced-motion support and `min-width: 0` rules.
- Rebuilt `css/customer.css` and `css/seller.css` with FixNow card, grid, menu, cart, report and QR layout rules.
- Kept mobile navigation and seller FAB clear of content with bottom padding and safe-area-aware offsets.
- Made sheets responsive bottom sheets on mobile and centred modals on larger screens with dynamic max heights and overflow scrolling.
- Kept chart SVGs fluid and the bar chart columns flexible.
- Kept HTML ids and data attributes used by the current JavaScript.

## Verification notes

The project has no package/build setup and no Playwright dependency was found during this pass. JS syntax and static traces are used unless a browser check is run separately.
