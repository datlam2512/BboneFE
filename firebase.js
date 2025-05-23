// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration (replace with your own Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyAE7bg9yLk4aF5TymGNgf0ZMLnqDAagdcE",
    authDomain: "chatbbone.firebaseapp.com",
    projectId: "chatbbone",
    storageBucket: "chatbbone.appspot.com",
    messagingSenderId: "167761592207",
    appId: "1:167761592207:web:3cb69897d1bfc649fbd5fa",
    measurementId: "G-H94XWPEW6K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export { db, storage };
