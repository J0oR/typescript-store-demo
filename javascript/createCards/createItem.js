import { Prodotto } from "../classes/classes.js";
import { IDGenerator } from "../helpers.js";
import { newOrder } from "../app.js"; // Import the newOrder from the other file
// Helper functions for form handling and UI updates
export function handleProductFormSubmit(event) {
    event.preventDefault();
    const productForm = document.getElementById("productForm");
    const tipo = productForm.querySelector("#productType")
        .value;
    const colore = productForm.querySelector("#productColor").value;
    const stato = productForm.querySelector("#productAvailability").value;
    const taglia = productForm.querySelector("#productSize").value;
    const newProduct = new Prodotto(tipo, IDGenerator.generateID(), taglia, colore, stato);
    // processoRiciclo.aggiungiProdotto(newProduct);
    return newProduct;
}
export function createProductCard(product) {
    const prodCardContainer = document.getElementById("prodCardContainer");
    const card = document.createElement("div");
    card.classList.add("card", "item-card");
    card.innerHTML = `
    <h3>Item ${product.ID}</h3>
    <div class="item-row">
        <p>Category:</p>
        <p>${product.tipo}</p>
    </div>
        <div class="item-row">
        <p>Color:</p>
        <p>${product.colore}</p>
    </div>
    <div class="item-row">
        <p>Availability: </p>
        <p>${product.stato}</p>
    </div>
    <div class="item-row">
        <p>Size:</p>
        <p>${product.taglia}</p>
    </div>
    <div class="item-row">
        <p>State:</p>
        <p>${product.stato}</p>
    </div>
  `;
    // Add the card to the container
    if (prodCardContainer) {
        prodCardContainer.prepend(card);
    }
    else {
        console.error("Elemento con id 'prodCardContainer' non trovato");
    }
    // Add a click event listener to the card
    card.addEventListener("click", () => {
        const formItemIdInput = document.getElementById("productID");
        newOrder[1] = product.ID.toString();
        formItemIdInput.value = product.ID.toString();
        document.querySelectorAll(".item-card").forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
    });
}
