# Games Vault Web Showroom

A web-based gaming handheld showroom built to showcase classic handheld consoles through an interactive 3D experience and product carousel.

The website combines a clean cream and monochrome visual style with 3D device previews, product links, and a hidden admin system for managing the products displayed on the showroom.

---

# Project Overview

This project is a gaming handheld showroom website featuring:

- PSP
- Nintendo DS Lite
- PS Vita
- Nintendo 3DS
- Nintendo 2DS

Users can explore the devices through an interactive 3D showcase, change device colors, and browse available products through the product carousel.

The project also includes a hidden admin access system that allows authorized users to manage products stored in Firebase Firestore.

---

# Main Features

- Interactive 3D Handheld Showcase
- Device Color Picker
- Product Carousel
- Shopee Product Links
- Tokopedia Product Links
- Product SOLD Status
- Hidden Admin Access
- JWT Authentication
- Admin Product Management
- Add, Edit, and Delete Products
- Admin Account Settings
- Responsive Design
- Loading States
- Toast Notifications
- Protected Admin Routes
- Rate Limiting
- Input Validation
- Firebase Firestore Integration

---

# Preview Demo

## 1. Main Page

![Main Page](./screenshots/main-page.png)

## 2. 3D Handheld Showcase

![3D Showcase](./screenshots/3d-showcase.png)

## 3. Color Picker

![Color Picker](./screenshots/color-picker.png)

## 4. Product Carousel

![Product Carousel](./screenshots/product-carousel.png)

## 5. Login Page

![Login Page](./screenshots/login.png)

## 6. Admin Panel

![Admin Panel](./screenshots/admin-panel.png)

## 7. Product Management

![Product Management](./screenshots/product-management.png)

## 8. Admin Settings

![Admin Settings](./screenshots/admin-settings.png)

---

# User Flow

## Main Page

```text
User opens website
        ↓
Hero Section
        ↓
3D Handheld Showcase
        ↓
Select Device
        ↓
Change Device Color
        ↓
Scroll Down
        ↓
Product Carousel
        ↓
Open Shopee / Tokopedia Product Link
```

## Hidden Admin Access

The admin area is intentionally hidden from the normal navigation.

```text
Promo Code Input
        ↓
Validate Promo Code
        ↓
Check JWT Token
        ↓
┌───────────────┐
│               │
Valid Token   No Valid Token
│               │
↓               ↓
/admin         /login
```

If the promo code is invalid, the system displays an error notification.

After successful admin login:

```text
Login Page
    ↓
Verify Credentials
    ↓
Generate JWT
    ↓
/admin
    ↓
Protected Admin Panel
```

## Admin Product Management

```text
Admin Panel
    ↓
Add Product
    ↓
Product Name
Product Image
Shopee Link
Tokopedia Link
    ↓
Save to Firestore
```

Administrators can also edit, delete, and manage existing products.

---

# Product Carousel

The product carousel displays four products per slide on desktop and a 2x2 layout on mobile.

```text
[←] [1] [2] [3] [4] [→]
```

Features:

- Manual next and previous controls
- Page indicators
- Indicator dots
- Auto-slide disabled
- Responsive layout
- Dynamic product data from Firestore

Each product card can display:

- Product name
- Product image
- SOLD status
- Shopee button
- Tokopedia button

Marketplace buttons are displayed dynamically depending on the available product links.

---

# Project Structure

```text
project-root/
│
├── client/
│   ├── public/
│   │   ├── images/
│   │   └── models/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js
│   │   │   └── firebase.js
│   │   │
│   │   ├── assets/
│   │   │   ├── logo.png
│   │   │   ├── shopee.png
│   │   │   ├── tokped.png
│   │   │   └── sigils/
│   │   │
│   │   ├── components/
│   │   │   ├── 3D/
│   │   │   │   ├── HandheldShowcase.jsx
│   │   │   │   └── DeviceModel.jsx
│   │   │   │
│   │   │   ├── carousel/
│   │   │   │   ├── ProductCarousel.jsx
│   │   │   │   └── ProductCard.jsx
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── AdminPanel.jsx
│   │   │   │   └── ProductForm.jsx
│   │   │   │
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── ColorPicker.jsx
│   │   │   │
│   │   │   └── login/
│   │   │       └── LoginPage.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── MainPage.jsx
│   │   │   ├── AdminPage.jsx
│   │   │   └── AdminSettings.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
│
├── server/
│   ├── src/
│   │   ├── server.js
│   │   ├── firebase.js
│   │   └── logger.js
│   │
│   ├── logs/
│   ├── package.json
│   ├── seed-admin.js
│   ├── add-admin.js
│   └── .env.example
│
└── README.md
```

---

# Tech Stack

## Frontend

