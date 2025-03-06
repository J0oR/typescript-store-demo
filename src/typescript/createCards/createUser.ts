import { Cliente } from "../classes/classes.js";
import { IDGenerator } from "../helpers.js";
import { newOrderIDs } from "../app.js";
import { animateCards } from "../helpers.js";

export function handleClientFormSubmit(): Cliente {
  const clientForm = document.getElementById("clientForm") as HTMLElement;
  const firstName = (clientForm.querySelector("#firstName") as HTMLSelectElement).value;
  const lastName = (clientForm.querySelector("#lastName") as HTMLSelectElement).value;
  const email = (clientForm.querySelector("#email") as HTMLSelectElement).value;
  const paymentMethod = (clientForm.querySelector("#paymentMethod") as HTMLSelectElement).value;
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
  card.innerHTML = `
    <h3>Client ${client.ID}</h3>
    <div class="card-rows-container" hidden>
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
    </div>
    <div class="card-btn-container">
      <button class="details-button">show details</button>  
      <button class="add-to-order-button">add to order</button>  
    </div> 
  `;

  if (when && when === "form") {
    animateCards(card, clientCardContainer as HTMLDivElement, ".user-card");
  } else {
    clientCardContainer.prepend(card);
  }

  const detailsButton = card.querySelector(".details-button") as HTMLButtonElement;
  detailsButton.addEventListener("click", () => {
    detailsButton.innerHTML = detailsButton.innerHTML === "show details" ? "hide details" : "show details";
    (card.querySelector(".card-rows-container") as HTMLButtonElement).toggleAttribute("hidden");
  });

  // Add a click event listener to the card
  (card.querySelector(".add-to-order-button") as HTMLButtonElement).addEventListener("click", () => {
    // Update the newOrder array & the input field on the form
    newOrderIDs[0] = client.ID.toString();
    (document.getElementById("userID") as HTMLInputElement).value = client.ID.toString();
    // Remove the "selected" class from all other cards & add it to the clicked card
    document.querySelectorAll(".user-card").forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
  });
}
