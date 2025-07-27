import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBugWpHxz6klPSLIejb6Ma9x7Psp06ODws",
  authDomain: "shopify-e-commerce-website.firebaseapp.com",
  projectId: "shopify-e-commerce-website",
  storageBucket: "shopify-e-commerce-website.firebasestorage.app",
  messagingSenderId: "387007947072",
  appId: "1:387007947072:web:543ddf9dacf6d0b68d1aa5",
  measurementId: "G-JGR44YYCL7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
