# E-commerce Application

A small Node.js/Express sample e-commerce app for managing and viewing items and categories.

## Features
- Serve static frontend in `public/` and simple HTML views in `views/`
- JSON APIs for items, categories and published store items
- Add new items with optional image upload (Cloudinary)

## Prerequisites
- Node.js (v14+ recommended)

## Install
```bash
npm install
```

## Run
```bash
npm start
# or: node server.js
```

The server listens on `PORT` environment variable or defaults to `8080`.

## Important Files
- `server.js` — main Express server and route definitions
- `store-service.js` — data/service layer reading `data/` (items & categories)
- `data/` — contains `items.json` and `categories.json`
- `views/` — HTML pages (`about.html`, `addItem.html`)
- `public/` — static assets (CSS, images)

## API Endpoints
- `GET /` — redirects to `/about`
- `GET /about` — About page
- `GET /store` — returns published items (JSON)
- `GET /items` — returns all items (JSON); supports queries:
  - `?category=...` — filter by category
  - `?minDate=YYYY-MM-DD` — filter by min date
- `GET /item/:id` — returns a single item by id (JSON)
- `GET /categories` — returns list of categories (JSON)
- `GET /items/add` — form page to add a new item
- `POST /items/add` — submit a new item (supports multipart file `featureImage`)

## Image Uploads
This project uses Cloudinary for image uploads (see `server.js`). To use your own Cloudinary account, set Cloudinary credentials in `server.js` or update the code to read from environment variables.

## Development Notes
- Dependencies are listed in `package.json` (Express, multer, cloudinary, sequelize, pg, etc.)
- Data is currently stored in JSON files under `data/` which `store-service.js` reads.

## License
This project is provided as-is.
