import { Cliente } from "../classes/classes.js";
import { IDGenerator } from "../helpers.js";
export function handleClientFormSubmit(event) {
    event.preventDefault();
    const clientForm = document.getElementById("clientForm");
    const firstName = clientForm.querySelector("#firstName").value;
    const lastName = clientForm.querySelector("#lastName")
        .value;
    const email = clientForm.querySelector("#email").value;
    const paymentMethod = clientForm.querySelector("#paymentMethod").value;
    const newClient = new Cliente(firstName, lastName, paymentMethod, email, IDGenerator.generateID());
    return newClient;
}
export function createClientCard(client) {
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
    }
    else {
        console.error("Elemento con id 'clientCardContainer' non trovato");
    }
}
