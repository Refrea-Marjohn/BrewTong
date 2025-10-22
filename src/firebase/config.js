import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
// Using Firebase demo project for testing
const firebaseConfig = {
  apiKey: "AIzaSyBvOkBwJ1TNUvXxXxXxXxXxXxXxXxXxXxX",
  authDomain: "brewtong-demo.firebaseapp.com",
  projectId: "brewtong-demo",
  storageBucket: "brewtong-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
