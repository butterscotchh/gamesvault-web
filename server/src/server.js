const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const { db } = require('./firebase');
const logger = require('./logger');

const app = express();
const PORT = process.env.PORT || 5000;

// ============ ENV VALIDATION ============
const PROMO_CODE = process.env.PROMO_CODE;
const JWT_SECRET = process.env.JWT_SECRET;
if (!PROMO_CODE) {
  logger.error('❌ PROMO_CODE tidak ditemukan di .env!');
  process.exit(1);
}
if (!JWT_SECRET || JWT_SECRET.length < 10) {
  logger.error('❌ JWT_SECRET harus minimal 10 karakter!');
  process.exit(1);
}

// ============ MIDDLEWARE ============

// CORS - Dynamic untuk production & development
const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://gamerhandheld.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS blocked: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// ============ RATE LIMITING ============
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // 5 percobaan
  message: { error: 'Terlalu banyak percobaan, coba lagi nanti!' },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 30,
  message: { error: 'Terlalu banyak request, coba lagi nanti!' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ============ JWT VERIFY MIDDLEWARE ============
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    logger.warn('❌ Token tidak ditemukan');
    return res.status(401).json({ error: 'Token diperlukan!' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.warn('❌ Token tidak valid:', error.message);
    return res.status(401).json({ error: 'Token tidak valid!' });
  }
};

// ============ AUTH ENDPOINTS ============

// POST: Login Admin
app.post('/api/login', authLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || typeof username !== 'string' || username.trim().length === 0) {
      return res.status(400).json({ error: 'Username wajib diisi!' });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'Password minimal 6 karakter!' });
    }

    const snapshot = await db.collection('admins')
      .where('username', '==', username.trim())
      .get();

    if (snapshot.empty) {
      logger.warn(`❌ Login failed: ${username} (not found)`);
      return res.status(401).json({ 
        success: false, 
        error: 'Username atau password salah!' 
      });
    }

    const adminDoc = snapshot.docs[0];
    const adminData = adminDoc.data();

    const isValid = await bcrypt.compare(password, adminData.passwordHash);
    if (!isValid) {
      logger.warn(`❌ Login failed: ${username} (wrong password)`);
      return res.status(401).json({ 
        success: false, 
        error: 'Username atau password salah!' 
      });
    }

    const token = jwt.sign(
      { id: adminDoc.id, username: adminData.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    logger.info(`✅ Login success: ${username}`);
    res.json({
      success: true,
      message: 'Login berhasil!',
      token,
      admin: {
        id: adminDoc.id,
        username: adminData.username
      }
    });

  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST: Validasi Promo Code
app.post('/api/validate-promo', authLimiter, async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return res.status(400).json({ error: 'Promo code wajib diisi!' });
    }

    if (code.trim() === PROMO_CODE) {
      logger.info(`✅ Promo code valid: ${code}`);
      const token = jwt.sign(
        { promo: true, timestamp: Date.now() },
        JWT_SECRET,
        { expiresIn: '5m' }
      );
      res.json({
        success: true,
        message: 'Promo code valid!',
        token
      });
    } else {
      logger.warn(`❌ Invalid promo code: ${code}`);
      res.status(401).json({
        success: false,
        error: 'Kode promo tidak valid!'
      });
    }
  } catch (error) {
    logger.error('Promo validation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============ PRODUCTS ENDPOINTS ============

// GET: Ambil semua produk
app.get('/api/products', apiLimiter, async (req, res) => {
  try {
    const snapshot = await db.collection('products')
      .orderBy('createdAt', 'desc')
      .get();

    const products = [];
    snapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });

    logger.info(`📦 GET /api/products - ${products.length} products`);
    res.json(products);

  } catch (error) {
    logger.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET: Ambil produk by ID
app.get('/api/products/:id', apiLimiter, async (req, res) => {
  try {
    const doc = await db.collection('products').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }
    logger.info(`📦 GET /api/products/${req.params.id}`);
    res.json({ id: doc.id, ...doc.data() });

  } catch (error) {
    logger.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST: Tambah produk baru (PROTECTED)
app.post('/api/products', verifyToken, [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Nama produk wajib diisi (1-100 karakter)!').escape(),
  body('shopeeLink').optional().isURL().withMessage('Link Shopee tidak valid!'),
  body('tokopediaLink').optional().isURL().withMessage('Link Tokopedia tidak valid!'),
  body('image').optional().isURL().withMessage('URL gambar tidak valid!'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, image, shopeeLink, tokopediaLink } = req.body;

    const productData = {
      name: name.trim(),
      image: image && image.trim() !== '' ? image.trim() : 'https://via.placeholder.com/300x200/9e6b54/ffffff?text=No+Image',
      shopeeLink: shopeeLink ? shopeeLink.trim() : '',
      tokopediaLink: tokopediaLink ? tokopediaLink.trim() : '',
      isSold: false,
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('products').add(productData);
    logger.info(`✅ Product added: ${name}`);

    res.status(201).json({ 
      id: docRef.id, 
      ...productData
    });

  } catch (error) {
    logger.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT: Update produk (PROTECTED)
app.put('/api/products/:id', verifyToken, [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Nama produk wajib diisi (1-100 karakter)!').escape(),
  body('shopeeLink').optional().isURL().withMessage('Link Shopee tidak valid!'),
  body('tokopediaLink').optional().isURL().withMessage('Link Tokopedia tidak valid!'),
  body('image').optional().isURL().withMessage('URL gambar tidak valid!'),
  body('isSold').optional().isBoolean().withMessage('isSold harus boolean!'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, image, shopeeLink, tokopediaLink, isSold } = req.body;
    const docRef = db.collection('products').doc(req.params.id);

    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updateData = {
      name: name.trim(),
      image: image && image.trim() !== '' ? image.trim() : doc.data().image,
      shopeeLink: shopeeLink ? shopeeLink.trim() : '',
      tokopediaLink: tokopediaLink ? tokopediaLink.trim() : '',
      isSold: isSold !== undefined ? isSold : (doc.data().isSold || false),
      updatedAt: new Date().toISOString()
    };

    await docRef.update(updateData);
    logger.info(`✏️ Product updated: ${name}`);

    res.json({ 
      id: req.params.id, 
      ...updateData
    });

  } catch (error) {
    logger.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE: Hapus produk (PROTECTED)
app.delete('/api/products/:id', verifyToken, async (req, res) => {
  try {
    const docRef = db.collection('products').doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await docRef.delete();
    logger.info(`🗑️ Product deleted: ${req.params.id}`);

    res.json({ message: 'Product deleted successfully' });

  } catch (error) {
    logger.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============ ADMIN SETTINGS ENDPOINT ============

// PUT: Update username & password
app.put('/api/admin/settings', verifyToken, [
  body('currentUsername').trim().isLength({ min: 1 }).escape(),
  body('newUsername').optional().trim().isLength({ min: 1 }).escape(),
  body('currentPassword').isLength({ min: 6 }).withMessage('Password minimal 6 karakter!'),
  body('newPassword').optional().isLength({ min: 6 }).withMessage('Password minimal 6 karakter!'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { currentUsername, newUsername, currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const docRef = db.collection('admins').doc(userId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const adminData = doc.data();

    const isValid = await bcrypt.compare(currentPassword, adminData.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Password lama salah!' });
    }

    const updateData = {};

    if (newUsername) {
      const existing = await db.collection('admins')
        .where('username', '==', newUsername.trim())
        .get();

      if (!existing.empty) {
        return res.status(400).json({ error: 'Username sudah digunakan!' });
      }

      updateData.username = newUsername.trim();
    }

    if (newPassword) {
      updateData.passwordHash = await bcrypt.hash(newPassword, 12);
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'Tidak ada perubahan!' });
    }

    await docRef.update({
      ...updateData,
      updatedAt: new Date().toISOString()
    });

    let newToken = null;
    if (newUsername) {
      newToken = jwt.sign(
        { id: userId, username: newUsername.trim() },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
    }

    logger.info(`✏️ Admin settings updated: ${adminData.username} → ${newUsername || adminData.username}`);
    res.json({
      success: true,
      message: 'Settings updated successfully!',
      token: newToken
    });

  } catch (error) {
    logger.error('Error updating settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============ HEALTH CHECK ============
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============ NOT FOUND HANDLER ============
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// ============ ERROR HANDLER ============
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ============ START SERVER ============
app.listen(PORT, () => {
  console.log('\x1b[38;2;255;105;180m═══════════════════════════════════════════════════════════════════');
  console.log('  Server is running!');
  console.log('\x1b[38;2;255;105;180m  🔥 Firebase Connected!\x1b[0m');
  console.log(`\x1b[38;2;255;105;180m  http://localhost:${PORT}\x1b[0m`);
  console.log('\x1b[38;2;255;105;180m═══════════════════════════════════════════════════════════════════');

  console.log('\x1b[38;2;255;105;180m');
  console.log('   ██████╗  █████╗ ███╗   ███╗███████╗███████╗');
  console.log('  ██╔════╝ ██╔══██╗████╗ ████║██╔════╝██╔════╝');
  console.log('  ██║  ███╗███████║██╔████╔██║█████╗  ███████╗');
  console.log('  ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║');
  console.log('  ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗███████║');
  console.log('   ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝');
  console.log('');
  console.log('  ██╗   ██╗ █████╗ ██╗   ██╗██╗  ████████╗');
  console.log('  ██║   ██║██╔══██╗██║   ██║██║  ╚══██╔══╝');
  console.log('  ██║   ██║███████║██║   ██║██║     ██║   ');
  console.log('  ╚██╗ ██╔╝██╔══██║██║   ██║██║     ██║   ');
  console.log('   ╚████╔╝ ██║  ██║╚██████╔╝███████╗██║   ');
  console.log('    ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝   ');
  console.log('\x1b[0m');

  console.log('\x1b[38;2;255;105;180m═══════════════════════════════════════════════════════════════════');
  console.log('  Press \x1b[38;2;255;20;147mCtrl + C\x1b[38;2;255;105;180m to stop');
  console.log('═══════════════════════════════════════════════════════════════════\x1b[0m');

  logger.info(`🚀 Server started on port ${PORT}`);
  logger.info(`🔥 Firebase Connected`);
});