PROJECT PLAN - GAMING HANDHELD SHOWROOM
=========================================

PROJECT OVERVIEW
----------------
Website blog/showroom untuk toko gaming handheld dengan 3D model showcase,
carousel product links, dan hidden admin access.

KEY FEATURES
------------
- 3D Model Showcase (PSP, DS Lite, PS Vita, 3DS, 2DS) dengan ganti warna
- Carousel Product Links ke Shopee/Tokopedia
- Hidden Admin Access via Promo Code + Login Page
- Clean Brick White Theme


PROJECT STRUCTURE
-----------------
project-root/
├── client/                              # Frontend React
│   ├── public/
│   │   └── models/                      # 3D .glb files
│   ├── src/
│   │   ├── assets/                      # Images, fonts, etc
│   │   ├── components/
│   │   │   ├── 3D/
│   │   │   │   └── HandheldShowcase.jsx
│   │   │   ├── carousel/
│   │   │   │   └── ProductCarousel.jsx
│   │   │   ├── admin/
│   │   │   │   ├── AdminPanel.jsx
│   │   │   │   └── ProductForm.jsx
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── login/
│   │   │       └── LoginPage.jsx
│   │   ├── pages/
│   │   │   ├── MainPage.jsx
│   │   │   └── AdminPage.jsx
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── data/
│   │   │   └── dummyProducts.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── .env
│   └── .gitignore
│
└── server/                              # Backend Node.js
    ├── src/
    │   └── server.js
    ├── .env
    ├── package.json
    └── .gitignore


USER FLOW
---------
1. Main Page (/)
User buka website
  ↓
Lihat 3D Showcase (PSP, DS, Vita, 3DS, 2DS)
  ↓
Ganti warna model 3D
  ↓
Scroll → Lihat Carousel Product
  ↓
Setiap card: Nama Product + Tombol Beli (Shopee/Tokopedia)
  ↓
Navbar: [Logo] [PROMO CODE: _______] [REDEEM]

2. Admin Access Flow
Input promo code di navbar "GAMER2026"
  ↓
Klik REDEEM → POST /api/validate-promo
  ↓
Valid? → Redirect ke /login
Invalid? → Toast error
  ↓
Halaman Login (/login)
  ↓
Input Username & Password
  ↓
POST /api/login → Cek di Firestore "admins"
  ↓
Valid? → Generate JWT → Redirect /admin
Invalid? → Toast error
  ↓
Admin Panel (/admin) - Protected
  ↓
Fitur: Tambah Product (Nama wajib, Link opsional)
  ↓
Fitur: List Products + Delete
  ↓
Logout → Hapus JWT → Redirect /

3. Carousel Flow
8 Products per slide
  ↓
[←] [1][2][3][4][5][6][7][8] [→]
  ↓
Next/Prev dengan loop
  ↓
Indicator dots di bawah


API ENDPOINTS
-------------
Method  Endpoint                  Auth     Deskripsi
POST    /api/validate-promo       Public   Validasi promo code
POST    /api/login                Public   Login admin → return JWT
GET     /api/products             Public   Ambil semua products
POST    /api/products             JWT      Tambah product
DELETE  /api/products/:id         JWT      Hapus product


FIRESTORE DATA STRUCTURE
------------------------
Collection: products
{
  id: "auto-generated",
  name: "PSP 3000",                    // Wajib
  shopeeLink: "https://shopee.co.id/...", // Opsional
  tokopediaLink: "https://tokopedia.com/...", // Opsional
  createdAt: timestamp
}
Aturan: Minimal satu link (Shopee/Tokopedia) harus diisi

Collection: admins
{
  id: "auto-generated",
  username: "admin",
  passwordHash: "$2b$10$...",  // bcrypt hash
  createdAt: timestamp
}

Collection: settings
{
  id: "promoCode",
  code: "GAMER2026",
  updatedAt: timestamp
}


