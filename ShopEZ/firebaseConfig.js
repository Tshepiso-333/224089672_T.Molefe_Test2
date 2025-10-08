import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV4cuSNGB46A55R1-P5mSzQka-_m_lnD4",
  authDomain: "shopez-b8a31.firebaseapp.com",
  projectId: "shopez-b8a31",
  storageBucket: "shopez-b8a31.firebasestorage.app",
  messagingSenderId: "843470780123",
  appId: "1:843470780123:web:091af7bdb7305602157efe"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);