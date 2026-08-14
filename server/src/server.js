const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============ MIDDLEWARE ============
app.use(cors());
app.use(express.json());

// ============ PATH FILE ============
const DATA_PATH = path.join(__dirname, '../data/products.json');
const ADMINS_PATH = path.join(__dirname, '../data/admins.json');

// ============ HELPER FUNCTIONS ============

const readData = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('\x1b[31m❌ Error reading data:\x1b[0m', error);
    return [];
  }
};

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('\x1b[31m❌ Error writing data:\x1b[0m', error);
    return false;
  }
};

// ============ AUTH ENDPOINTS ============

// POST: Login Admin
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const admins = readData(ADMINS_PATH);

  const admin = admins.find(
    (a) => a.username === username && a.password === password
  );

  if (!admin) {
    console.log(`\x1b[31m❌ Login failed: ${username}\x1b[0m`);
    return res.status(401).json({ 
      success: false, 
      error: 'Username atau password salah!' 
    });
  }

  console.log(`\x1b[38;2;255;105;180m✅ Login success: ${username}\x1b[0m`);
  res.json({
    success: true,
    message: 'Login berhasil!',
    admin: {
      id: admin.id,
      username: admin.username
    }
  });
});

// POST: Validasi Promo Code
app.post('/api/validate-promo', (req, res) => {
  const { code } = req.body;
  const PROMO_CODE = process.env.PROMO_CODE || 'GAMER2026';

  if (code === PROMO_CODE) {
    console.log(`\x1b[38;2;255;105;180m✅ Promo code valid: ${code}\x1b[0m`);
    res.json({
      success: true,
      message: 'Promo code valid!',
      token: 'dummy_token_' + Date.now()
    });
  } else {
    console.log(`\x1b[31m❌ Invalid promo code: ${code}\x1b[0m`);
    res.status(401).json({
      success: false,
      error: 'Kode promo tidak valid!'
    });
  }
});

// ============ PRODUCTS ENDPOINTS ============

// GET: Ambil semua produk
app.get('/api/products', (req, res) => {
  const products = readData(DATA_PATH);
  console.log(`\x1b[38;2;255;105;180m📦 GET /api/products - ${products.length} products\x1b[0m`);
  res.json(products);
});

// GET: Ambil produk by ID
app.get('/api/products/:id', (req, res) => {
  const products = readData(DATA_PATH);
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  console.log(`\x1b[38;2;255;105;180m📦 GET /api/products/${req.params.id}\x1b[0m`);
  res.json(product);
});

// POST: Tambah produk baru
app.post('/api/products', (req, res) => {
  const products = readData(DATA_PATH);
  const { name, image, shopeeLink, tokopediaLink } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Nama produk wajib diisi!' });
  }
  if (!shopeeLink && !tokopediaLink) {
    return res.status(400).json({ error: 'Minimal satu link harus diisi!' });
  }

  const newProduct = {
    id: Date.now(),
    name,
    image: image || 'https://via.placeholder.com/300x200/9e6b54/ffffff?text=No+Image',
    shopeeLink: shopeeLink || '',
    tokopediaLink: tokopediaLink || ''
  };

  products.push(newProduct);
  writeData(DATA_PATH, products);
  console.log(`\x1b[38;2;255;105;180m✅ Product added: ${name}\x1b[0m`);
  res.status(201).json(newProduct);
});

// PUT: Update produk
app.put('/api/products/:id', (req, res) => {
  const products = readData(DATA_PATH);
  const id = parseInt(req.params.id);
  const { name, image, shopeeLink, tokopediaLink } = req.body;

  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (!name) {
    return res.status(400).json({ error: 'Nama produk wajib diisi!' });
  }
  if (!shopeeLink && !tokopediaLink) {
    return res.status(400).json({ error: 'Minimal satu link harus diisi!' });
  }

  products[index] = {
    ...products[index],
    name,
    image: image || products[index].image,
    shopeeLink: shopeeLink || '',
    tokopediaLink: tokopediaLink || ''
  };

  writeData(DATA_PATH, products);
  console.log(`\x1b[38;2;255;105;180m✏️ Product updated: ${name}\x1b[0m`);
  res.json(products[index]);
});

// DELETE: Hapus produk
app.delete('/api/products/:id', (req, res) => {
  const products = readData(DATA_PATH);
  const id = parseInt(req.params.id);
  const filtered = products.filter(p => p.id !== id);

  if (filtered.length === products.length) {
    return res.status(404).json({ error: 'Product not found' });
  }

  writeData(DATA_PATH, filtered);
  console.log(`\x1b[38;2;255;105;180m🗑️ Product deleted: ${id}\x1b[0m`);
  res.json({ message: 'Product deleted successfully' });
});

// ============ START SERVER ============
app.listen(PORT, () => {
  

  console.log('\x1b[38;2;255;105;180m═══════════════════════════════════════════════════════════════════');
  console.log('  Server is running!');
  console.log(`  http://localhost:${PORT}`);
  console.log('═══════════════════════════════════════════════════════════════════\x1b[0m');

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
