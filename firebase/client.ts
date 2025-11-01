// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBQEj-G53Ak7b13C_Is_2C9GWjOKNIuV0U",
  authDomain: "prepwise-d43d5.firebaseapp.com",
  projectId: "prepwise-d43d5",
  storageBucket: "prepwise-d43d5.firebasestorage.app",
  messagingSenderId: "950938842533",
  appId: "1:950938842533:web:3e7b278da4074e89f8a44c",
  measurementId: "G-NYR52DPGLB"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);