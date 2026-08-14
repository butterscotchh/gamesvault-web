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
│   │   └── images/                      # Product images
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js                # ✅ Axios + JWT interceptor
│   │   ├── assets/                      # 📁 Kosong
│   │   ├── components/
│   │   │   ├── 3D/
│   │   │   │   ├── HandheldShowcase.jsx    # ✅ DONE (CP-3)
│   │   │   │   └── DeviceModel.jsx         # ✅ DONE (CP-3)
│   │   │   ├── carousel/
│   │   │   │   ├── ProductCarousel.jsx    # ✅ DONE (CP-4)
│   │   │   │   └── ProductCard.jsx        # ✅ DONE (CP-4)
│   │   │   ├── admin/                     # ⏳ BELUM (CP-6)
│   │   │   │   ├── AdminPanel.jsx
│   │   │   │   └── ProductForm.jsx
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx             # ✅ DONE (CP-2)
│   │   │   │   ├── Footer.jsx             # ✅ DONE (CP-2)
│   │   │   │   └── ColorPicker.jsx        # ✅ DONE (CP-3)
│   │   │   └── login/
│   │   │       └── LoginPage.jsx          # ✅ DONE (CP-5)
│   │   ├── context/
│   │   │   └── AuthContext.jsx            # ✅ DONE
│   │   ├── data/
│   │   │   └── dummyProducts.js           # ✅ DONE (CP-4)
│   │   ├── pages/
│   │   │   ├── MainPage.jsx               # ✅ DONE (Hero + 3D + Carousel)
│   │   │   └── AdminPage.jsx              # ⏳ BELUM (CP-6)
│   │   ├── App.jsx                        # ✅ DONE
│   │   ├── main.jsx                       # ✅ DONE
│   │   └── index.css                      # ✅ CLEAN
│   ├── index.html
│   ├── package.json                       # ✅ DONE
│   ├── vite.config.js                     # ✅ DONE
│   ├── tailwind.config.js                 # ✅ DONE
│   ├── postcss.config.js                  # ✅ DONE
│   └── .env                               # ✅ DONE
│
└── server/                                # ⏳ BELUM (CP-7)
    ├── src/
    │   └── server.js
    ├── .env
    └── package.json


USER FLOW
---------
1. Main Page (/)
User buka website
  ↓
Hero Section (judul + tagline)
  ↓
3D Showcase (5 device dengan color picker)
  ↓
Scroll → Lihat Product Carousel
  ↓
Setiap card: Nama Product + Tombol Shopee/Tokopedia (dinamis sesuai link)
  ↓
Navbar: [Logo] [PROMO CODE: _______] [REDEEM] [Logout]

2. Admin Access Flow (HIDDEN)
Input promo code di navbar "GAMER2026" (dummy)
  ↓
Klik REDEEM → Validasi (sementara di frontend)
  ↓
Valid? → Redirect ke /login
Invalid? → Toast error
  ↓
Halaman Login (/login) - TIDAK ADA TOMBOL LOGIN DI NAVBAR
  ↓
Input Username & Password (dummy: admin/admin123)
  ↓
Valid? → Redirect ke /admin
Invalid? → Toast error
  ↓
Admin Panel (/admin) - Protected
  ↓
Fitur: Tambah Product (Nama, Gambar, Link Shopee/Tokopedia)
  ↓
Fitur: List Products + Delete
  ↓
Logout → Redirect ke /

3. Carousel Flow
4 Products per slide (grid 2x2 mobile, 4x1 desktop)
  ↓
[←] [1][2][3][4] [→]
  ↓
Next/Prev dengan loop
  ↓
Auto-slide setiap 5 detik
  ↓
Indicator dots di bawah


API ENDPOINTS (RENCANA)
-----------------------
Method  Endpoint                  Auth     Deskripsi
POST    /api/validate-promo       Public   Validasi promo code
POST    /api/login                Public   Login admin → return JWT
GET     /api/products             Public   Ambil semua products
POST    /api/products             JWT      Tambah product
DELETE  /api/products/:id         JWT      Hapus product


FIRESTORE DATA STRUCTURE (RENCANA)
----------------------------------
Collection: products
{
  id: "auto-generated",
  name: "PSP 3000",                    // Wajib
  imageUrl: "https://firebase...",      // Wajib
  shopeeLink: "https://...",            // Opsional
  tokopediaLink: "https://...",         // Opsional
  createdAt: timestamp
}
Aturan: Minimal satu link harus diisi

Collection: admins
{
  id: "auto-generated",
  username: "admin",
  passwordHash: "$2b$10$...",
  createdAt: timestamp
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


TECH STACK
----------
Frontend:
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion
- Lucide React
- React Hot Toast
- React Three Fiber + Three.js ✅

Backend (RENCANA):
- Node.js + Express
- JWT
- Bcrypt
- Firebase Admin SDK
- Express Rate Limit


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


PROGRESS STATUS
---------------
CP-1: Setup Project                    ✅ DONE
CP-2: Navbar + Footer                  ✅ DONE
CP-3: 3D Showcase + Color Picker       ✅ DONE
CP-4: Product Carousel                 ✅ DONE
CP-5: Login Page (dummy auth)          ✅ DONE
CP-6: Admin Panel                      ⏳ BELUM (NEXT)
CP-7: Backend + Firebase               ⏳ BELUM
CP-8: Polish + Deploy                  ⏳ BELUM


FEATURE LIST
------------
Frontend:
- [x] Setup Project (CP-1)
- [x] Navbar + Footer + Promo Code Form (CP-2)
- [x] 3D Showcase + Color Picker (CP-3)
- [x] Product Carousel 4/slide (CP-4)
- [x] Login Page (CP-5) - DUMMY AUTH
- [ ] Admin Panel + Upload Gambar (CP-6)
- [ ] Polish + Deploy (CP-8)

Backend (RENCANA):
- [ ] JWT authentication (CP-7)
- [ ] Firebase Firestore integration (CP-7)
- [ ] CRUD products with upload (CP-7)

Security:
- [ ] Promo code static di .env
- [ ] Admin credentials di Firestore
- [ ] JWT expires in 24 hours


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
- Sementara: pakai geometry shapes (box/sphere) - SUDAH JALAN

Login Credentials (DUMMY - CP-5):
- Username: admin
- Password: admin123

Promo Code (DUMMY):
- Kode: GAMER2026

Product Validation:
- Nama produk: Wajib
- Link Shopee: Opsional
- Link Tokopedia: Opsional
- Minimal salah satu link harus diisi


DEVELOPMENT PHASES
------------------
Phase 1: Frontend (Client) - ✅ 80% DONE
- [x] Setup Vite + React + Tailwind (CP-1)
- [x] Navbar + Footer (CP-2)
- [x] 3D Showcase + Color Picker (CP-3)
- [x] Product Carousel (CP-4)
- [x] Login Page (CP-5)
- [ ] Admin Panel (CP-6)

Phase 2: Backend (Server) - ⏳ BELUM
- [ ] Setup Express + Firebase Admin (CP-7)
- [ ] JWT authentication (CP-7)
- [ ] CRUD products (CP-7)

Phase 3: Integration - ⏳ BELUM
- [ ] Connect frontend to API (CP-7)
- [ ] Protected routes (CP-7)

Phase 4: Deployment - ⏳ BELUM
- [ ] Deploy to Vercel (CP-8)
- [ ] Setup Firebase (CP-8)


Status: Development (CP-5 Done, CP-6 Next)
Last Updated: 2026-08-14
