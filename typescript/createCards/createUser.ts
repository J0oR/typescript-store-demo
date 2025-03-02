import { Cliente } from "../classes/classes.js";
import { IDGenerator, Logger } from "../helpers.js";
import { newOrder } from "../app.js"; // Import the newOrder from the other file

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
  card.classList.add("card", "user-card");
  card.innerHTML = `
    <h3>Client ${client.ID}</h3>
    <div class="item-row">
        <p>Name:</p>
        <p>${client.nome}</p>
    </div>
    <div class="item-row">
        <p>Surname: </p>
        <p>${client.cognome}</p>
    </div>
    <div class="item-row">
        <p>Email: </p>
        <p>${client.email}</p>
    </div>
    <div class="item-row">
        <p>payMethod:</p>
        <p>${client.metodoPagamento}</p>
    </div>

  `;
  if (clientCardContainer) {
    clientCardContainer.prepend(card);
  } else {
    console.error("Elemento con id 'clientCardContainer' non trovato");
  }

  // Add a click event listener to the card
  card.addEventListener("click", () => {
    const formUserIdInput = document.getElementById("userID") as HTMLInputElement;
    newOrder[0] = client.ID.toString(); // Access the imported newOrder variable
    formUserIdInput.value = client.ID.toString();
    document.querySelectorAll(".user-card").forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
  });
}
