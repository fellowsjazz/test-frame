import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'bounties-test-48451.firebaseapp.com',
  projectId: 'bounties-test-48451',
  storageBucket: 'bounties-test-48451.appspot.com',
  messagingSenderId: '436840297771',
  appId: '1:436840297771:web:02e479f0d12b64feb7416e',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
