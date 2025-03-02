import { Cliente } from "../classes/classes.js";
import { IDGenerator, Logger } from "../helpers.js";

export function handleClientFormSubmit(event: Event): Cliente {
  event.preventDefault();
  const clientForm = document.getElementById("clientForm") as HTMLElement;
  const firstName = (
    clientForm.querySelector("#firstName") as HTMLSelectElement
  ).value;
  const lastName = (clientForm.querySelector("#lastName") as HTMLSelectElement)
    .value;
  const email = (clientForm.querySelector("#email") as HTMLSelectElement).value;
  const paymentMethod = (
    clientForm.querySelector("#paymentMethod") as HTMLSelectElement
  ).value;
  const newClient = new Cliente(
    firstName,
    lastName,
    paymentMethod,
    email,
    IDGenerator.generateID()
  );
  return newClient;
}

export function createClientCard(client: Cliente): void {
  const clientCardContainer = document.getElementById("clientCardContainer");
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <h3>Client ${client.ID}</h3>
    <div class="item-row">
        <p>Nome:</p>
        <p>${client.nome}</p>
    </div>
    <div class="item-row">
        <p>Cognome: </p>
        <p>${client.cognome}</p>
    </div>
    <div class="item-row">
        <p>Email: </p>
        <p>${client.email}</p>
    </div>
    <div class="item-row">
        <p>Metodo di pagamento:</p>
        <p>${client.metodoPagamento}</p>
    </div>

  `;
  if (clientCardContainer) {
    clientCardContainer.prepend(card);
  } else {
    console.error("Elemento con id 'clientCardContainer' non trovato");
  }
}
