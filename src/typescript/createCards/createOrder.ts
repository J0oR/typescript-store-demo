import { Prodotto } from "../classes/classes.js";
import { Cliente } from "../classes/classes.js";
import { animateCards } from "../helpers.js";

export function handleOrderFormSubmit(event: Event, clients: Cliente[], products: Prodotto[]): Prodotto | undefined {
  event.preventDefault();

  const orderForm = document.getElementById("orderForm") as HTMLElement;
  const userID = parseInt((orderForm.querySelector("#userID") as HTMLSelectElement).value, 10);
  const productID = parseInt((orderForm.querySelector("#productID") as HTMLSelectElement).value, 10);

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

export function createOrderCard(order: Prodotto, when?: string): void {
  const orderCardContainer = document.getElementById("orderCardContainer");
  if (!orderCardContainer) {
    console.error("Elemento con id 'orderCardContainer' non trovato");
    return;
  }
  const card = document.createElement("div");
  card.classList.add("card", "order-card");
  card.innerHTML = `
        <h3>Item ${order.ID}</h3>
        <div class="card-rows-container" hidden>
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
          <div class="item-row order-client-id">
           <p>Client </p>
           <p>${order.cliente?.ID}</p>
          </div>
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

  const detailsButton = card.querySelector('.details-button') as HTMLButtonElement;
  detailsButton.addEventListener("click", () => {
    detailsButton.innerHTML = detailsButton.innerHTML === 'show details' ? 'hide details' : 'show details';
    (card.querySelector('.card-rows-container') as HTMLButtonElement).toggleAttribute('hidden');
  });
}
