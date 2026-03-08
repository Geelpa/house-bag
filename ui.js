import {
    addItem,
    listenItems,
    updateItemQuantity,
    deleteItem,
    itemExists
} from "./items-service.js"

import { auth } from "./firebase-config.js"

import {
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"


const itemsContainer = document.getElementById("itemsContainer")
const shoppingContainer = document.getElementById("shoppingContainer")

const showItemsBtn = document.getElementById("showItemsBtn")
const showShoppingBtn = document.getElementById("showShoppingBtn")

const form = document.getElementById("itemForm")
const itemsList = document.getElementById("itemsList")
const shoppingList = document.getElementById("shoppingList")
const logoutBtn = document.getElementById("logoutBtn")

let uid = null

showItemsBtn.onclick = () => {

    itemsContainer.classList.remove("hidden")
    shoppingContainer.classList.add("hidden")

}

showShoppingBtn.onclick = () => {

    shoppingContainer.classList.remove("hidden")
    itemsContainer.classList.add("hidden")

}

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html"
        return

    }

    uid = user.uid

    startApp()

})



function startApp() {
    listenItems(uid, renderUI)

    let itemsCache = []
    // formulario
    form.addEventListener("submit", async (e) => {

        e.preventDefault()

        let name = document.getElementById("name").value.trim()
        const current = Number(document.getElementById("current").value)
        const ideal = Number(document.getElementById("ideal").value)



        if (!name) {
            alert("Informe o nome do item")
            return
        }



        name = name.charAt(0).toUpperCase() + name.slice(1)



        // validação no backend
        const exists = await itemExists(uid, name)

        if (exists) {
            alert("Esse item já está cadastrado")
            return
        }



        await addItem(uid, name, current, ideal)

        form.reset()

    })

    // logout
    logoutBtn.addEventListener("click", async () => {

        await signOut(auth)

        window.location.href = "login.html"

    })

}



function renderUI(items) {
    // itemsCache = items

    itemsList.innerHTML = ""
    shoppingList.innerHTML = ""

    items.forEach(item => {

        const falta = item.ideal - item.current

        renderItem(item)

        if (falta > 0) {
            renderShopping(item, falta)
        }

    })

}



function renderItem(item) {

    const div = document.createElement("div")

    div.className = "border p-2 rounded flex justify-between items-center"

    div.innerHTML = `
<span>${item.name}</span>

<div class="flex items-center gap-2">

<button class="bg-gray-200 px-2 rounded">-</button>

<span>${item.current}</span>

<button class="bg-gray-200 px-2 rounded">+</button>

<button class="text-red-500">🗑</button>

</div>
`

    const minusBtn = div.querySelectorAll("button")[0]
    const plusBtn = div.querySelectorAll("button")[1]
    const deleteBtn = div.querySelectorAll("button")[2]



    minusBtn.onclick = () => {

        if (item.current > 0) {
            updateItemQuantity(uid, item.id, item.current - 1)
        }

    }



    plusBtn.onclick = () => {

        updateItemQuantity(uid, item.id, item.current + 1)

    }



    deleteBtn.onclick = () => {

        deleteItem(uid, item.id)

    }



    itemsList.appendChild(div)

}





function renderShopping(item, falta) {

    const div = document.createElement("div")

    div.className = "border p-2 rounded flex justify-between bg-red-50"

    div.innerHTML = `
<span>${item.name}</span>
<span>${falta}</span>
`

    shoppingList.appendChild(div)

}