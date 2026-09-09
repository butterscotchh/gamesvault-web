const admin = require('firebase-admin');

// ============ LOAD SERVICE ACCOUNT ============
let serviceAccount;
try {
  // Di Vercel, pake environment variables
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  if (projectId && privateKey && clientEmail) {
    serviceAccount = {
      projectId,
      privateKey: privateKey.replace(/\\n/g, '\n'),
      clientEmail,
    };
    console.log('✅ Firebase loaded from environment variables');
  } else {
    // Fallback ke file (local development)
    serviceAccount = require('../serviceAccountKey.json');
    console.log('✅ Firebase loaded from file');
  }
} catch (error) {
  console.error('❌ Firebase credentials not found!');
  console.error('   Please set:');
  console.error('   - FIREBASE_PROJECT_ID');
  console.error('   - FIREBASE_PRIVATE_KEY');
  console.error('   - FIREBASE_CLIENT_EMAIL');
  process.exit(1);
}

// ============ INITIALIZE FIREBASE ============
try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'gamesvault-web.firebasestorage.app',
    });
    console.log('🔥 Firebase Admin initialized successfully!');
  } else {
    console.log('🔥 Firebase Admin already initialized');
  }
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin:', error.message);
  process.exit(1);
}

// ============ EXPORT ============
const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };