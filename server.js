const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory Database for Food Items
const foodMenu = [
  { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'Pizza', image: '🍕' },
  { id: 2, name: 'Classic Cheeseburger', price: 8.99, category: 'Burgers', image: '🍔' },
  { id: 3, name: 'Sushi Roll Set', price: 15.49, category: 'Japanese', image: '🍱' },
  { id: 4, name: 'Creamy Pasta Alfredo', price: 11.25, category: 'Italian', image: '🍝' },
  { id: 5, name: 'Chocolate Fudge Cake', price: 5.50, category: 'Dessert', image: '🍰' }
];

// In-memory Database for Orders
const orders = [];

// API Endpoint: Get Food Menu
app.get('/api/menu', (req, res) => {
  res.json({ success: true, menu: foodMenu });
});

// API Endpoint: Place Food Order
app.post('/api/orders', (req, res) => {
  const { items, totalAmount, customerName } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Order items cannot be empty.' });
  }

  const newOrder = {
    orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
    customerName: customerName || 'Guest User',
    items,
    totalAmount,
    status: 'Preparing',
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);
  console.log(`[ORDER CREATED] ${newOrder.orderId} - Amount: $${totalAmount}`);

  res.status(201).json({
    success: true,
    message: 'Order placed successfully!',
    order: newOrder
  });
});

// Health check endpoint for Docker/Jenkins monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Food Delivery Server running on http://localhost:${PORT}`);
});