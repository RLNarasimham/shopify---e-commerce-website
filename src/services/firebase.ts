// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBugWpHxz6klPSLIejb6Ma9x7Psp06ODws",
//   authDomain: "shopify-e-commerce-website.firebaseapp.com",
//   projectId: "shopify-e-commerce-website",
//   storageBucket: "shopify-e-commerce-website.firebasestorage.app",
//   messagingSenderId: "387007947072",
//   appId: "1:387007947072:web:543ddf9dacf6d0b68d1aa5",
//   measurementId: "G-JGR44YYCL7",
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Use environment variables for sensitive config if deploying to public repo or production!
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