- React 18.2.0
- Vite 5.0.8
- Tailwind CSS 3.4.0
- React Router DOM 6.22.0
- Axios 1.6.7
- Lucide React 0.344.0
- React Hot Toast 2.4.1
- React Three Fiber 8.15.0
- React Three Drei 9.88.0
- Three.js 0.160.0
- jwt-decode 4.0.0

## Backend

- Node.js
- Express 4.19.2
- JSON Web Token 9.0.2
- Bcrypt 5.1.1
- Firebase Admin SDK 12.3.0
- CORS 2.8.5
- Dotenv 16.4.5
- Express Rate Limit 7.4.0
- Express Validator 7.2.0
- Winston 3.17.0

## Database

- Firebase Firestore

## Deployment

- Vercel

---

# API Endpoints

## Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/validate-promo` | Public | Validate promo access |
| POST | `/api/login` | Public | Admin login and JWT generation |
| GET | `/api/health` | Public | Server health check |

## Products

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | Public | Get all products |
| GET | `/api/products/:id` | Public | Get product by ID |
| POST | `/api/products` | JWT | Add product |
| PUT | `/api/products/:id` | JWT | Update product |
| DELETE | `/api/products/:id` | JWT | Delete product |

## Admin

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| PUT | `/api/admin/settings` | JWT | Update admin username and password |

---

# Firestore Data Structure

## Products

The `products` collection stores the products displayed in the showroom.

```text
products
│
├── id
├── name
├── image
├── shopeeLink
├── tokopediaLink
├── isSold
└── createdAt
```

Product validation:

- Product name is required
- Product image URL is required
- Shopee link is optional
- Tokopedia link is optional
- At least one marketplace link must be provided
- `isSold` defaults to false

## Admins

The `admins` collection stores administrator accounts.

```text
admins
│
├── id
├── username
├── passwordHash
└── createdAt
```

Admin passwords are stored using bcrypt hashing.

---

# 3D Showcase

The website includes an interactive 3D showcase for:

- PSP
- Nintendo DS Lite
- PS Vita
- Nintendo 3DS
- Nintendo 2DS

The showcase supports changing device colors through the color picker.

3D models use the `.glb` format and can be placed inside:

```text
client/public/models/
```

The current implementation can also use geometry-based placeholder models before the final `.glb` models are added.

---


# Security

The project includes several security improvements for the backend and admin system.

- Rate limiting
- Input validation
- JWT secret validation
- CORS restriction
- Non-verbose error messages
- Winston logging
- JWT decode and auto-logout
- Axios 401 interceptor
- No hardcoded credentials
- Bcrypt password hashing with 12 salt rounds
- Protected admin routes
- JWT expiration
- Public API separated from protected API
- Automatic logout when JWT expires

Sensitive configuration values are stored using environment variables and should not be committed to the repository.

---

# Environment Variables

Create your own environment files locally.

## Client

Create:

```text
client/.env
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

## Server

Create:

```text
server/.env
```

Example:

```env
PORT=5000
JWT_SECRET=your_random_secret
PROMO_CODE=your_promo_code
LOG_LEVEL=info

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_STORAGE_BUCKET=your_storage_bucket
```

Do not commit actual environment files, Firebase private keys, JWT secrets, admin credentials, or other sensitive configuration to GitHub.

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/your-repository.git

cd your-repository
```

## 2. Backend Setup

```bash
cd server

pnpm install
```

Create the server `.env` file and configure the required environment variables.

Run the backend:

```bash
pnpm dev
```

The backend will run on:

```text
http://localhost:5000
```

## 3. Frontend Setup

Open another terminal:

```bash
cd client

pnpm install
```

Create:

```text
client/.env
```

Configure the API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
pnpm dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---


# Future Improvements

- Add detailed `.glb` models for all handheld devices
- Add more gaming handheld devices
- Improve 3D interactions
- Add product search
- Add product filtering
- Add product categories
- Add more marketplace integrations
- Improve admin dashboard
- Add additional showroom sections

---

# Disclaimer

This project is an independent web development project.

Product names, console names, logos, trademarks, marketplace names, and other brand assets belong to their respective owners.

This project is not affiliated with, sponsored by, or officially endorsed by Sony, Nintendo, Shopee, Tokopedia, or any other mentioned brand.

Product information and marketplace links are provided for demonstration purposes.

---

# License

This repository is shared for educational, learning, portfolio, and development purposes.

You are welcome to study the source code and use the project as a starting point for your own implementation. Modification and further development are encouraged.

Third-party trademarks, logos, product names, and brand assets remain the property of their respective owners and are not included under this permission.

---

## Development Team

Developed by my amazing friends

- Ceryne
- Abthal Akbar
- Francent Jienarta

⭐ If you find this project useful, feel free to leave a star on the repository.