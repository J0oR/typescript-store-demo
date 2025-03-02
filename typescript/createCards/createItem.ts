import { Prodotto } from "../classes/classes.js";
import { IDGenerator } from "../helpers.js";
import { newOrder } from "../app.js"; // Import the newOrder from the other file

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
  } else {
    console.error("Elemento con id 'prodCardContainer' non trovato");
  }

  // Add a click event listener to the card
  card.addEventListener("click", () => {
    const formItemIdInput = document.getElementById("productID") as HTMLInputElement;
    newOrder[1] = product.ID.toString();
    formItemIdInput.value = product.ID.toString();
    document.querySelectorAll(".item-card").forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
  });
}
