

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// ai comfig
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';


// const firebaseConfig = {
//   apiKey: "AIzaSyBWNk-GTq2OXRN95-gYehMP2OQfpz6dFlo",
//   authDomain: "quize-7f983.firebaseapp.com",
//   projectId: "quize-7f983",
//   storageBucket: "quize-7f983.firebasestorage.appspot.com",
//   messagingSenderId: "1089648503737",
//   appId: "1:1089648503737:web:6f931807ce55f8192b2468",
//   measurementId: "G-9M57FGC3H8"
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


// Initialize Firebase
 const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ai config
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);

export { app }; 















