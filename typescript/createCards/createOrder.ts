import { Prodotto } from "../classes/classes.js";
import { Cliente } from "../classes/classes.js";

export function handleOrderFormSubmit(event: Event, clients: Cliente[], products: Prodotto[]): Prodotto | undefined {
  event.preventDefault();

  const orderForm = document.getElementById("orderForm") as HTMLElement;
  const userID = parseInt((orderForm.querySelector("#userID") as HTMLSelectElement).value,10);
  const productID = parseInt((orderForm.querySelector("#productID") as HTMLSelectElement).value,10);

  let selectedUser = clients.find((client) => client.ID === userID);
  let selectedProduct = products.find((item) => item.ID === productID);

  if (!selectedUser || !selectedProduct) {
    console.log("Undefined", selectedProduct, selectedUser);
    return undefined;
  }
  selectedUser.ordinaProdotto(selectedProduct);
  // Reset the form
  (orderForm.querySelector("#userID") as HTMLSelectElement).value = "";
  (orderForm.querySelector("#productID") as HTMLSelectElement).value = "";
  // Remove the 'selected' class from all cards
  document.querySelectorAll(".user-card").forEach((c) => c.classList.remove("selected"));
  document.querySelectorAll(".item-card").forEach((c) => c.classList.remove("selected"));
  return selectedProduct;
}

export function createOrderCard(order: Prodotto): void {
  const orderCardContainer = document.getElementById("orderCardContainer");
  const card = document.createElement("div");
  card.classList.add("card", "order-card");
  card.innerHTML = `
        <h3>Item ${order.ID}</h3>
    <div class="item-row">
        <p>type: </p>
        <p>${order.tipo}</p>
    </div>
    <div class="item-row">
        <p>color: </p>
        <p>${order.colore}</p>
    </div>
    <div class="item-row">
        <p>size: </p>
        <p>${order.taglia}</p>
    </div>
    <div class="item-row">
        <p>state:</p>
        <p>${order.stato}</p>
    </div>
        <h3>Client ${order.cliente?.ID}</h3>
    <div class="item-row">
        <p>name:</p>
        <p>${order.cliente?.nome}</p>
    </div>
    <div class="item-row">
        <p>surname:</p>
        <p>${order.cliente?.cognome}</p>
    </div>
    <div class="item-row">
        <p>payment:</p>
        <p>${order.cliente?.metodoPagamento}</p>
    </div>
    <div class="item-row">
        <p>email:</p>
        <p>${order.cliente?.email}</p>
    </div>
  `;
  if (orderCardContainer) {
    orderCardContainer.prepend(card);
  } else {
    console.error("Elemento con id 'orderCardContainer' non trovato");
  }
}
