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
│   │   │   └── firebase.js             # ⏳ NANTI (upload gambar)
│   │   ├── assets/                      # 📁 Kosong
│   │   ├── components/
│   │   │   ├── 3D/
│   │   │   │   ├── HandheldShowcase.jsx    # ✅ DONE (CP-3)
│   │   │   │   └── DeviceModel.jsx         # ✅ DONE (CP-3)
│   │   │   ├── carousel/
│   │   │   │   ├── ProductCarousel.jsx    # ✅ DONE (CP-4) + publicApi
│   │   │   │   └── ProductCard.jsx        # ✅ DONE (CP-4)
│   │   │   ├── admin/
│   │   │   │   ├── AdminPanel.jsx         # ✅ DONE (CP-6) + Home button
│   │   │   │   └── ProductForm.jsx        # ✅ DONE (CP-6)
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx             # ✅ DONE (CP-2) + conditional admin
│   │   │   │   ├── Footer.jsx             # ✅ DONE (CP-2)
│   │   │   │   └── ColorPicker.jsx        # ✅ DONE (CP-3)
│   │   │   └── login/
│   │   │       └── LoginPage.jsx          # ✅ DONE (CP-5) + publicApi
│   │   ├── context/
│   │   │   └── AuthContext.jsx            # ✅ DONE
│   │   ├── pages/
│   │   │   ├── MainPage.jsx               # ✅ DONE (Hero + 3D + Carousel)
│   │   │   ├── AdminPage.jsx              # ✅ DONE (CP-6)
│   │   │   └── AdminSettings.jsx          # ✅ DONE (CP-7) + clean navbar
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
└── server/                                # ✅ DONE (CP-7)
    ├── src/
    │   ├── server.js                      # ✅ DONE (Firebase + JWT + Settings)
    │   └── firebase.js                    # ✅ DONE (Firebase Admin)
    ├── data/                              # ❌ DELETED (pake Firestore)
    ├── .env                               # ✅ DONE
    ├── package.json                       # ✅ DONE
    ├── serviceAccountKey.json             # ✅ DONE
    ├── seed-admin.js                      # ✅ DONE
    ├── add-admin.js                       # ✅ DONE
    └── test-firebase.js                   # ❌ DELETED


USER FLOW (FINAL)
-----------------
1. Main Page (/)
User buka website
  ↓
Hero Section (judul + tagline)
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
Next/Prev dengan loop
  ↓
Auto-slide setiap 5 detik
  ↓
Indicator dots di bawah


API ENDPOINTS (FINAL)
---------------------
Method  Endpoint                  Auth     Instance   Deskripsi
POST    /api/validate-promo       Public   publicApi  Validasi promo code
POST    /api/login                Public   publicApi  Login admin → return JWT
GET     /api/products             Public   publicApi  Ambil semua products
GET     /api/products/:id         Public   publicApi  Ambil product by ID
POST    /api/products             JWT      api        Tambah product
PUT     /api/products/:id         JWT      api        Update product
DELETE  /api/products/:id         JWT      api        Hapus product
PUT     /api/admin/settings       JWT      api        Update username/password


FIRESTORE DATA STRUCTURE (FINAL)
--------------------------------
Collection: products
{
  id: "auto-generated",
  name: "PSP 3000",                    // Wajib
  image: "https://...",                 // Wajib (URL)
  shopeeLink: "https://...",            // Opsional
  tokopediaLink: "https://...",         // Opsional
  createdAt: "2026-08-14T..."
}
Aturan: Minimal satu link harus diisi

