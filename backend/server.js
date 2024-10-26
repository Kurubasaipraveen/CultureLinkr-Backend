const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.json()); // Middleware  parse JSON bodies

// Initialize SQLite database
const db = new sqlite3.Database(':memory:'); // Using this  in-memory database for demonstration

// Creating a Products table (for demonstration purposes)
db.serialize(() => {
  db.run(`CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL
  )`);
});

// API endpoint to receive a list of products and return the total value
app.post('/api/products/total-value', (req, res) => {
    console.log(req.body); // Log the request body for debugging
    const products = req.body.products; // Expecting an array of products
  
    // Log the received products
    console.log('Received products:', products);
  
    // Check if products is an array
    if (!Array.isArray(products)) {
      return res.status(400).json({ error: 'Invalid input, expected an array of products.' });
    }
  
    let totalValue = 0;
  
    // Insert products into the database and calculate total value
    const insertStmt = db.prepare(`INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)`);
    
    products.forEach(product => {
      const { name, price, quantity } = product;
  
      // Validate product fields
      if (!name || typeof price !== 'number' || typeof quantity !== 'number') {
        return res.status(400).json({ error: 'Invalid product data' });
      }
  
      // Insert each product into the database
      insertStmt.run(name, price, quantity);
  
      // Calculate total value
      totalValue += price * quantity;
    });
  
    insertStmt.finalize();
  
    // Send total value as response
    res.json({ totalValue });
  });
  

// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
