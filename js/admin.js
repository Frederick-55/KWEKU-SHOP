// Admin panel for RetailConnect - uses products from js/products.js

// Ensure latest products loaded
syncProducts();

// Cloudinary settings - replace with your values
const CLOUD_NAME = "YOUR_CLOUD_NAME"; // e.g. 'demo'
const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET"; // unsigned preset

async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  return data.secure_url;
}

function saveToStorage() {
  // products and saveProducts are provided by js/products.js
  saveProducts(products);
}

function saveProduct() {
  const id = document.getElementById('productId').value;
  const name = document.getElementById('name').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const fileInput = document.getElementById('imageFile');
  const existingUrl = document.getElementById('imageUrl').value || '';
  const stock = parseInt(document.getElementById('stock').value, 10) || 0;
  const category = document.getElementById('category').value;

  if (!name || isNaN(price)) {
    alert('Please fill at least Name and Price');
    return;
  }

  let imageUrl = existingUrl;
  const file = fileInput?.files && fileInput.files[0];
  if (file) {
    try {
      imageUrl = await uploadImage(file);
    } catch (e) {
      console.error('Upload failed', e);
      alert('Image upload failed. See console for details.');
      return;
    }
  }

  if (id) {
    const idx = products.findIndex(p => p.id == id);
    if (idx > -1) {
      products[idx] = { ...products[idx], id: Number(id), name, price, img: imageUrl, stock, category };
    }
  } else {
    products.push({ id: Date.now(), name, price, img: imageUrl, stock, category });
  }

  saveToStorage();
  resetForm();
  displayProducts();
}

function displayProducts() {
  syncProducts();
  const container = document.getElementById('adminProducts');
  if (!container) return;
  container.innerHTML = '';

  products.forEach(product => {
    container.innerHTML += `
      <div class="admin-card">
        <div style="display:flex;align-items:center;gap:12px;">
          <img src="${product.img || ''}" alt="${escapeHtml(product.name)}" width="60" onerror="this.style.display='none'">
          <div>
            <strong>${escapeHtml(product.name)}</strong><br>
            GH₵ ${Number(product.price).toFixed(2)}<br>
            Stock: ${product.stock || 0}
          </div>
        </div>
        <div>
          <button class="btn" onclick="editProduct(${product.id})">✏</button>
          <button class="btn danger" onclick="deleteProduct(${product.id})">🗑</button>
        </div>
      </div>
    `;
  });
}

function editProduct(id) {
  syncProducts();
  const product = products.find(p => p.id == id);
  if (!product) return;
  document.getElementById('productId').value = product.id;
  document.getElementById('name').value = product.name || '';
  document.getElementById('price').value = product.price || '';
  document.getElementById('imageUrl').value = product.img || '';
  const preview = document.getElementById('preview');
  if (product.img && preview) preview.src = product.img;
  const fileInput = document.getElementById('imageFile');
  if (fileInput) fileInput.value = '';
  document.getElementById('stock').value = product.stock || 0;
  document.getElementById('category').value = product.category || 'groceries';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteProduct(id) {
  if (!confirm('Delete this product?')) return;
  products = products.filter(p => p.id != id);
  saveToStorage();
  displayProducts();
}

function resetForm() {
  document.getElementById('productId').value = '';
  document.getElementById('name').value = '';
  document.getElementById('price').value = '';
  document.getElementById('imageUrl').value = '';
  const preview = document.getElementById('preview');
  if (preview) preview.src = '';
  const fileInput = document.getElementById('imageFile');
  if (fileInput) fileInput.value = '';
  document.getElementById('stock').value = '';
}

// Minimal HTML-escaping helper (uses escapeHtml from app.js if present)
function escapeHtml(text) {
  if (typeof window.escapeHtml === 'function') return window.escapeHtml(text);
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Initial render
displayProducts();

// Image preview handler
const fileEl = document.getElementById('imageFile');
if (fileEl) {
  fileEl.addEventListener('change', function() {
    const file = this.files[0];
    const preview = document.getElementById('preview');
    if (file && preview) {
      preview.src = URL.createObjectURL(file);
    }
  });
}
