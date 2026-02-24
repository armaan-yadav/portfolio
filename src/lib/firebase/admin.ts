import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (serviceAccountJson) {
      const parsedCredentials = JSON.parse(serviceAccountJson);
      parsedCredentials.private_key = parsedCredentials.private_key.replace(/\\n/g, '\n');
      
      admin.initializeApp({
        credential: admin.credential.cert(parsedCredentials),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    } else {
      console.warn("Missing FIREBASE_SERVICE_ACCOUNT_JSON environment variable");
      // Use application default credentials if available, or just initialize without explicit cert
      admin.initializeApp({
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    }
  } catch (error: any) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

export const adminAuth = admin.apps.length ? admin.auth() : null;
export const adminDb = admin.apps.length ? admin.firestore() : null;
export const adminStorage = admin.apps.length ? admin.storage().bucket() : null;
