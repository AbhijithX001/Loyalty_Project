# BRIEF: Restaurant Loyalty and Billing Website (Front-End Prototype)

This file is the single source of truth for the project. Read all of it before doing anything. Every phase prompt you receive later refers back to this file. If a phase prompt and this file disagree, ask before proceeding.

## 0. How you must work

- Build only what the current phase prompt asks for. Do not add features, pages or libraries that were not requested.
- Do not change the design tokens in section 4 unless a phase prompt tells you to.
- Never use emojis anywhere: not in the UI, not in strings, not in code comments, not in file names.
- Keep text minimal (see section 4.7).
- When a phase is finished, reply with: what you built, which files changed, and how to open it. Nothing else.
- Ask a question only if you are blocked. Otherwise pick the simplest option that fits this brief and mention the choice in one line.

## 1. What we are building

A website for small restaurants with two roles that share one codebase:

- **Customer**: scans the restaurant's QR code, logs in with mobile number and OTP, sees their bills, earns loyalty points on each purchase, redeems points for menu items, and refers friends for bonus points.
- **Seller (restaurant owner or staff)**: sets up the loyalty program, manages the menu, creates bills at the counter, manages customers, approves redemptions, tracks referrals and views reports.

The product will be used mostly on phones, but must work equally well on laptops.

## 2. Scope of this prototype

This is a front-end-only, clickable prototype to show a client how everything works. If the client approves, a real backend will be built later.

**In scope**
- All pages and flows listed in section 6 to 9, fully clickable and working against mock data.
- Data saved in the browser (localStorage) so flows work across pages and refreshes.

**Out of scope (mock or skip)**
- Real OTP, WhatsApp, SMS or email sending. The OTP is always `123456`. The "message sent to customer" is a simulated preview only.
- Real payments. The platform only records bills.
- Real backend, database, authentication security, or any network request.

## 3. Tech rules

- Plain HTML, CSS and vanilla JavaScript. No frameworks, no build step, no npm, no CDN, no external fonts, no external images. It must work by double-clicking `index.html`.
- Multi-page site (one HTML file per page listed in section 6), with shared CSS and JS files.
- Data lives in `js/mock-data.js` (seed) and is persisted by `js/store.js` (get, set, update helpers and a `resetDemo()` function that restores the seed).
- Charts are inline SVG built with small JS helpers. No chart libraries.
- Icons are inline SVG from one icon set defined in `js/icons.js` (see section 4.5).
- Use semantic HTML, label every form field, give every icon-only button an `aria-label`, and keep visible focus states.
- Format all money with `Intl.NumberFormat('en-IN')` and the rupee sign, for example `₹1,250`.
- Code must be clean and commented sparingly. No dead code.

## 4. Design system

This section describes the current FixNow-inspired local theme. The exact source values and substitutions are recorded in `DESIGN_TOKENS.md`.

### 4.1 Principles
1. Mobile first at 360px, then enhance at 640px and 1024px.
2. Use an off-white canvas, white bordered cards, one lime accent and short copy.
3. Keep cards, rows, controls, statuses and navigation consistent across roles.
4. Use clear hierarchy: bold display values, compact labels and muted secondary text.

### 4.2 Reference style
- FixNow-inspired off-white `#f5f4ef` canvas, white surfaces, thin `#e8e8e8` borders and restrained shadows.
- Lime `#c8f135` is used for primary actions and active navigation; dark ink is used for hero and mobile navigation surfaces.
- Cards use a 16px radius. Buttons and chips are pill-shaped; inputs use 12px corners.
- Mobile navigation is a dark floating pill. Desktop uses a fixed white sidebar with a lime active item.
- Auth pages use a full-height mobile layout and a centred card on larger screens.

### 4.3 Tokens
- `--fn-bg: #f5f4ef`, `--fn-surface: #ffffff`, `--fn-line: #e8e8e8`.
- `--fn-ink: #0d0d0d`, `--fn-text: #4b4b4b`, `--fn-muted: #9ca3af`.
- `--fn-accent: #c8f135`, `--fn-accent-dark: #a8cc1a`.
- `--fn-success: #15803d`, `--fn-warning: #a16207`, `--fn-danger: #dc2626`, `--fn-blue: #1d4ed8`.
- Card radius `16px`, control radius `12px`, pill radius `999px`.
- Shadows: `0 1px 3px rgba(0,0,0,.06)` for cards and `0 4px 16px rgba(0,0,0,.10)` for action surfaces.
- Headings use an Arial/Helvetica system substitute; body uses `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`.
- Body is 15px, captions are 11px uppercase with letter spacing, buttons and inputs are at least 44px and 48px high respectively.

### 4.4 Components
`css/base.css` defines cards, hero cards, list rows, stat cards, FixNow-style buttons, inputs, six-box OTP, search bars, chips, segmented controls, status pills, floating navigation, seller FAB, sidebar, responsive sheets/modals, toast, skeleton, empty state, month switcher and responsive SVG chart containers.

