import { processoRiciclo } from "../app.js";
import { Prodotto } from "../classes/classes.js";
import { Cliente } from "../classes/classes.js";
import { animateCards, formErrorMessage } from "../helpers.js";
import { createRows } from "./cardsHelpers.js";

export function handleOrderFormSubmit(event: Event, clients: Cliente[]): Prodotto | undefined {
  event.preventDefault();
  // Get the selected user and product
  const orderForm = document.getElementById("orderForm") as HTMLFormElement;
  let userID = (orderForm.querySelector("#userID") as HTMLInputElement).value;
  let productID = (orderForm.querySelector("#productID") as HTMLInputElement).value;
  // se l'utente o il prodotto non sono selezionati, mostra un messaggio di errore
  formErrorMessage(!userID, "userID", "user not selected!");
  formErrorMessage(!productID, "productID", "product not selected!");
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

  const row1 = [
    {value: order.ID},
    {value: order.colore},
    {value: order.cliente?.ID},
    {value: order.cliente?.email}
  ];
  
  const row2 = [
    {value: order.tipo},
    {value: order.taglia},
    {value: order.cliente?.nome + " " + order.cliente?.cognome},
    {value: order.cliente?.metodoPagamento}
  ]

  card.innerHTML = `
        ${createRows(row1)}
        ${createRows(row2)}
  `;

  if (when && when === "form") {
    animateCards(card, orderCardContainer as HTMLDivElement, ".order-card");
  } else {
    orderCardContainer.prepend(card);
  }

  //detailsButtonHandler(card);
}