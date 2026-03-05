import { initAuth } from "./auth.js";
import { loadInventory } from "./inventory.js";
import { initForm } from "./form.js";

document.addEventListener("DOMContentLoaded", () => {

    initAuth((userId) => {
        loadInventory(userId);
        initForm(userId);
    });

});