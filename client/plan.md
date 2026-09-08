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
│   │   ├── images/                      # Product images
│   │   └── models/                      # 3D .glb files (nanti diisi)
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js                # ✅ Axios + JWT interceptor + publicApi
│   │   │   └── firebase.js             # ✅ DONE
│   │   ├── assets/
│   │   │   ├── logo.png                # ✅ Logo
│   │   │   ├── shopee.png              # ✅ Shopee logo
│   │   │   ├── tokped.png              # ✅ Tokopedia logo
│   │   │   └── sigils/                 # ✅ Cyber sigil assets
│   │   ├── components/
│   │   │   ├── 3D/
│   │   │   │   ├── HandheldShowcase.jsx    # ✅ DONE
│   │   │   │   └── DeviceModel.jsx         # ✅ DONE
│   │   │   ├── carousel/
│   │   │   │   ├── ProductCarousel.jsx    # ✅ DONE (auto-slide OFF)
│   │   │   │   └── ProductCard.jsx        # ✅ DONE (dengan SOLD overlay)
│   │   │   ├── admin/
│   │   │   │   ├── AdminPanel.jsx         # ✅ DONE
│   │   │   │   └── ProductForm.jsx        # ✅ DONE
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx             # ✅ DONE (Logo PNG, conditional)
│   │   │   │   ├── Footer.jsx             # ✅ DONE (Logo PNG, socials)
│   │   │   │   └── ColorPicker.jsx        # ✅ DONE
│   │   │   └── login/
│   │   │       └── LoginPage.jsx          # ✅ DONE
│   │   ├── context/
│   │   │   └── AuthContext.jsx            # ✅ DONE (JWT decode + auto-logout)
│   │   ├── pages/
│   │   │   ├── MainPage.jsx               # ✅ DONE
│   │   │   ├── AdminPage.jsx              # ✅ DONE (responsive card view)
│   │   │   └── AdminSettings.jsx          # ✅ DONE
│   │   ├── App.jsx                        # ✅ DONE
│   │   ├── main.jsx                       # ✅ DONE
│   │   └── index.css                      # ✅ DONE
│   ├── index.html
│   ├── package.json                       # ✅ DONE
│   ├── vite.config.js                     # ✅ DONE
│   ├── tailwind.config.js                 # ✅ DONE
│   ├── postcss.config.js                  # ✅ DONE
│   └── .env                               # ✅ DONE
│
└── server/                                # ✅ DONE (CP-7)
    ├── src/
    │   ├── server.js                      # ✅ DONE (Security fixed)
    │   ├── firebase.js                    # ✅ DONE (Security fixed)
    │   └── logger.js                      # ✅ DONE (Winston logging)
    ├── logs/                              # ✅ Auto-generated
    │   ├── error.log
    │   └── combined.log
    ├── .env                               # ✅ DONE
    ├── package.json                       # ✅ DONE
    ├── serviceAccountKey.json             # ✅ DONE
    ├── seed-admin.js                      # ✅ DONE
    └── add-admin.js                       # ✅ DONE


USER FLOW (FINAL)
-----------------
1. Main Page (/)
User buka website
  ↓
Hero Section (judul + tagline + 3 tombol CTA)
  ↓
3D Showcase (5 device dengan color picker)
  ↓
Scroll → Lihat Product Carousel (data dari Firestore)
  ↓
Setiap card: Nama Product + Tombol Shopee/Tokopedia (dinamis sesuai link)
  ↓
Navbar: [Logo] [PROMO CODE: _______] [REDEEM] (hanya di non-admin page)

2. Admin Access Flow (HIDDEN - JWT)
Input promo code di navbar "GAMER2026"
  ↓
Klik REDEEM → POST /api/validate-promo (publicApi)
  ↓
Cek token di localStorage → kalo valid langsung /admin
  ↓
Valid? → Redirect ke /login
Invalid? → Toast error
  ↓
Halaman Login (/login) - TIDAK ADA TOMBOL LOGIN DI NAVBAR
  ↓
Input Username & Password
  ↓
POST /api/login → Cek di Firestore "admins" (bcrypt)
  ↓
Valid? → Generate JWT → Redirect /admin
Invalid? → Toast error
  ↓
Admin Panel (/admin) - Protected (verifyToken)
  ↓
Navbar Admin: [Admin Panel] [Home] [Settings] [Logout]
  ↓
Fitur: Tambah Product (Nama, Gambar URL, Link Shopee/Tokopedia)
  ↓
Fitur: List Products + Edit + Delete (semua ke Firestore)
  ↓
Fitur: Settings (ganti username/password) + back button
  ↓
Logout → Hapus JWT → Redirect /

3. Carousel Flow
4 Products per slide (grid 2x2 mobile, 4x1 desktop)
  ↓
