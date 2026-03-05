// auth.js

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { auth } from "./firebase.js";

// 🔥 EXPORT NOMEADO CORRETO
export function initAuth(onUserLogged) {

  const loginContainer = document.getElementById("login-container");
  const appContainer = document.getElementById("app-container");

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const logoutBtn = document.getElementById("logout-btn");

  // ===== LOGIN =====
  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Erro no login: " + error.message);
    }
  });

  // ===== REGISTRO =====
  registerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Erro no registro: " + error.message);
    }
  });

  // ===== LOGOUT =====
  logoutBtn?.addEventListener("click", async () => {
    await signOut(auth);
  });

  // ===== OBSERVADOR DE ESTADO =====
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loginContainer.classList.add("hidden");
      appContainer.classList.remove("hidden");

      if (typeof onUserLogged === "function") {
        onUserLogged(user.uid);
      }

    } else {
      loginContainer.classList.remove("hidden");
      appContainer.classList.add("hidden");
    }
  });
}