### 4.5 Icons
Use the existing inline SVG set in `js/icons.js`: 2px strokes, rounded caps and joins, 24px viewBox. No emojis, icon fonts, images or external icon libraries.

### 4.6 Responsive behaviour
- Mobile under 640px: single-column layout, compact page header, floating bottom navigation and bottom sheets.
- Tablet 640–1023px: two-column card grids where useful; bottom navigation remains.
- Desktop 1024px and above: fixed sidebar, content offset, max-width grids and centred modal sheets; no phone frame.
- Use `min-width: 0`, fluid widths, `dvh`, safe-area padding, responsive SVG viewBoxes and bottom content padding. No page-level horizontal scrolling.
- Tables become stacked rows on phones and expand into aligned data layouts at larger widths. Seller billing is a menu/cart two-pane layout on desktop and a sticky cart summary on mobile.

### 4.7 Copy rules
Use only labels, values, short status words and one-line empty/error messages. Buttons stay to one or two words. Do not add taglines, marketing copy or emojis.

## 5. Roles and business rules

1. A customer opens `customer/login.html?r=<restaurantId>` by scanning the restaurant's QR code.
2. Login uses mobile number and OTP. Register uses name, mobile, OTP and an optional referral code. There are no passwords.
3. Mock OTP: any valid 10-digit mobile is accepted and the OTP is always `123456`. Show this as a small hint on the OTP screen only.
4. Seller login and register work the same way. Seller registration also asks for the restaurant name.
5. **Points rule (seller-configurable), one of:**
   - `percent`: percentage of the bill (default 10%, so a ₹400 bill gives 40 points)
   - `perAmount`: X points for every ₹Y spent
   - `flat`: N points per bill
   Points are always whole numbers (round down).
6. Points never expire. Balances are per restaurant.
7. The platform only records bills. A finished bill is recorded as Paid immediately. A customer can see a bill only after it is Paid.
8. **Referral:** each customer has a referral code and link. A new customer can enter it at registration or arrive through the link. The referral is Pending until the friend's first Paid bill. Then it becomes Rewarded and the referrer receives the seller-configured referral points.
9. **Redemption:** the customer picks a seller-defined reward and submits a request (status Pending). The points are held immediately. The seller can Approve (the hold becomes a permanent deduction), Reject with an optional reason (points are returned), and then Mark fulfilled after serving the item.
10. After a bill is created, a simulated message with a login link is shown in a preview (no real sending).
11. New customers at the counter need only name and mobile. If a customer with that mobile exists, link the bill to them.

## 6. Pages and folder structure

```
index.html                 Demo hub: links to every page, Reset demo data button, short demo guide
customer/login.html
customer/register.html
customer/otp.html
customer/dashboard.html    Main customer screen (single page, tabbed views)
seller/login.html
seller/register.html
seller/otp.html
seller/dashboard.html      Main seller screen (single page, sidebar or bottom navigation)
css/base.css               Tokens and shared components
css/customer.css
css/seller.css
js/icons.js
js/utils.js                Formatting, dates, toasts, sheets, small chart helpers
js/mock-data.js
js/store.js
js/auth.js                 Session handling, role guards, logout
js/customer.js
js/seller.js
README.md
```

The seller dashboard and the customer dashboard must be completely separate pages with their own navigation and styling. Authentication pages are shared in style but separate per role.

Auth flow: login or register, then OTP, then the matching dashboard. Dashboards redirect to the correct login page if there is no valid session for that role.

## 7. Customer dashboard (`customer/dashboard.html`)

Navigation (mobile floating pill and desktop sidebar): Home, Bills, Redeem, Refer, Profile.

**Home**
- Hero card: points balance (large), small line with restaurant name, and a link to points history.
- Quick actions: Redeem, Refer, Bills, History.
- Spending card: sparkline or six-month bars, tap to open Insights.
- Recent bills: latest 4 rows with "See all".

**Insights** (sub-view from the spending card)
- Month switcher, bar chart for the last 6 months with the selected month highlighted.
- Three stat cards: Visits, Average bill, Points earned. One row to compare with the previous month.

**Bills**
- Search bar, filter chips (All, This month, Last month, Older), list of Paid bills only.
- Tap a bill to open a bottom sheet: itemised lines, total, points earned, date, bill number.

**Points history** (sub-view)
- Ledger rows: earned, referral reward, held, returned, adjusted. Each with date and a signed amount.

**Redeem**
- Grid or list of the seller's rewards with points cost. Disabled if the balance is too low.
- Redeem opens a confirmation sheet. On confirm, points are held and the request is Pending.
- "My requests" list with status pills.

**Refer**
- Referral code and link with a Copy button and a Share button (mock share sheet).
- List of referred friends with status Pending or Rewarded and the points earned.

**Profile**
- Name, mobile, restaurant, Logout.

## 8. Seller dashboard (`seller/dashboard.html`)

Navigation on desktop (sidebar): Overview, Billing, Customers, Menu, Loyalty, Redemptions, Referrals, Reports, QR code.
Navigation on mobile: floating pill with Overview, Billing, Customers, Redemptions and More (More opens a sheet with Menu, Loyalty, Referrals, Reports, QR code, Logout). A floating "+" button opens Billing from any screen.