[←] [1][2][3][4] [→]
  ↓
Next/Prev manual (Auto-slide OFF)
  ↓
Indicator dots di bawah


API ENDPOINTS (FINAL)
---------------------
Method  Endpoint                  Auth     Instance   Deskripsi
POST    /api/validate-promo       Public   publicApi  Validasi promo code (rate-limited)
POST    /api/login                Public   publicApi  Login admin → return JWT (rate-limited)
GET     /api/products             Public   publicApi  Ambil semua products
GET     /api/products/:id         Public   publicApi  Ambil product by ID
POST    /api/products             JWT      api        Tambah product (validated)
PUT     /api/products/:id         JWT      api        Update product (validated)
DELETE  /api/products/:id         JWT      api        Hapus product
PUT     /api/admin/settings       JWT      api        Update username/password (validated)
GET     /api/health               Public   -          Health check


SECURITY IMPROVEMENTS (DONE)
----------------------------
- [x] Rate limiting (login, promo, API)
- [x] Input validation (express-validator)
- [x] JWT secret validation (min 16 chars)
- [x] CORS restriction (whitelist domains)
- [x] Error messages (non-verbose)
- [x] Winston logging (error.log + combined.log)
- [x] AuthContext dengan JWT decode + auto-logout
- [x] Axios interceptor (401 auto-logout)
- [x] No hardcoded credentials
- [x] Bcrypt salt rounds (12)


FIRESTORE DATA STRUCTURE (FINAL)
--------------------------------
Collection: products
{
  id: "auto-generated",
  name: "PSP 3000",                    // Wajib
  image: "https://...",                 // Wajib (URL)
  shopeeLink: "https://...",            // Opsional
  tokopediaLink: "https://...",         // Opsional
  isSold: false,                        // Default false
  createdAt: "2026-08-14T..."
}
Aturan: Minimal satu link harus diisi

Collection: admins
{
  id: "auto-generated",
  username: "admin",
  passwordHash: "$2b$12$...",           // bcrypt hash (salt 12)
  createdAt: "2026-08-14T..."
}


