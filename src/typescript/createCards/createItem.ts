import { Prodotto } from "../classes/classes.js";
import { IDGenerator } from "../helpers.js";
import { newOrderIDs, processoRiciclo } from "../app.js";
import { animateCards } from "../helpers.js";
import { createRows, addToOrderButtonHandler } from "./cardsHelpers.js";

export function handleProductFormSubmit(): Prodotto {
  const formData = new FormData(document.getElementById("productForm") as HTMLFormElement);
  const tipo = formData.get("productType") as "costume da bagno" | "pareo" | "cappello";
  const colore = formData.get("productColor") as string;
  const taglia = formData.get("productSize") as string;
  return createProduct(tipo, IDGenerator.generateID(), taglia, colore, "disponibile");
}

export function createProduct(tipo: "costume da bagno" | "pareo" | "cappello", ID: number, taglia: string, colore: string, stato: "esaurito" | "disponibile"): Prodotto {
  const newProduct = new Prodotto(tipo, ID, taglia, colore, stato);
  processoRiciclo.aggiungiProdotto(newProduct);
  return newProduct;
}

export function createProductCard(product: Prodotto, when?: string): void {
  const prodCardContainer = document.getElementById("prodCardContainer");
  // Add the card to the container
  if (!prodCardContainer) {
    console.error("Elemento con id 'prodCardContainer' non trovato");
    return;
  }

  // create new coard
  const card = document.createElement("div");
  card.classList.add("card", "item-card");
  card.setAttribute("data-product-id", product.ID.toString()); // Store product ID

  const itemDetails = [
    { label: "category", value: product.tipo },
    { label: "color", value: product.colore },
    { label: "size", value: product.taglia },
    { label: "availability", value: product.stato },
  ];

  // card template
  card.innerHTML = `
      <span>${product.ID}</span>
      ${createRows(itemDetails, "Item details", "")}
      <input type="checkbox" id="item-checkbox" name="item-checkbox" class="add-to-order-checkbox">
      `;
      //<button class="add-to-order-button">add to order</button>

  if (when && when === "form") {
    animateCards(card, prodCardContainer as HTMLDivElement, ".item-card");
  } else {
    prodCardContainer.prepend(card);
  }

  //detailsButtonHandler(card);
  addToOrderButtonHandler(card, product.ID.toString(), newOrderIDs, "product");
}
