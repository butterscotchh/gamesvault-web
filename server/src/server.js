const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { db } = require('./firebase');

const app = express();
const PORT = process.env.PORT || 5000;

// ============ MIDDLEWARE ============
app.use(cors());
app.use(express.json());

// ============ JWT VERIFY MIDDLEWARE ============
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token diperlukan!' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token tidak valid!' });
  }
};

// ============ AUTH ENDPOINTS ============

// POST: Login Admin
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const snapshot = await db.collection('admins')
      .where('username', '==', username)
      .get();

    if (snapshot.empty) {
      console.log(`❌ Login failed: ${username} (not found)`);
      return res.status(401).json({ 
        success: false, 
        error: 'Username atau password salah!' 
      });
    }

    const adminDoc = snapshot.docs[0];
    const adminData = adminDoc.data();

    const isValid = await bcrypt.compare(password, adminData.passwordHash);
    if (!isValid) {
      console.log(`❌ Login failed: ${username} (wrong password)`);
      return res.status(401).json({ 
        success: false, 
        error: 'Username atau password salah!' 
      });
    }

    const token = jwt.sign(
      { 
        id: adminDoc.id, 
        username: adminData.username
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log(`✅ Login success: ${username}`);
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
    console.error('Login error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan server!' });
  }
});

// POST: Validasi Promo Code
app.post('/api/validate-promo', (req, res) => {
  const { code } = req.body;
  const PROMO_CODE = process.env.PROMO_CODE || 'GAMER2026';

  if (code === PROMO_CODE) {
    console.log(`✅ Promo code valid: ${code}`);
    const token = jwt.sign(
      { promo: true, timestamp: Date.now() },
      process.env.JWT_SECRET,
      { expiresIn: '5m' }
    );
    res.json({
      success: true,
      message: 'Promo code valid!',
      token
    });
  } else {
    console.log(`❌ Invalid promo code: ${code}`);
    res.status(401).json({
      success: false,
      error: 'Kode promo tidak valid!'
    });
  }
});

// ============ PRODUCTS ENDPOINTS ============

// GET: Ambil semua produk
app.get('/api/products', async (req, res) => {
  try {
    const snapshot = await db.collection('products')
      .orderBy('createdAt', 'desc')
      .get();

    const products = [];
    snapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });

    console.log(`📦 GET /api/products - ${products.length} products`);
    res.json(products);

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Gagal mengambil produk!' });
  }
});

// GET: Ambil produk by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const doc = await db.collection('products').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }
    console.log(`📦 GET /api/products/${req.params.id}`);
    res.json({ id: doc.id, ...doc.data() });

  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Gagal mengambil produk!' });
  }
});

// POST: Tambah produk baru (PROTECTED)
app.post('/api/products', verifyToken, async (req, res) => {
  try {
    const { name, image, shopeeLink, tokopediaLink } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Nama produk wajib diisi!' });
    }
    if (!shopeeLink && !tokopediaLink) {
      return res.status(400).json({ error: 'Minimal satu link harus diisi!' });
    }

    const productData = {
      name,
      image: image || 'https://via.placeholder.com/300x200/9e6b54/ffffff?text=No+Image',
      shopeeLink: shopeeLink || '',
      tokopediaLink: tokopediaLink || '',
      isSold: false,
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('products').add(productData);
    console.log(`✅ Product added: ${name}`);

    res.status(201).json({ 
      id: docRef.id, 
      ...productData
    });

  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Gagal menambahkan produk!' });
  }
});

// PUT: Update produk (PROTECTED)
app.put('/api/products/:id', verifyToken, async (req, res) => {
  try {
    const { name, image, shopeeLink, tokopediaLink, isSold } = req.body;
    const docRef = db.collection('products').doc(req.params.id);

    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Nama produk wajib diisi!' });
    }
    if (!shopeeLink && !tokopediaLink) {
      return res.status(400).json({ error: 'Minimal satu link harus diisi!' });
    }

    const updateData = {
      name,
      image: image || doc.data().image,
      shopeeLink: shopeeLink || '',
      tokopediaLink: tokopediaLink || '',
      isSold: isSold !== undefined ? isSold : (doc.data().isSold || false),
      updatedAt: new Date().toISOString()
    };

    await docRef.update(updateData);
    console.log(`✏️ Product updated: ${name}`);

    res.json({ 
      id: req.params.id, 
      ...updateData
    });

  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Gagal mengupdate produk!' });
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
    console.log(`🗑️ Product deleted: ${req.params.id}`);

    res.json({ message: 'Product deleted successfully' });

  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Gagal menghapus produk!' });
  }
});

// ============ ADMIN SETTINGS ENDPOINT ============

// PUT: Update username & password
app.put('/api/admin/settings', verifyToken, async (req, res) => {
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
        .where('username', '==', newUsername)
        .get();

      if (!existing.empty) {
        return res.status(400).json({ error: 'Username sudah digunakan!' });
      }

      updateData.username = newUsername;
    }

    if (newPassword) {
      updateData.passwordHash = await bcrypt.hash(newPassword, 10);
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
        { id: userId, username: newUsername },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
    }

    console.log(`✏️ Admin settings updated: ${adminData.username} → ${newUsername || adminData.username}`);
    res.json({
      success: true,
      message: 'Settings updated successfully!',
      token: newToken
    });

  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Gagal update settings!' });
  }
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

});
