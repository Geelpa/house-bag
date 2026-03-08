import { auth } from "./firebase-config.js"

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"



const form = document.getElementById("loginForm")
const registerBtn = document.getElementById("registerBtn")
const errorMessage = document.getElementById("errorMessage")



form.addEventListener("submit", async (e) => {

    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    try {

        await signInWithEmailAndPassword(auth, email, password)

        window.location.href = "index.html"

    } catch (error) {

        errorMessage.textContent = "Erro ao fazer login"

    }

})



registerBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    try {

        await createUserWithEmailAndPassword(auth, email, password)

        window.location.href = "index.html"

    } catch (error) {

        errorMessage.textContent = "Erro ao criar conta"

    }

})