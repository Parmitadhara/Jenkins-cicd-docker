// Famous Indian Restaurants & Brands Dataset
const restaurants = [
  { id: 101, name: "McDonald's", time: "20 min", location: "Kota", cuisine: "Fast Food", diet: "non-veg", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80" },
  { id: 102, name: "Burger King", time: "25 min", location: "Kota", cuisine: "Fast Food", diet: "non-veg", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" },
  { id: 103, name: "Domino's Pizza", time: "20 min", location: "Kota", cuisine: "Pizza", diet: "veg", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80" },
  { id: 104, name: "La Pino's Pizza", time: "22 min", location: "Kota", cuisine: "Pizza", diet: "veg", img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=500&q=80" },
  { id: 105, name: "Rominus Pizza And Burger", time: "23 min", location: "Kota", cuisine: "Fast Food", diet: "non-veg", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80" },
  { id: 106, name: "Burger Farm", time: "18 min", location: "Kota", cuisine: "Fast Food", diet: "non-veg", img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=500&q=80" },
  { id: 107, name: "Kanha Sweets & Restaurant", time: "25 min", location: "Kota", cuisine: "North Indian", diet: "veg", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80" },
  { id: 108, name: "Agarwal Caterers", time: "20 min", location: "Kota", cuisine: "North Indian", diet: "veg", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=500&q=80" },
  { id: 109, name: "Brown Sugar", time: "15 min", location: "Kota", cuisine: "Chinese", diet: "veg", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80" },
  { id: 110, name: "Bakingo", time: "20 min", location: "Kota", cuisine: "Fast Food", diet: "veg", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80" },
  { id: 111, name: "Harishankar Veg Restro", time: "22 min", location: "Kota", cuisine: "North Indian", diet: "veg", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80" }
];

// Sample Menu Items
const menuItems = [
  { id: 1, name: "Special Thali Full Plate", category: "full-plate", cuisine: "North Indian", diet: "veg", price: 220, img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80" },
  { id: 2, name: "Paneer Butter Masala", category: "main-course", cuisine: "North Indian", diet: "veg", price: 180, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80" },
  { id: 3, name: "Full Chicken Biryani Plate", category: "full-plate", cuisine: "North Indian", diet: "non-veg", price: 280, img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80" },
  { id: 4, name: "Masala Dosa", category: "dine-out", cuisine: "South Indian", diet: "veg", price: 120, img: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=500&q=80" },
  { id: 5, name: "Gulab Jamun (4 Pcs)", category: "sweets", cuisine: "North Indian", diet: "veg", price: 90, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80" },
  { id: 6, name: "Cold Coffee Shake", category: "beverage", cuisine: "Fast Food", diet: "veg", price: 110, img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80" }
];

let cart = [];
let currentLocation = "Kota";

// Render Restaurants
function renderBrands(items) {
  const container = document.getElementById('brands-container');
  container.innerHTML = '';

  if (items.length === 0) {
    container.innerHTML = `<p>No restaurants found for the selected filters.</p>`;
    return;
  }

  items.forEach(brand => {
    const card = document.createElement('div');
    card.className = 'brand-card';
    card.innerHTML = `
      <img src="${brand.img}" alt="${brand.name}" class="brand-img">
      <div class="brand-details">
        <h3>${brand.name}</h3>
        <p style="font-size: 0.85rem; color: #718093;">${brand.cuisine} • ${brand.diet === 'veg' ? '🟢 Pure Veg' : '🔴 Veg & Non-Veg'}</p>
        <span class="brand-time">⏱️ ${brand.time}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// Render Food Items
function renderMenu(items) {
  const container = document.getElementById('menu-container');
  container.innerHTML = '';

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="card-img">
      <div class="card-body">
        <h3>${item.name} <span class="${item.diet === 'veg' ? 'badge-veg' : 'badge-nonveg'}">${item.diet === 'veg' ? '🟢' : '🔴'}</span></h3>
        <p style="font-size: 0.85rem; color: #718093;">${item.cuisine}</p>
        <div class="card-footer">
          <span class="price">₹${item.price}</span>
          <button class="btn-primary" onclick="addToCart(${item.id})">Add</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Location Change
function changeLocation(loc) {
  currentLocation = loc;
  document.querySelectorAll('.loc-highlight, #current-location-text').forEach(el => el.innerText = loc);
  applyFilters();
}

// Apply Combined Filters (Diet, Category, Cuisine)
function applyFilters() {
  const diet = document.getElementById('diet-filter').value;
  const category = document.getElementById('category-filter').value;
  const cuisine = document.getElementById('cuisine-filter').value;

  // Filter Brands
  let filteredBrands = restaurants.filter(b => b.location === currentLocation || currentLocation === "Kota");
  if (diet !== 'all') filteredBrands = filteredBrands.filter(b => b.diet === diet);
  if (cuisine !== 'all') filteredBrands = filteredBrands.filter(b => b.cuisine === cuisine);
  renderBrands(filteredBrands);

  // Filter Dishes
  let filteredMenu = menuItems;
  if (diet !== 'all') filteredMenu = filteredMenu.filter(m => m.diet === diet);
  if (category !== 'all') filteredMenu = filteredMenu.filter(m => m.category === category);
  if (cuisine !== 'all') filteredMenu = filteredMenu.filter(m => m.cuisine === cuisine);
  renderMenu(filteredMenu);
}

// Cart Functionality
function addToCart(id) {
  const item = menuItems.find(p => p.id === id);
  cart.push(item);
  updateCartUI();
}

function updateCartUI() {
  document.getElementById('cart-count').innerText = cart.length;
  const list = document.getElementById('cart-items-list');
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    list.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    list.innerHTML = cart.map(item => `
      <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
        <span>${item.name}</span>
        <span>₹${item.price}</span>
      </div>
    `).join('');
  }

  document.getElementById('cart-total').innerText = total.toFixed(2);
}

// Modals
function openLoginModal() { document.getElementById('login-modal').style.display = 'flex'; }
function closeLoginModal() { document.getElementById('login-modal').style.display = 'none'; }
function toggleCartModal() { 
  const modal = document.getElementById('cart-modal');
  modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function handleLogin(e) {
  e.preventDefault();
  alert('Logged in successfully!');
  closeLoginModal();
}

function checkout() {
  if (cart.length === 0) return alert("Your cart is empty!");
  alert(`Order placed successfully for ${currentLocation}!`);
  cart = [];
  updateCartUI();
  toggleCartModal();
}

// Initial Load
applyFilters();