DESIGN THEME (FINAL)
--------------------
Element        | Style
Theme          | Clean Cream + Monochrome
Background     | Cream (#e6e1d1)
Primary        | Dark (#040405)
Accent         | Muted (#bfbaa7, #8a7a60)
Typography     | Inter, Orbitron, Press Start 2P
Cards          | Cream dengan shadow
Navbar         | Cream + border
Buttons        | Cream + monochrome hover


TECH STACK (FINAL)
------------------
Frontend:
- React 18.2.0
- Vite 5.0.8
- Tailwind CSS 3.4.0
- React Router DOM 6.22.0
- Axios 1.6.7 (publicApi & interceptor)
- Lucide React 0.344.0
- React Hot Toast 2.4.1
- React Three Fiber 8.15.0
- React Three Drei 9.88.0
- Three.js 0.160.0
- jwt-decode 4.0.0

Backend:
- Node.js (Express 4.19.2)
- JSON Web Token (jsonwebtoken 9.0.2)
- Bcrypt 5.1.1 (password hashing)
- Firebase Admin SDK 12.3.0
- CORS 2.8.5
- Dotenv 16.4.5
- Express Rate Limit 7.4.0
- Express Validator 7.2.0
- Winston 3.17.0

Database:
- Firebase Firestore (NoSQL Cloud Database)

Deployment:
- Vercel (Frontend + Backend Serverless Functions)


ENVIRONMENT VARIABLES (FINAL)
-----------------------------
client/.env
VITE_API_URL=http://localhost:5000/api

server/.env
PORT=5000
JWT_SECRET=[min 16 chars random string]
PROMO_CODE=GAMER2026
LOG_LEVEL=info

# Firebase Admin SDK
FIREBASE_PROJECT_ID=gamesvault-web
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@gamesvault-web.iam.gserviceaccount.com
FIREBASE_STORAGE_BUCKET=gamesvault-web.firebasestorage.app


PROGRESS STATUS (FINAL)
-----------------------
CP-1: Setup Project                    ✅ DONE
CP-2: Navbar + Footer                  ✅ DONE
CP-3: 3D Showcase + Color Picker       ✅ DONE
CP-4: Product Carousel                 ✅ DONE
CP-5: Login Page                       ✅ DONE
CP-6: Admin Panel + CRUD               ✅ DONE
CP-7: Backend + Firebase + JWT         ✅ DONE
CP-8: Polish (Frontend Final Touch)    ✅ DONE
CP-9: Deploy to Vercel                 ⏳ NEXT


FEATURE LIST (FINAL)
--------------------
Frontend:
- [x] Setup Project (CP-1)
- [x] Navbar + Footer + Promo Code Form (CP-2)
- [x] 3D Showcase + Color Picker (CP-3)
- [x] Product Carousel 4/slide (CP-4)
- [x] Login Page (CP-5)
- [x] Admin Panel + CRUD (CP-6)
- [x] Admin Settings (ganti username/password) (CP-7)
- [x] publicApi & protected routes (CP-7)
- [x] Conditional Navbar (admin/home) (CP-7)
- [x] Responsive design (mobile/tablet)
- [x] Loading states (skeleton)
- [x] SOLD overlay on products
- [x] Logo PNG (Navbar + Footer)
- [x] Shopee/Tokopedia buttons with logos
- [x] Cream monochrome theme
- [x] JWT auto-logout on expired token

Backend:
- [x] Express server (CP-7)
- [x] JWT authentication (CP-7)
- [x] Firebase Firestore integration (CP-7)
- [x] CRUD products (CP-7)
- [x] Bcrypt password hashing (CP-7)
- [x] Admin settings endpoint (CP-7)
- [x] Rate limiting (CP-8)
- [x] Input validation (CP-8)
- [x] Winston logging (CP-8)
- [x] CORS restriction (CP-8)

Security:
- [x] Promo code static di .env
- [x] Admin credentials di Firestore (bcrypt)
- [x] JWT expires in 24 hours
- [x] Protected routes (verifyToken middleware)
- [x] Public routes ga pake token (publicApi)
- [x] Rate limiting (auth & API)
- [x] Input validation (express-validator)
- [x] JWT secret validation
- [x] Non-verbose error messages
- [x] Winston logging
- [x] Auto-logout on token expired


DEPLOYMENT PLAN (CP-9)
----------------------
Service    | Untuk
Vercel     | Frontend + Backend (serverless functions)
Firebase   | Firestore Database

Vercel Environment Variables:
- VITE_API_URL=https://[project-name].vercel.app/api
- JWT_SECRET=[random string]
- PROMO_CODE=GAMER2026
- FIREBASE_PROJECT_ID=gamesvault-web
- FIREBASE_PRIVATE_KEY="..."
- FIREBASE_CLIENT_EMAIL=...
- FIREBASE_STORAGE_BUCKET=gamesvault-web.firebasestorage.app

Vercel Setup Steps:
1. Connect GitHub repository to Vercel
2. Add all environment variables in Vercel dashboard
3. Configure build settings:
   - Build Command: cd client && npm run build
   - Output Directory: client/dist
4. Set Node.js version: 20.x
5. Deploy (auto on push to main branch)


NOTES (UPDATED)
---------------
3D Models:
- Format: .glb (GLTF binary)
- Letakkan di: client/public/models/
- Sementara: pakai geometry shapes (box/sphere) - SUDAH JALAN
- Bisa diganti dengan model .glb kapan saja (lihat guide di atas)

Login Credentials (FIRESTORE):
- Username: admin
- Password: admin123
- Bisa tambah admin baru via script add-admin.js

Promo Code:
- Kode: GAMER2026 (ada di .env)

Product Validation:
- Nama produk: Wajib
- Link Shopee: Opsional
- Link Tokopedia: Opsional
- Minimal salah satu link harus diisi

Data Source:
- ✅ Semua data produk dari Firestore
- ✅ Admin credentials dari Firestore
- ✅ Authentication pake JWT


DEVELOPMENT PHASES (FINAL)
--------------------------
Phase 1: Frontend (Client) - ✅ DONE
- [x] Setup Vite + React + Tailwind (CP-1)
- [x] Navbar + Footer (CP-2)
- [x] 3D Showcase + Color Picker (CP-3)
- [x] Product Carousel (CP-4)
- [x] Login Page (CP-5)
- [x] Admin Panel + CRUD (CP-6)
- [x] Admin Settings (CP-7)

Phase 2: Backend (Server) - ✅ DONE
- [x] Setup Express + Firebase Admin (CP-7)
- [x] JWT authentication (CP-7)
- [x] CRUD products (CP-7)
- [x] Admin settings (CP-7)

Phase 3: Integration - ✅ DONE
- [x] Connect frontend to API (CP-7)
- [x] Protected routes (CP-7)
- [x] Firebase Firestore (CP-7)
- [x] publicApi & conditional navbar (CP-7)

Phase 4: Polish - ✅ DONE
- [x] Responsive design (mobile/tablet)
- [x] Loading states (skeleton)
- [x] Error handling
- [x] UI/UX final touch (Cream monochrome theme)
- [x] Security hardening

Phase 5: Deployment - ⏳ NEXT (CP-9)
- [ ] Deploy to Vercel
- [ ] Environment Variables setup
- [ ] Production testing


Status: Ready for Deployment (CP-9 Next)
Last Updated: 2026-09-09