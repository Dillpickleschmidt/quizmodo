// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6AgD9Gfvs6Y0vs3b-5T3E1-0yWQB0Opo",
  authDomain: "mobile-f01bc.firebaseapp.com",
  projectId: "mobile-f01bc",
  storageBucket: "mobile-f01bc.appspot.com",
  messagingSenderId: "881399698997",
  appId: "1:881399698997:web:121480b60c4911a39a437c",
  measurementId: "G-JDWJKEM880"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);