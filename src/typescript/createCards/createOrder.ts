import { processoRiciclo } from "../app.js";
import { Prodotto } from "../classes/classes.js";
import { Cliente } from "../classes/classes.js";
import { animateCards, formErrorMessage } from "../helpers.js";
import { createRows, detailsButtonHandler } from "./cardsHelpers.js";

export function handleOrderFormSubmit(event: Event, clients: Cliente[]): Prodotto | undefined {
  event.preventDefault();
  // Get the selected user and product
  const orderForm = document.getElementById("orderForm") as HTMLFormElement;
  const userID = parseInt((orderForm.querySelector("#userID") as HTMLSelectElement).value, 10);
  const productID = parseInt((orderForm.querySelector("#productID") as HTMLSelectElement).value, 10);
  // se l'utente o il prodotto non sono selezionati, mostra un messaggio di errore
  formErrorMessage(!userID, "orderForm", "error-message1", "Select a user first");
  formErrorMessage(!productID, "orderForm", "error-message2", "Select a product first");
  // se l'utente o il prodotto non sono selezionati, restituisci undefined
  if (!userID || !productID) return undefined;
  // Get the selected user and product
  let selectedUser = clients.find((client) => client.ID === userID);
  let selectedProduct = processoRiciclo.prodottiInProduzione.find((item) => item.ID === productID);
  // Add the product to the user's order
  selectedUser?.ordinaProdotto(selectedProduct!);
  // Reset the form
  orderForm.reset();
  // Remove the 'selected' class from all cards
  document.querySelectorAll(".user-card, .item-card").forEach((c) => c.classList.remove("selected"));
  return selectedProduct as Prodotto;
}

export function createOrderCard(order: Prodotto, when?: string): void {
  const orderCardContainer = document.getElementById("orderCardContainer");
  if (!orderCardContainer) {
    console.error("Elemento con id 'orderCardContainer' non trovato");
    return;
  }
  const card = document.createElement("div");
  card.classList.add("card", "order-card");

  const itemDetails = [
    { label: "type", value: order.tipo },
    { label: "color", value: order.colore },
    { label: "size", value: order.taglia },
    { label: "availability", value: order.stato },
  ];

  const clientDetails = [
    { label: "name", value: order.cliente?.nome },
    { label: "surname", value: order.cliente?.cognome },
    { label: "payment", value: order.cliente?.metodoPagamento },
    { label: "email", value: order.cliente?.email }
  ]

  card.innerHTML = `
        <h3>Item ${order.ID}</h3>
        <div class="card-rows-container" hidden>
          ${createRows(itemDetails, "Item details", "")}
          <div class="item-row order-client-id">
            <p>Client </p>
            <p>${order.cliente?.ID}</p>
          </div>
          ${createRows(clientDetails, "Client details", "")}
        </div>
        <div class="card-btn-container">
          <button class="details-button">show details</button>  
        </div> 
  `;

  if (when && when === "form") {
    animateCards(card, orderCardContainer as HTMLDivElement, ".order-card");
  } else {
    orderCardContainer.prepend(card);
  }

  detailsButtonHandler(card);
}