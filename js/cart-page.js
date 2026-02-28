// RetailConnect - Cart Page (Ghana style)
const CURRENCY = 'GH₵';

function getProductIcon(category) {
  const icons = { electronics: '📱', fashion: '👕', groceries: '🛒' };
  return icons[category] || '📦';
}

function renderCartPage() {
  const cart = getCart();
  const cartItems = document.getElementById('cart-items');
  const emptyCart = document.getElementById('empty-cart');
  const summarySection = document.getElementById('summary-section');
  const cartSummary = document.getElementById('cart-summary');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const navBadge = document.getElementById('navCartBadge');

  if (cart.length === 0) {
    if (cartItems) cartItems.innerHTML = '';
    if (emptyCart) emptyCart.classList.remove('hidden');
    if (summarySection) summarySection.classList.add('hidden');
    if (cartSummary) cartSummary.textContent = '0 item(s)';
    if (subtotalEl) subtotalEl.textContent = `${CURRENCY} 0.00`;
    if (totalEl) totalEl.textContent = `${CURRENCY} 0.00`;
    if (navBadge) { navBadge.textContent = ''; navBadge.style.display = 'none'; }
    return;
  }

  if (emptyCart) emptyCart.classList.add('hidden');
  if (summarySection) summarySection.classList.remove('hidden');

  const total = getCartTotal();
  const count = getCartCount();

  if (cartSummary) cartSummary.textContent = `${count} item(s)`;
  if (subtotalEl) subtotalEl.textContent = `${CURRENCY} ${total.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `${CURRENCY} ${total.toFixed(2)}`;
  if (navBadge) {
    navBadge.textContent = count;
    navBadge.style.display = count > 0 ? 'flex' : 'none';
  }

  if (cartItems) {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-card cart-item" data-id="${item.id}">
        <div class="product-img-placeholder">${getProductIcon(item.category)}</div>
        <div class="cart-info">
          <h3>${escapeHtml(item.name)}</h3>
          <p class="price">${CURRENCY} ${(item.price * (item.qty || 1)).toFixed(2)}</p>
          <div class="quantity">
            <button onclick="cartPageUpdateQty(${item.id}, -1)">−</button>
            <span>${item.qty || 1}</span>
            <button onclick="cartPageUpdateQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <span class="delete-btn" onclick="cartPageRemove(${item.id})" title="Remove">🗑</span>
      </div>
    `).join('');
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function cartPageUpdateQty(id, delta) {
  updateCartQty(id, delta);
  renderCartPage();
}

function cartPageRemove(id) {
  removeFromCart(id);
  renderCartPage();
}

function goToCheckout(e) {
  if (getCart().length === 0) {
    e?.preventDefault?.();
    alert('Your cart is empty');
    return false;
  }
  return true;
}

document.getElementById('checkout-link')?.addEventListener('click', function(e) {
  if (!goToCheckout(e)) e.preventDefault();
});

window.addEventListener('storage', renderCartPage);
renderCartPage();
