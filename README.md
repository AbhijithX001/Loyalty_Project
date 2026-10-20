# Malabar Bites loyalty prototype

Front-end-only restaurant loyalty and billing prototype. It uses plain HTML, CSS, and vanilla JavaScript with browser `localStorage`; there is no build step or backend.

## Run locally

Open [index.html](index.html) directly in a browser. For a local server, run:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Demo access

- Seller mobile: `9000000000`
- Customer mobile: `9000000001`
- OTP: `123456`

Use the Demo hub to reset all seed data. Sessions are kept per browser tab and survive refreshes.

## Structure

```text
index.html
css/base.css          Shared tokens and components
css/customer.css      Customer dashboard styles
css/seller.css        Seller dashboard styles
js/icons.js           Inline SVG icon set
js/utils.js           Formatting, sheets, toasts, charts
js/mock-data.js       Seed data
js/store.js            localStorage and points helpers
js/auth.js             OTP flow, sessions, guards, logout
js/customer.js        Customer dashboard views and actions
js/seller.js           Seller dashboard views and actions
customer/              Customer auth and dashboard pages
seller/                Seller auth and dashboard pages
```

## Free hosting

### Netlify

Create a new site from the project folder, choose no build command, and set the publish directory to the project root. Netlify will provide a public HTTPS URL that works on a phone.

### GitHub Pages

Create a repository, push the project files to the default branch, then open Settings, Pages, choose GitHub Actions or “Deploy from a branch”, and select the repository root. GitHub Pages will publish `index.html` as the site entry point.

Because this is a static prototype, all visitors receive the same seed data in their own browser until they reset or modify it.
