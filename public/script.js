// Sample Data with Categories: main, full-plate, beverage
const menuItems = [
  { id: 1, name: "Special Thali Full Plate", category: "full-plate", price: 12.99, img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80" },
  { id: 2, name: "Paneer Butter Masala", category: "main", price: 9.99, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80" },
  { id: 3, name: "Full Chicken Biryani Plate", category: "full-plate", price: 14.49, img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80" },
  { id: 4, name: "Chilled Mango Lassi", category: "beverage", price: 3.99, img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=500&q=80" },
  { id: 5, name: "Dal Makhani", category: "main", price: 8.49, img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=500&q=80" },
  { id: 6, name: "Iced Cold Coffee", category: "beverage", price: 4.49, img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80" }
];

let cart = [];

// Render Menu Items
function renderMenu(filter = 'all') {
  const container = document.getElementById('menu-container');
  container.innerHTML = '';

  const itemsToDisplay = filter === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === filter);

  itemsToDisplay.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="card-img">
      <div class="card-body">
        <h3>${item.name}</h3>
        <div class="card-footer">
          <span class="price">$${item.price.toFixed(2)}</span>
          <button class="btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Category Filter Switch
function filterMenu(category) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  renderMenu(category);
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
        <span>$${item.price.toFixed(2)}</span>
      </div>
    `).join('');
  }

  document.getElementById('cart-total').innerText = total.toFixed(2);
}

// Delivery Selector
function selectDelivery(element, type) {
  document.querySelectorAll('.delivery-card').forEach(card => card.classList.remove('selected'));
  element.classList.add('selected');
}

// Modal Handlers
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
  if(cart.length === 0) return alert("Your cart is empty!");
  alert("Order placed successfully!");
  cart = [];
  updateCartUI();
  toggleCartModal();
}

// Initial Render
renderMenu();