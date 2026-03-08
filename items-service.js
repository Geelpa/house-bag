import { db } from "./firebase-config.js"

import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"



export async function addItem(uid, name, current, ideal) {

    await addDoc(
        collection(db, "users", uid, "items"),
        {
            name,
            current,
            ideal
        }
    )

}



export function listenItems(uid, callback) {

    const itemsRef = collection(db, "users", uid, "items")

    return onSnapshot(itemsRef, snapshot => {

        const items = []

        snapshot.forEach(doc => {

            items.push({
                id: doc.id,
                ...doc.data()
            })

        })

        callback(items)

    })

}



export async function updateItemQuantity(uid, id, newValue) {

    const ref = doc(db, "users", uid, "items", id)

    await updateDoc(ref, {
        current: newValue
    })

}



export async function deleteItem(uid, id) {

    const ref = doc(db, "users", uid, "items", id)

    await deleteDoc(ref)

}