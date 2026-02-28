// RetailConnect - Checkout (Ghana style)
const ORDERS_KEY = 'retailconnect_orders';
const CURRENCY = 'GH₵';

function getOrders() {
  const stored = localStorage.getItem(ORDERS_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch (e) {}
  }
  return [];
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function selectPayment(method) {
  document.querySelectorAll('.payment-option').forEach(el => {
    el.classList.toggle('active', el.dataset.method === method);
  });
}

function renderCheckoutPage() {
  const cart = getCart();
  const checkoutItems = document.getElementById('checkout-items');
  const checkoutTotal = document.getElementById('checkout-total');

  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  const total = getCartTotal();

  if (checkoutItems) {
    checkoutItems.innerHTML = cart.map(item => `
      <div class="summary-row">
        <span>${escapeHtml(item.name)} × ${item.qty || 1}</span>
        <span>${CURRENCY} ${(item.price * (item.qty || 1)).toFixed(2)}</span>
      </div>
    `).join('');
  }

  if (checkoutTotal) {
    checkoutTotal.textContent = `${CURRENCY} ${total.toFixed(2)}`;
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function placeOrder() {
  const name = document.getElementById('customerName')?.value?.trim();
  const phone = document.getElementById('customerPhone')?.value?.trim();
  const address = document.getElementById('customerAddress')?.value?.trim();
  const paymentEl = document.querySelector('.payment-option.active');
  const paymentMethod = paymentEl?.dataset?.method || 'mtn';

  if (!name || !phone || !address) {
    alert('Please fill in your name, phone number, and delivery address.');
    return;
  }

  const cart = getCart();
  if (cart.length === 0) {
    alert('Your cart is empty');
    window.location.href = 'cart.html';
    return;
  }

  const order = {
    id: Date.now(),
    date: new Date().toISOString(),
    customer: { name, phone, address },
    paymentMethod,
    items: [...cart],
    total: getCartTotal(),
    status: 'completed'
  };

  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);

  saveCart([]);
  updateCartBadge?.();

  window.location.href = 'success.html';
}

renderCheckoutPage();
