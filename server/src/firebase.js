const admin = require('firebase-admin');
const logger = require('./logger');

// ============ LOAD SERVICE ACCOUNT ============
let serviceAccount;
try {
  // Coba load dari file
  serviceAccount = require('../serviceAccountKey.json');
  logger.info('✅ Service account loaded from file');
} catch (error) {
  // Kalo ga ada file, coba dari environment variables
  logger.warn('⚠️ serviceAccountKey.json not found, trying environment variables...');
  
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  if (!projectId || !privateKey || !clientEmail) {
    logger.error('❌ Firebase credentials not found in environment variables!');
    process.exit(1);
  }

  serviceAccount = {
    projectId,
    privateKey: privateKey.replace(/\\n/g, '\n'),
    clientEmail,
  };
  logger.info('✅ Service account loaded from environment variables');
}

// ============ INITIALIZE FIREBASE ============
try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'gamesvault-web.firebasestorage.app',
    });
    logger.info('🔥 Firebase Admin initialized successfully!');
  } else {
    logger.info('🔥 Firebase Admin already initialized');
  }
} catch (error) {
  logger.error('❌ Failed to initialize Firebase Admin:', error);
  process.exit(1);
}

// ============ EXPORT ============
const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };