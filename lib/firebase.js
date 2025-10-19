// lib/firebase.js
"use client";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ Your Firebase web config (safe to expose on client)
const firebaseConfig = {
  apiKey: "AIzaSyB0apWldBVK5K5wQp1KZjuCezHF60Z9SJQ",
  authDomain: "reliefconnect-bc93a.firebaseapp.com",
  projectId: "reliefconnect-bc93a",
  storageBucket: "reliefconnect-bc93a.firebasestorage.app",
  messagingSenderId: "950972191653",
  appId: "1:950972191653:web:2dbd50154728f88e760e4c",
  measurementId: "G-9MSWQZ5WH7",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// (Optional) export Firestore/Storage later if needed
// export const db = getFirestore(app);
// export const storage = getStorage(app);
