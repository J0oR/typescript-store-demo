import { Cliente } from "../classes/classes.js";
import { IDGenerator } from "../helpers.js";
import { newOrderIDs } from "../app.js";
import { animateCards } from "../helpers.js";
import { createRows, addToOrderButtonHandler } from "./cardsHelpers.js";

export function handleClientFormSubmit(): Cliente {
  const formData = new FormData(document.getElementById("clientForm") as HTMLFormElement);
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const paymentMethod = formData.get("paymentMethod") as string;
  return createClient(firstName, lastName, paymentMethod, email, IDGenerator.generateID());
}

export function createClient(nome: string, cognome: string, metodoPagamento: string, email: string, ID: number): Cliente {
  return new Cliente(nome, cognome, metodoPagamento, email, ID);
}

export function createClientCard(client: Cliente, when?: string): void {
  const clientCardContainer = document.getElementById("clientCardContainer");
  if (!clientCardContainer) {
    console.error("Elemento con id 'clientCardContainer' non trovato");
    return;
  }

  const card = document.createElement("div");
  card.classList.add("card", "user-card");
  const clientDetails = [
    { label: "name", value: client.nome },
    { label: "surname", value: client.cognome },
    { label: "email", value: client.email },
    { label: "payment", value: client.metodoPagamento },
  ];

  card.innerHTML = `
    <span>${client.ID}</span>
    ${createRows(clientDetails, "Client details", "")}
    <input type="checkbox" id="item-checkbox" name="item-checkbox" class="add-to-order-checkbox">
  
  `;

  if (when && when === "form") {
    animateCards(card, clientCardContainer as HTMLDivElement, ".user-card");
  } else {
    clientCardContainer.prepend(card);
  }

  //detailsButtonHandler(card);

  addToOrderButtonHandler(card, client.ID.toString(), newOrderIDs, "client");
}
