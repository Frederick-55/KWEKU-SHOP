// RetailConnect - Orders Page
function getOrders() {
  const stored = localStorage.getItem('retailconnect_orders');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {}
  }
  return [];
}

function renderOrdersPage() {
  const orders = getOrders();
  const ordersList = document.getElementById('orders-list');
  const noOrders = document.getElementById('no-orders');

  if (!ordersList || !noOrders) return;

  if (orders.length === 0) {
    ordersList.innerHTML = '';
    noOrders.classList.remove('hidden');
    return;
  }

  noOrders.classList.add('hidden');
  ordersList.innerHTML = orders.map(order => {
    const date = new Date(order.date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const itemsCount = (order.items || []).reduce((s, i) => s + (i.qty || 1), 0);
    return `
      <div class="order-card">
        <h4>Order #${order.id}</h4>
        <p class="order-date">${date} • ${itemsCount} item(s)</p>
        <p class="order-total">GH₵ ${(order.total || 0).toFixed(2)}</p>
      </div>
    `;
  }).join('');
}

renderOrdersPage();
