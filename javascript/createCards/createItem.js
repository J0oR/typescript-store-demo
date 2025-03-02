import { Prodotto } from "../classes/classes.js";
import { IDGenerator } from "../helpers.js";
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
    card.classList.add("card");
    card.innerHTML = `
    <h3>Item ${product.ID}</h3>
    <div class="item-row">
        <p>Tipo:</p>
        <p>${product.tipo}</p>
    </div>
        <div class="item-row">
        <p>Colore:</p>
        <p>${product.colore}</p>
    </div>
    <div class="item-row">
        <p>Disponibilità: </p>
        <p>${product.stato}</p>
    </div>
    <div class="item-row">
        <p>Taglia:</p>
        <p>${product.taglia}</p>
    </div>
    <div class="item-row">
        <p>Stato:</p>
        <p>${product.stato}</p>
    </div>
  `;
    if (prodCardContainer) {
        prodCardContainer.prepend(card);
    }
    else {
        console.error("Elemento con id 'prodCardContainer' non trovato");
    }
}
