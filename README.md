
# Thrift Store Application with MongoDB

This is a thrift store application that uses MongoDB as the backend database.

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running locally (or a MongoDB Atlas account)

### Backend Setup
1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file in the server directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/thrift-store
   ```
   (Adjust the MongoDB URI if you're using MongoDB Atlas or a different setup)
4. Start the server: `npm run dev`
5. The server will run on port 5000 and automatically seed the database with sample products if empty

### Frontend Setup
1. From the root directory, install dependencies: `npm install`
2. Start the frontend: `npm run dev`
3. The frontend will run on port 8080 (or another port if 8080 is in use)

## Features
- Browse thrift items
- Filter by category, condition, and price range
- Search functionality
- Add items to cart
- Sell items
- View product details

## Technology Stack
- Frontend: React, TypeScript, Tailwind CSS, shadcn/ui
- Backend: Express.js, MongoDB
- Additional libraries: React Router, Lucide Icons

## API Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?q=query` - Search products by name or description
- `POST /api/products` - Create new product
- `GET /api/categories` - Get all product categories
