import firebaseAdmin from 'firebase-admin';

if (!firebaseAdmin?.apps?.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    }),
    databaseURL: 'https://fast-feedback-jmherzo.firebaseio.com'
  });
}

const auth = firebaseAdmin.auth();
const firestore = firebaseAdmin.firestore();

export { auth, firestore };
