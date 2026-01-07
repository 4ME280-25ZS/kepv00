// ============================================================
// Firebase Configuration
// ============================================================
// TODO: Replace the values below with your Firebase config
// Get these from Firebase Console → Project Settings → Web App Config
//
// Steps to get your Firebase config:
// 1. Go to https://console.firebase.google.com
// 2. Select your project
// 3. Go to Project Settings (gear icon)
// 4. Copy the config from "Web" app section
// ============================================================

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firestore instance for use in script.js
const db = firebase.firestore();
