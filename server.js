// Comment: Express backend server serving static frontend files and API routes
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Serve static frontend assets from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Health Check Endpoint for CI/CD Tests
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});