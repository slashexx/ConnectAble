// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import admin from 'firebase-admin';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj9S8bqj8ydqCq8ypaXSWVhZl5bEMnGPs",
  authDomain: "connect-able.firebaseapp.com",
  projectId: "connect-able",
  storageBucket: "connect-able.appspot.com",
  messagingSenderId: "237284865041",
  appId: "1:237284865041:web:091f3503e2c2a87fc66db0",
  measurementId: "G-TNKJ7ZH09C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

// Reference to the 'events' collection
const eventsCollection = collection(db, 'events');


export { app, auth, db, googleProvider, facebookProvider, eventsCollection, admin };
