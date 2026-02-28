// RetailConnect - Product Data
// Load from localStorage or use defaults
const PRODUCTS_KEY = 'retailconnect_products';

function getProducts() {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.warn('Invalid products in localStorage');
    }
  }
  return [
    {
      id: 1,
      name: "Samsung Galaxy A54",
      price: 1800,
      category: "electronics",
      img: "https://images.unsplash.com/photo-1626509774838-016e2db7a01e?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      price: 5200,
      category: "electronics",
      img: "https://images.unsplash.com/photo-1562375483-3bf27db2026d?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Nike Air Max 270",
      price: 800,
      category: "fashion",
      img: "https://images.unsplash.com/photo-1612817151739-ce82dfcff308?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Adidas Hoodie",
      price: 450,
      category: "fashion",
      img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      name: "Rice – 10kg",
      price: 220,
      category: "groceries",
      img: "https://images.unsplash.com/photo-1607262602131-b9f0de7c85c8?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      name: "Organic Fresh Apples (1kg)",
      price: 30,
      category: "groceries",
      img: "https://images.unsplash.com/photo-1574226516831-e1dff420e38e?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 7,
      name: "Smart Watch Series X",
      price: 299.99,
      category: "electronics",
      img: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 8,
      name: "Bluetooth Earbuds",
      price: 120,
      category: "electronics",
      img: "https://images.unsplash.com/photo-1585386959984-a4155227c8f5?auto=format&fit=crop&w=400&q=80"
    }
  ];
}

function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

// Expose products as mutable array for backward compatibility
let products = getProducts();

function syncProducts() {
  products = getProducts();
}