DESIGN THEME
------------
Element        | Style
Theme          | Clean Brick White
Background     | White (#FFFFFF)
Primary        | Slate/Gray (#64748B)
Accent         | Warm Brick (#B45309)
Typography     | Inter (Google Fonts)
Cards          | White dengan shadow
Navbar         | White + border bottom
Buttons        | Brick accent + hover


DUMMY PRODUCTS (8 Products)
---------------------------
[
  { id: 1, name: "PSP 3000", shopeeLink: "#", tokopediaLink: "#" },
  { id: 2, name: "PS Vita", shopeeLink: "#", tokopediaLink: "#" },
  { id: 3, name: "DS Lite", shopeeLink: "#", tokopediaLink: "#" },
  { id: 4, name: "Nintendo 3DS", shopeeLink: "#", tokopediaLink: "#" },
  { id: 5, name: "Nintendo 2DS", shopeeLink: "#", tokopediaLink: "#" },
  { id: 6, name: "Nintendo Switch", shopeeLink: "#", tokopediaLink: "#" },
  { id: 7, name: "Steam Deck", shopeeLink: "#", tokopediaLink: "#" },
  { id: 8, name: "ROG Ally", shopeeLink: "#", tokopediaLink: "#" }
]


TECH STACK
----------
Frontend (client/)
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.0",
  "axios": "^1.7.3",
  "framer-motion": "^11.3.21",
  "lucide-react": "^0.438.0",
  "@react-three/fiber": "^8.17.0",
  "@react-three/drei": "^9.109.0",
  "three": "^0.167.0",
  "tailwindcss": "^3.4.3",
  "vite": "^5.2.0"
}

Backend (server/)
{
  "express": "^4.19.2",
  "cors": "^2.8.5",
  "jsonwebtoken": "^9.0.2",
  "bcrypt": "^5.1.1",
  "firebase-admin": "^12.3.0",
  "dotenv": "^16.4.5",
  "express-rate-limit": "^7.4.0"
}


ENVIRONMENT VARIABLES
---------------------
client/.env
VITE_API_URL=http://localhost:5000/api

server/.env
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
PROMO_CODE=GAMER2026

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email


FEATURE LIST
------------
Frontend:
- [ ] 3D Showcase dengan React Three Fiber
- [ ] Ganti warna model 3D (real-time)
- [ ] Carousel 8 products/slide (next/prev/loop)
- [ ] Navbar dengan promo code form
- [ ] Login page terpisah (/login)
- [ ] Admin page protected (/admin)
- [ ] JWT authentication dengan Axios interceptor
- [ ] Clean brick white theme
- [ ] Responsive design

Backend:
- [ ] JWT authentication
- [ ] Rate limiting (5 attempts/15 menit)
- [ ] Bcrypt password hashing
- [ ] Firebase Firestore integration
- [ ] Multi-admin support
- [ ] CRUD products
- [ ] Validasi minimal satu link

Security:
- [ ] Promo code static di .env
- [ ] Admin credentials di Firestore
- [ ] JWT expires in 24 hours
- [ ] Rate limiting
- [ ] Protected routes


DEPLOYMENT PLAN
---------------
Service    | Untuk
Vercel     | Frontend + Backend (serverless)
Firebase   | Firestore Database

Vercel Setup:
1. Hubungkan repository GitHub ke Vercel
2. Set environment variables di Vercel dashboard
3. Deploy otomatis setiap push ke main branch


NOTES
-----
3D Models:
- Format: .glb (GLTF binary)
- Letakkan di: client/public/models/
- Sementara: pakai geometry shapes (box/sphere)

Initial Admin Setup (jalankan sekali di Firebase Console):
{
  username: "admin",
  passwordHash: bcrypt.hashSync("admin123", 10),
  createdAt: new Date()
}

Product Validation:
- Nama produk: Wajib
- Link Shopee: Opsional
- Link Tokopedia: Opsional
- Minimal salah satu link harus diisi


DEVELOPMENT PHASES
------------------
Phase 1: Frontend (Client)
- [ ] Setup Vite + React + Tailwind
- [ ] Create components (Navbar, Footer)
- [ ] Create pages (MainPage, LoginPage, AdminPage)
- [ ] Implement 3D Showcase (simple geometry)
- [ ] Implement Carousel with dummy data
- [ ] Implement Promo Code form in Navbar
- [ ] Implement routing

Phase 2: Backend (Server)
- [ ] Setup Express + Firebase Admin
- [ ] Implement JWT authentication
- [ ] Implement CRUD products
- [ ] Implement login with bcrypt
- [ ] Implement rate limiting

Phase 3: Integration
- [ ] Connect frontend to API
- [ ] Implement protected routes
- [ ] Implement JWT interceptor
- [ ] Testing

Phase 4: Deployment
- [ ] Deploy to Vercel
- [ ] Setup Firebase
- [ ] Environment variables
- [ ] Production testing


Status: Planning Phase
Last Updated: 2026-08-06
