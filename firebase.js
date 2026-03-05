import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDKOkXK00gbA_aAMpYIEYQP6Hnzvee9Byw",
    authDomain: "house-bag-85c5c.firebaseapp.com",
    projectId: "house-bag-85c5c",
    storageBucket: "house-bag-85c5c.firebasestorage.app",
    messagingSenderId: "118720662563",
    appId: "1:118720662563:web:0c9da87d130e1afecff596"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);