Collection: admins
{
  id: "auto-generated",
  username: "admin",
  passwordHash: "$2b$10$...",           // bcrypt hash
  createdAt: "2026-08-14T..."
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


TECH STACK (FINAL)
------------------
Frontend:
- React 18.2.0
- Vite 5.0.8
- Tailwind CSS 3.4.0
- React Router DOM 6.22.0
- Axios 1.6.7 (dengan publicApi & interceptor)
- Framer Motion 11.0.0
- Lucide React 0.344.0
- React Hot Toast 2.4.1
- React Three Fiber 8.15.0
- React Three Drei 9.88.0
- Three.js 0.160.0

Backend:
- Node.js (Express 4.19.2)
- JSON Web Token (jsonwebtoken 9.0.2)
- Bcrypt 5.1.1 (password hashing)
- Firebase Admin SDK 12.3.0
- CORS 2.8.5
- Dotenv 16.4.5

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
JWT_SECRET=gamesvault_super_secret_key_2026
PROMO_CODE=GAMER2026

# Firebase Admin SDK (optional, bisa pake serviceAccountKey.json)
FIREBASE_PROJECT_ID=gamesvault-web
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@gamesvault-web.iam.gserviceaccount.com


PROGRESS STATUS (FINAL)
-----------------------
CP-1: Setup Project                    ✅ DONE
CP-2: Navbar + Footer                  ✅ DONE
CP-3: 3D Showcase + Color Picker       ✅ DONE
CP-4: Product Carousel                 ✅ DONE
CP-5: Login Page                       ✅ DONE
CP-6: Admin Panel + CRUD               ✅ DONE
CP-7: Backend + Firebase + JWT         ✅ DONE
CP-8: Polish (Frontend Final Touch)    ⏳ NEXT
CP-9: Deploy to Vercel                 ⏳ BELUM


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
- [ ] Polish & Responsive (CP-8)

Backend:
- [x] Express server (CP-7)
- [x] JWT authentication (CP-7)
- [x] Firebase Firestore integration (CP-7)
- [x] CRUD products (CP-7)
- [x] Bcrypt password hashing (CP-7)
- [x] Admin settings endpoint (CP-7)

Security:
- [x] Promo code static di .env
- [x] Admin credentials di Firestore (bcrypt)
- [x] JWT expires in 24 hours
- [x] Protected routes (verifyToken middleware)
- [x] Public routes ga pake token (publicApi)


DEPLOYMENT PLAN (CP-9)
----------------------
Service    | Untuk
Vercel     | Frontend + Backend (serverless functions)
Firebase   | Firestore Database

Vercel Setup:
1. Hubungkan repository GitHub ke Vercel
2. Set environment variables di Vercel dashboard
3. Deploy otomatis setiap push ke main branch


GUIDE: MENAMBAHKAN 3D MODEL ASSETS
----------------------------------
1. Format yang didukung:
   - .glb (GLTF Binary) - REKOMENDASI
   - .gltf (GLTF JSON) + texture folder

2. Sumber Model 3D Gratis:
   - Sketchfab (filter by "Free Download")
   - Poly Haven
   - TurboSquid (free section)
   - CGTrader (free section)

3. Cara Menambahkan:
   a. Download file .glb
   b. Masukkan ke folder: client/public/models/
   c. Update DeviceModel.jsx:

   // Tambahkan case baru
   case 'NamaDevice':
     return (
       <group position={position}>
         <primitive 
           object={useGLTF('/models/nama-file.glb').scene} 
           scale={[0.5, 0.5, 0.5]} // Sesuaikan ukuran
         />
         <meshStandardMaterial color={color} />
       </group>
     );

   d. Tambahkan device ke array di HandheldShowcase.jsx:
   const devices = ['PSP', 'DS Lite', 'PS Vita', '3DS', '2DS', 'NamaDevice'];

4. Tips Optimasi:
   - Kompres model dengan Draco compression
   - Gunakan meshoptimizer untuk ukuran lebih kecil
   - Pastikan texture resolution tidak terlalu besar (max 1024x1024)

5. Contoh Kode Lengkap:
   import { useGLTF } from '@react-three/drei';
   ...
   case 'NamaDevice':
     const { scene } = useGLTF('/models/nama-file.glb');
     return (
       <group position={position}>
         <primitive object={scene} scale={[0.5, 0.5, 0.5]} />
       </group>
     );


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
- ✅ Semua data produk dari Firestore (bukan JSON/dummy)
- ✅ Admin credentials dari Firestore (bukan JSON/dummy)
- ✅ Authentication pake JWT (bukan dummy)

Public & Protected Routes:
- ✅ Public: /validate-promo, /login, /products (GET) → publicApi
- ✅ Protected: /products (POST/PUT/DELETE), /admin/settings → api (JWT)


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

Phase 4: Polish - ⏳ NEXT (CP-8)
- [ ] Responsive design (mobile/tablet)
- [ ] Loading states
- [ ] Error handling
- [ ] UI/UX final touch

Phase 5: Deployment - ⏳ BELUM (CP-9)
- [ ] Deploy to Vercel
- [ ] Environment Variables
- [ ] Production testing


Status: Development (CP-7 Done, CP-8 Next)
Last Updated: 2026-08-18
