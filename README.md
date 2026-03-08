# E-commerce Web Application

A simple **Node.js and Express-based e-commerce web application** that allows users to browse store items, explore categories, and add new products with image uploads.

This project demonstrates backend development concepts such as **REST APIs, server-side routing, file uploads, and JSON-based data storage**.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

# Project Overview

This application simulates a small **online store backend** where users can:

- Browse available products
- Filter items by category or date
- Add new store items
- Upload product images
- Access product data through REST API endpoints

The project uses **JSON files as lightweight data storage** instead of a database, making it easy to run locally.

---

# Features

- Product listing page (`/shop`)
- Add new store items
- Image upload using **Cloudinary**
- RESTful API endpoints
- Category-based filtering
- Date filtering for products
- Static frontend pages served with Express
- JSON-based data storage

---

# Technologies Used

### Backend
- **Node.js**
- **Express.js**

### File Upload
- **Multer**

### Image Hosting
- **Cloudinary**

### Data Storage
- **JSON files**

### Other Libraries
- Streamifier

---

# Project Structure

```
ecommerceApp
│
├── server.js
├── store-service.js
├── package.json
│
├── data
│   ├── items.json
│   └── categories.json
│
├── views
│   ├── about.html
│   └── addItem.html
│
└── public
    ├── css
    │   └── main.css
```

---

# Installation

### 1 Clone the repository

```
git clone https://github.com/YOUR_USERNAME/ecommerceApp.git
cd ecommerceApp
```

### 2 Install dependencies

```
npm install
```

---

# Running the Application

Start the server:

```
npm start
```

or

```
node server.js
```

The application will run at:

```
http://localhost:8080
```

---

# Application Pages

| Page | Description |
|-----|-----|
| `/about` | Project overview page |
| `/shop` | Browse available store items |
| `/items/add` | Add new products |

---

# API Endpoints

| Method | Endpoint | Description |
|------|------|------|
| GET | `/store` | Returns published store items |
| GET | `/items` | Returns all items |
| GET | `/item/:id` | Returns item by ID |
| GET | `/categories` | Returns available categories |

Query parameters supported:

```
/items?category=...
/items?minDate=YYYY-MM-DD
```

---

# Data Storage

The application uses **JSON files as local storage**:

```
data/items.json
data/categories.json
```

New items added through the application are saved directly into `items.json`.

---

# Future Improvements

Possible upgrades for this project include:

- Add user authentication
- Implement a shopping cart system
- Connect to a real database (MongoDB / PostgreSQL)
- Build a modern frontend using React
- Deploy the application to a cloud platform

---

# Author

**Juhi Bhandari**

Computer Programming Graduate  
Toronto, Canada