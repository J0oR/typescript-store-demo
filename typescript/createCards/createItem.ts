import { Prodotto } from "../classes/classes.js";
import { IDGenerator } from "../helpers.js";
import { newOrderIDs, processoRiciclo } from "../app.js"; // Import the newOrder from the other file

// Helper functions for form handling and UI updates
export function handleProductFormSubmit(): Prodotto {
  const productForm = document.getElementById("productForm") as HTMLElement;
  const tipo = (productForm.querySelector("#productType") as HTMLSelectElement).value;
  const colore = (productForm.querySelector("#productColor") as HTMLSelectElement).value;
  const stato = (productForm.querySelector("#productAvailability") as HTMLSelectElement).value;
  const taglia = (productForm.querySelector("#productSize") as HTMLSelectElement).value;
  return createProduct(tipo as "costume da bagno" | "pareo" | "cappello", IDGenerator.generateID(), taglia, colore, stato as "esaurito" | "disponibile");
}

export function createProduct(tipo: "costume da bagno" | "pareo" | "cappello", ID: number, taglia: string, colore: string, stato: "esaurito" | "disponibile"):Prodotto {
  const newProduct = new Prodotto(tipo, ID, taglia, colore, stato);
  processoRiciclo.aggiungiProdotto(newProduct);
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
        <p>Size:</p>
        <p>${product.taglia}</p>
    </div>
    <div class="item-row">
        <p>Color:</p>
        <p>${product.colore}</p>
    </div>
     <div class="item-row">
        <p>Availability: </p>
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
    // Update the newOrder array & the input field on the form
    newOrderIDs[1] = product.ID.toString();
    (document.getElementById("productID") as HTMLInputElement).value = product.ID.toString();
    // Remove the "selected" class from all other cards & add it to the clicked card
    document.querySelectorAll(".item-card").forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
  });
}
