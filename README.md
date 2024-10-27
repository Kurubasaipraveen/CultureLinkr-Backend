This project is a simple Node.js/Express API that calculates the total value of products based on the price and quantity of each product. It uses SQLite as an in-memory database to store product information temporarily.

Install dependencies:

Git clone https://github.com/Kurubasaipraveen/CultureLinkr-Backend
npm install
npm start

The server will start on http://localhost:3003.


API Endpoints
POST /api/products/total-value
Calculate the total value of the products provided in the request body.

URL: http://localhost:3003/api/products/total-value

Method: POST

Headers:

Content-Type: application/json

{
  "products": [
    { "name": "Laptop", "price": 1000, "quantity": 2 },
    { "name": "Phone", "price": 500, "quantity": 3 },
    { "name": "Tablet", "price": 300, "quantity": 4 }
  ]
}

success:
{
  "totalValue": 3800
}

error:
{
  "error": "Invalid input, expected an array of products."
}
