import { Prodotto } from "../classes/classes.js";
import { IDGenerator } from "../helpers.js";

// Helper functions for form handling and UI updates
export function handleProductFormSubmit(event: Event): Prodotto {
  event.preventDefault();

  const productForm = document.getElementById("productForm") as HTMLElement;
  const tipo = (productForm.querySelector("#productType") as HTMLSelectElement)
    .value;
  const colore = (
    productForm.querySelector("#productColor") as HTMLSelectElement
  ).value;
  const stato = (
    productForm.querySelector("#productAvailability") as HTMLSelectElement
  ).value;
  const taglia = (
    productForm.querySelector("#productSize") as HTMLSelectElement
  ).value;

  const newProduct = new Prodotto(
    tipo as "costume da bagno" | "pareo" | "cappello",
    IDGenerator.generateID(),
    taglia,
    colore,
    stato as "esaurito" | "disponibile"
  );

  // processoRiciclo.aggiungiProdotto(newProduct);
  return newProduct;
}

export function createProductCard(product: Prodotto): void {
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
  } else {
    console.error("Elemento con id 'prodCardContainer' non trovato");
  }
}
