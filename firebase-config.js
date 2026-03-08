import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"


const firebaseConfig = {
    apiKey: "AIzaSyCnN5mPT_nDUt9vXx7kXfXZwxTF6PkCeuE",
    authDomain: "house-bag-122e1.firebaseapp.com",
    projectId: "house-bag-122e1",
    storageBucket: "house-bag-122e1.firebasestorage.app",
    messagingSenderId: "549745526952",
    appId: "1:549745526952:web:c865ede94ab0dee01ada9d"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)