import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase.js";

export function initForm(userId) {

    const form = document.getElementById("item-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = document.getElementById("item-name").value.trim();
        const quantidadeAtual = Number(document.getElementById("item-current").value);
        const quantidadeIdeal = Number(document.getElementById("item-ideal").value);

        await addDoc(
            collection(db, "users", userId, "inventory"),
            {
                nome,
                quantidadeAtual,
                quantidadeIdeal,
                createdAt: new Date()
            }
        );

        form.reset();
    });
}