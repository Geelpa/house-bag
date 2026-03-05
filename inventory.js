import { collection, onSnapshot, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase.js";

export function loadInventory(userId) {

    const haveList = document.getElementById("have-list");
    const buyList = document.getElementById("buy-list");
    console.log("DB RECEBIDO:", db);
    onSnapshot(
        collection(db, "users", userId, "inventory"),
        (snapshot) => {

            haveList.innerHTML = "";
            buyList.innerHTML = "";

            snapshot.forEach((doc) => {

                const item = doc.data();
                const faltante = item.quantidadeIdeal - item.quantidadeAtual;

                haveList.innerHTML += `
          <div class="bg-gray-100 p-2 rounded">
            <strong>${item.nome}</strong>
            <p>${item.quantidadeAtual} / ${item.quantidadeIdeal}</p>
          </div>
        `;

                if (faltante > 0) {
                    buyList.innerHTML += `
            <div class="bg-yellow-100 p-2 rounded">
              <strong>${item.nome}</strong>
              <p>Faltam ${faltante} (Ideal: ${item.quantidadeIdeal})</p>
            </div>
          `;
                }

            });

        }
    );
}