**Overview**
- Stat cards: Sales today, Bills today, Customers, Pending redemptions.
- Small sales sparkline and the latest bills.

**Billing** (the most important screen, optimised for speed on a phone)
- Search and category chips, tappable menu items with quantity steppers, sticky cart summary with total.
- Customer step: enter mobile number. If the customer exists, show name and points balance. If not, ask only for name.
- Live preview of points the customer will earn under the current rule.
- Generate bill: records the bill as Paid, awards points, triggers referral reward if it is the friend's first bill, then shows a success view with the bill summary, a Print action, and a simulated message preview containing the customer's login link.

**Customers**
- Search and list with name, mobile, total spent, points. Tap opens a detail sheet with bills, points history, and a form to award or adjust points with a reason.

**Menu**
- Add, edit, hide and delete items: name, category, price, availability.

**Loyalty**
- Points rule selector (percent, perAmount, flat) with a live example line.
- Referral reward points.
- Rewards list: add, edit, remove (name, points cost, active).

**Redemptions**
- Segmented control: Pending, Approved, Rejected, Fulfilled. Actions: Approve, Reject (optional reason), Mark fulfilled.

**Referrals**
- Summary cards (Total, Converted, Points given) and a list of referrer, friend, date, status.

**Reports**
- Range chips: 7 days, 30 days, 60 days.
- Sales over time chart, top 5 items, top 5 customers, points issued vs redeemed, new vs returning customers, referral conversion. A CSV download for bills.

**QR code**
- Generated QR pointing to `customer/login.html?r=<restaurantId>` (pure JS generator, no library) and a printable table-tent view with the restaurant name.

## 9. Data model (mock, stored in localStorage)

- `restaurant`: id, name, ownerName, mobile, pointsRule `{mode, percent, points, perAmount, flatPoints}`, referralReward
- `menuItem`: id, restaurantId, name, category, price, available
- `customer`: id, restaurantId, name, mobile, referralCode, referredBy (customer id or null), joinedAt
- `bill`: id, number, restaurantId, customerId, items `[{itemId, name, qty, price}]`, total, pointsEarned, status (always `paid`), createdAt
- `ledger`: id, customerId, type (`earned`, `referral`, `held`, `returned`, `adjust`), points (signed), refId, note, createdAt. The balance is the sum of the ledger.
- `reward`: id, restaurantId, name, pointsCost, active
- `redemption`: id, customerId, rewardId, points, status (`pending`, `approved`, `rejected`, `fulfilled`), reason, createdAt, decidedAt
- `referral`: id, referrerId, friendId, status (`pending`, `rewarded`), rewardPoints, createdAt, rewardedAt
- `session`: role (`customer` or `seller`), userId

Referral code format: first three letters of the name in capitals plus four digits. Referral link: `customer/register.html?r=<restaurantId>&ref=<CODE>`.

## 10. Seed data

- Restaurant "Malabar Bites", owner mobile `9000000000`, points rule percent 10%, referral reward 50 points.
- 12 menu items across 3 categories (Meals, Snacks, Drinks) with realistic Kerala restaurant items and prices in rupees.
- 8 customers with Indian names, including a demo customer with mobile `9000000001` who has around 300 points, 6 or more bills, one pending redemption and one pending referral.
- About 25 paid bills spread over the last 60 days with believable totals.
- 5 rewards, for example a fresh lime juice, tea, a snack and a meal discount, with point costs.
- A few redemptions in each status and a few referrals (Pending and Rewarded).
- Demo logins: seller `9000000000`, customer `9000000001`, OTP `123456`.

## 11. Flows that must work end to end

1. New customer registers, the seller bills them, the customer sees the bill and the points.
2. Customer requests a reward, the points are held, the seller approves, and the customer's request status updates.
3. Customer A shares a link, friend B registers through it, A stays Pending until B's first bill, then A is credited and shows Rewarded.
4. The seller changes the points rule, and the next bill uses the new rule.
5. Reject returns the held points. Manual award or adjust writes a ledger entry.
6. Refreshing any page keeps the session and data. Reset demo data restores the seed.

## 12. Acceptance checklist

- Works by opening `index.html`, with no console errors.
- Looks right and has no horizontal scroll at 360px, 768px and 1280px.
- No emojis anywhere. All icons come from `js/icons.js`.
- Text is minimal and follows section 4.7.
- All six flows in section 11 work.
- Seller and customer dashboards are separate pages with separate navigation.
- Every screen has loading, empty and error states where relevant.

## 13. Assumptions made (change if wrong)

- The single accent colour is blue (`#4F7CF0`). It lives in one CSS variable.
- Mobile navigation is a floating dark pill where the active item shows an icon and a label.
- Points balances are per restaurant and the demo has one restaurant.
- Points are held when a redemption is requested and returned if it is rejected.
- Bills are recorded as Paid at creation, since the platform does not handle payments.
- English only for now.
