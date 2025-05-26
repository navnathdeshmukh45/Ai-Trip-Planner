// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3YgweRaG4WubxU17bbq40Kj_sTZMRDdc",
  authDomain: "ai-trip-plan-44412.firebaseapp.com",
  projectId: "ai-trip-plan-44412",
  storageBucket: "ai-trip-plan-44412.firebasestorage.app",
  messagingSenderId: "503524541197",
  appId: "1:503524541197:web:c581d78bde4b7457636644",
  measurementId: "G-6CGC0S5S93"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);