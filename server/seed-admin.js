const { db } = require('./src/firebase');
const bcrypt = require('bcrypt');

async function seedAdmin() {
  try {
    console.log('🔍 Seeding admin...');

    // Cek apakah admin sudah ada
    const snapshot = await db.collection('admins')
      .where('username', '==', 'admin')
      .get();

    if (!snapshot.empty) {
      console.log('⚠️ Admin already exists!');
      console.log(`   Username: admin`);
      console.log(`   ID: ${snapshot.docs[0].id}`);
      return;
    }

    // Hash password
    const password = 'admin123';
    const passwordHash = await bcrypt.hash(password, 10);

    // Buat admin - TANPA ROLE
    const adminData = {
      username: 'admin',
      passwordHash: passwordHash,
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('admins').add(adminData);
    console.log('✅ Admin created!');
    console.log(`   ID: ${docRef.id}`);
    console.log(`   Username: admin`);
    console.log(`   Password: admin123`);

  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
  }
}

seedAdmin();
