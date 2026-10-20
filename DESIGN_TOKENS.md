# Design tokens: UI revamp

Source inspected: `/Users/abhijithp/Desktop/fixnow/static/css/fixnow.css`, `/Users/abhijithp/Desktop/fixnow/templates/provider/base.html`, `/Users/abhijithp/Desktop/fixnow/templates/provider/dashboard.html`, `/Users/abhijithp/Desktop/fixnow/templates/frontend/customer_dashboard.html`, `/Users/abhijithp/Desktop/fixnow/templates/authenticate/login.html`, `/Users/abhijithp/Desktop/fixnow/templates/accounts/customer_register.html`, `/Users/abhijithp/Desktop/fixnow/templates/accounts/provider_register.html`, and `/Users/abhijithp/Desktop/fixnow/templates/accounts/verify_otp.html`.

## Extracted FixNow theme

| Area | Exact source value | Prototype token or use |
| --- | --- | --- |
| Canvas | `#f5f4ef` | `--fn-bg` / `--bg` |
| Surface | `#ffffff` | `--fn-surface` / `--surface` |
| Border | `#e8e8e8` | `--fn-line` / `--line` |
| Primary text | `#0d0d0d` | `--fn-ink` / `--text` |
| Secondary text | `#4b4b4b` | `--fn-text` / `--text-muted` |
| Muted text | `#9ca3af` | `--fn-muted` |
| Accent | `#c8f135` | `--fn-accent` / `--accent` |
| Accent hover | `#a8cc1a` | `--fn-accent-dark` |
| Danger | `#ef4444` in FixNow CSS; component badges use `#dc2626` | `--fn-danger`, soft danger uses `#fef2f2` |
| Success | `#22c55e` status border / `#15803d` badge text | `--fn-success`, soft success uses `#f0fdf4` |
| Warning | `#f59e0b` status border / `#a16207` badge text | `--fn-warning`, soft warning uses `#fefce8` |
| Information | `#3b82f6` status border / `#1d4ed8` badge text | `--fn-blue`, soft information uses `#eff6ff` |
| Dark areas | `#0d0d0d` text and dark dashboard surfaces | `--fn-dark` |
| Heading font | `Plus Jakarta Sans` in the source | Arial/Helvetica system substitute in `--fn-head` |
| Body font | `Inter` in the source | system-stack substitute in `--fn-body` |
| Card radius | `16px` | `--fn-radius-card` |
| Button radius | `50px` | `--fn-radius-pill` |
| Control radius | `10px` source inputs, `12px` source auth cards and prototype controls | `--fn-radius-control: 12px` |
| Card shadow | `0 1px 3px rgba(0,0,0,0.06)` | `--fn-shadow-card` |
| Action shadow | `0 4px 16px rgba(0,0,0,0.10)` | `--fn-shadow-action` |
| Container | `1100px` source marketing container | `--fn-max-width: 1200px` for dashboard content |

## Components and layout

- Source buttons use filled lime primary, outlined dark secondary, outlined border ghost and outlined red danger variants. The prototype keeps those variants and enforces 44px minimum tap targets.
- Source cards use white surfaces, thin borders and 16px corners. Prototype cards reuse this with compact 16px/20px padding.
- Source dashboard navigation uses a 260px white fixed sidebar, dark text and a lime active row. The prototype uses a 220px fixed sidebar at 1024px and above, with its existing separate customer and seller navigation.
- Source auth pages center a bordered card with generous padding. The prototype uses full-height mobile auth and a centred max-width card on larger screens.
- Source status badges are tinted pills with coloured borders. The prototype maps Paid/Rewarded, Pending, Approved, Rejected and Fulfilled to the same treatment.
- Source tables and information rows use full-width bordered surfaces and flexible rows. The prototype keeps stacked rows on mobile and expands the grid at larger breakpoints.
- Source forms use bordered controls and 16px body text. The prototype keeps 16px inputs to avoid iOS zoom and uses visible lime focus rings.

## Substitutions

- FixNow imports Google Fonts via `@import`. The prototype does not use a CDN; it uses the local system stack above because no licensed font files were present in the FixNow folder.
- FixNow references IcoFont in its project documentation. The prototype does not use an icon font; its existing inline SVG icon set in `js/icons.js` is retained and styled as 2px rounded line icons.
- FixNow has Django template helpers, external favicon assets and external navigation URLs. The prototype is a double-clickable static site, so these are not copied.
- FixNow's broader marketing spacing is reduced to match the restaurant prototype's mobile-first dashboard density.
