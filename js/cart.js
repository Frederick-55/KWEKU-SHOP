// RetailConnect - Cart Management
const CART_KEY = 'retailconnect_cart';

function getCart() {
  const stored = localStorage.getItem(CART_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.warn('Invalid cart in localStorage');
    }
  }
  return [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(id) {
  syncProducts();
  const product = products.find(p => p.id === id);
  if (!product) {
    alert('Product not found');
    return;
  }
  let cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  updateCartBadge();
  showToast('Added to cart!');
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  updateCartBadge();
}

function updateCartQty(id, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  const newQty = Math.max(0, (item.qty || 1) + delta);
  if (newQty === 0) {
    removeFromCart(id);
  } else {
    item.qty = newQty;
    saveCart(cart);
  }
  updateCartBadge();
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0);
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.qty || 1), 0);
}

function updateCartBadge() {
  const el = document.getElementById('cartCount');
  if (el) {
    const count = getCartCount();
    const span = el.querySelector('span');
    if (span) span.textContent = count;
  }
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#2e7d32;color:white;padding:10px 20px;border-radius:8px;z-index:9999;font-size:0.95rem;animation:fadeIn 0.3s ease;';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}
