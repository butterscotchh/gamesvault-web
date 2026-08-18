const admin = require('firebase-admin');

// Baca service account
const serviceAccount = require('../serviceAccountKey.json');

// Initialize dengan cara yang lebih explicit
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gamesvault-web'
  });
}

console.log('\x1b[38;2;255;105;180m🔥 Firebase Admin initialized!\x1b[0m');

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };
