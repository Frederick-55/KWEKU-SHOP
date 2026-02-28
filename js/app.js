// RetailConnect - Main App Logic
syncProducts();

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("searchInput");

function scrollToProducts() {
  const el = document.getElementById('products');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function displayProducts(items) {
  if (!productList) return;
  productList.innerHTML = "";
  const icons = { electronics: '📱', fashion: '👕', groceries: '🛒' };
  items.forEach(product => {
    productList.innerHTML += `
      <div class="product-card" data-category="${product.category || 'groceries'}">
        <div class="product-image">
          ${product.img ? `<img src="${product.img}" alt="${escapeHtml(product.name)}" class="product-img">` : (icons[product.category] || '📦')}
        </div>
        <div class="product-body">
          <h4>${escapeHtml(product.name)}</h4>
          <p class="price">GH₵ ${Number(product.price).toFixed(2)}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function filterCategory(category) {
  syncProducts();
  const buttons = document.querySelectorAll('.categories button');
  buttons.forEach(btn => btn.classList.remove('active'));
  const activeBtn = Array.from(buttons).find(btn => btn.textContent.toLowerCase().trim() === category);
  if (activeBtn) activeBtn.classList.add('active');

  if (category === "all") {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
  }
}

function searchProducts() {
  syncProducts();
  const query = (searchInput?.value || '').toLowerCase().trim();
  if (!query) {
    const activeBtn = document.querySelector('.categories button.active');
    const category = activeBtn?.textContent?.toLowerCase() || 'all';
    filterCategory(category === 'all' ? 'all' : category);
    return;
  }
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );
  displayProducts(filtered);
}

if (searchInput) {
  searchInput.addEventListener('input', debounce(searchProducts, 300));
}

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}

if (productList) {
  displayProducts(products);
}
