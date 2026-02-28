// RetailConnect - Service Worker for PWA
const CACHE_NAME = 'retailconnect-v1';

const ASSETS = [
  './',
  './index.html',
  './cart.html',
  './checkout.html',
  './orders.html',
  './account.html',
  './admin.html',
  './success.html',
  './css/styles.css',
  './js/products.js',
  './js/app.js',
  './js/cart.js',
  './js/cart-page.js',
  './js/checkout.js',
  './js/orders.js',
  './js/account.js',
  './js/admin.js',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch(() => {});
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() =>
        caches.match(e.request).then((r) => r || caches.match('./index.html'))
      )
    );
    return;
  }
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
