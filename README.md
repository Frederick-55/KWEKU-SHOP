# RetailConnect – African Mobile Shopping App

A mobile-first e-commerce prototype built with **pure HTML, CSS, and JavaScript**. Shop local, shop smart in Ghana.

## Features

- **Mobile-optimized UI** – Responsive, touch-friendly design
- **Product browsing & categories** – Electronics, Fashion, Groceries
- **Search** – Filter products by name or category
- **Cart & checkout** – Add to cart, adjust quantities, place orders
- **Payment flow** – Demo checkout (ready for Stripe, Paystack, MTN MoMo)
- **Admin panel** – Add and manage products
- **PWA-ready** – Install on Android/iOS as an app
- **LocalStorage** – Cart and orders persist across sessions

## Quick Start

1. **Serve locally** (required – service workers need HTTP):
   ```bash
   cd retailconnect
   npx serve .
   # or: python -m http.server 8000
   ```
2. Open `http://localhost:3000` (or `http://localhost:8000`) in your browser
3. Use mobile view in DevTools (Ctrl+Shift+M) for best experience

## Project Structure

```
retailconnect/
├── index.html      # Home – products, search, categories
├── package.json
├── capacitor.config.json
├── cart.html       # Cart – view & edit quantities
├── checkout.html   # Checkout – delivery details, payment
├── orders.html     # Order history
├── account.html    # Account & admin link
├── admin.html      # Add/manage products
├── manifest.json   # PWA manifest
├── sw.js           # Service worker
├── css/
│   └── styles.css
├── js/
│   ├── products.js   # Product data & storage
│   ├── app.js        # Home page logic
│   ├── cart.js       # Cart logic
│   ├── cart-page.js  # Cart page
│   ├── checkout.js   # Checkout & orders
│   ├── orders.js     # Orders page
│   ├── account.js    # Account page
│   ├── admin.js      # Admin panel
│   └── pwa.js        # Service worker registration
└── assets/images/
```

## Deployment (PWA)

### Option 1: Host and install

1. Host on **Netlify**, **Vercel**, or **GitHub Pages**
2. Android: Chrome → Menu → “Add to Home screen”
3. iOS: Safari → Share → “Add to Home Screen”

### Option 2: Play Store (Capacitor)

```bash
cd retailconnect
npm install
npm install @capacitor/core @capacitor/cli
npx cap add android
npx cap sync
npx cap open android
```

See **CAPACITOR_SETUP.md** for full Play Store publishing steps.

## Payment Integration

The prototype uses a **simulated** checkout. For production:

1. **Backend required** – Node.js, PHP, or similar
2. **Payment providers** – Stripe, Paystack, Flutterwave, MTN MoMo API
3. **Flow** – Create session on backend → redirect to gateway → webhook confirms payment

## Development Challenges & Solutions

| Challenge          | Solution                               |
|--------------------|----------------------------------------|
| Device compatibility | Mobile-first CSS, responsive grid   |
| Security           | HTTPS, backend verification, JWT       |
| Slow loading       | PWA caching, image compression         |
| Complex checkout   | One-page checkout, clear steps         |
| Ghana payments     | Paystack, MTN MoMo, Flutterwave        |

## License

MIT – Use freely for learning and projects.
