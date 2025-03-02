import { ProcessoProduzione } from "./classes/classes.js";
import { Prodotto } from "./classes/classes.js";
import { Cliente } from "./classes/classes.js";
import { dettagliProcesso } from "./classes/types.js";
import {
  handleProductFormSubmit,
  createProductCard,
} from "./createCards/createItem.js";
import {
  createClientCard,
  handleClientFormSubmit,
} from "./createCards/createUser.js";
import {
  createOrderCard,
  handleOrderFormSubmit,
} from "./createCards/createOrder.js";

/* let prodotto1 = new Prodotto(
  "costume da bagno",
  IDGenerator.generateID(),
  "L",
  "rosso",
  "disponibile"
);
let prodotto2 = new Prodotto(
  "pareo",
  IDGenerator.generateID(),
  "M",
  "blue",
  "disponibile"
);

let prodotto3 = new Prodotto(
  "cappello",
  IDGenerator.generateID(),
  "XS",
  "verde",
  "disponibile"
);
let prodotto4 = new Prodotto(
  "costume da bagno",
  IDGenerator.generateID(),
  "S",
  "nero",
  "esaurito"
);

let processoRiciclo = new ProcessoProduzione(
  dettagliProcesso.nome,
  dettagliProcesso.descrizione
);
processoRiciclo.aggiungiProdotto(prodotto1);
processoRiciclo.aggiungiProdotto(prodotto4);
processoRiciclo.aggiungiProdotto(prodotto2);
processoRiciclo.aggiungiProdotto(prodotto3);

let cliente1 = new Cliente("Mario", "Rossi", "credito", IDGenerator.generateID());
let cliente2 = new Cliente("Giorgia", "Bianchi", "debito", IDGenerator.generateID());
let cliente3 = new Cliente("Giuseppe", "Verdi", "credito", IDGenerator.generateID());
let cliente4 = new Cliente("Francesco", "Neri", "debito", IDGenerator.generateID());

// 3 ordini
cliente1.ordinaProdotto(prodotto1);
cliente2.ordinaProdotto(prodotto2);
cliente3.ordinaProdotto(prodotto3);
// ordine di un prodotto esaurito
cliente4.ordinaProdotto(prodotto4);
// ordine già avvenuto
cliente2.ordinaProdotto(prodotto2);
// ordine di un altro cliente
cliente3.ordinaProdotto(prodotto2); */

const products: Prodotto[] = [];
const processoRiciclo = new ProcessoProduzione(
  dettagliProcesso.nome,
  dettagliProcesso.descrizione
);
const clients: Cliente[] = [];

const orders: Prodotto[] = [];

localStorage.setItem("processoRiciclo", JSON.stringify(processoRiciclo));

/**
 *
 *
 *  Forms submit listeners
 *
 *
 **/
document.addEventListener("DOMContentLoaded", function () {
  /* handle products form */
  const productForm = document.getElementById("productForm");
  if (productForm) {
    productForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // Get the product data from the form
      let newProduct: Prodotto = handleProductFormSubmit(event); // Call the function to get the product
      products.push(newProduct);
      createProductCard(newProduct);
      // Add the product to the processoRiciclo
      processoRiciclo.aggiungiProdotto(newProduct as Prodotto);
    });
  } else {
    console.error("Elemento con id 'productForm' non trovato");
  }

  /* handle clients form */
  const clientForm = document.getElementById("clientForm");
  if (clientForm) {
    clientForm.addEventListener("submit", (event) => {
      let newClient: Cliente = handleClientFormSubmit(event);
      const emailExists = clients.some(
        (client) => client.email === newClient.email
      );

      if (!emailExists) {
        clients.push(newClient);
        createClientCard(newClient);
      } else {
        console.log("Email già esistente, cliente non aggiunto.");
      }
    });
  } else {
    console.error("Elemento con id 'clienteForm' non trovato");
  }

  /* handle orders form */
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", (event) => {
      let newOrder: Prodotto | undefined = handleOrderFormSubmit(
        event,
        clients,
        products
      );
      if (newOrder) {
        orders.push(newOrder);

        // Rimuovi il prodotto da 'products', perchè è esaurito dopo l'ordine
        const productIndex = products.findIndex(
          (product) => product.ID === newOrder.ID
        );
        if (productIndex !== -1) {
          products.splice(productIndex, 1); // Rimuove il prodotto
        }

        // Trova e rimuovi la card associata al prodotto
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
          const productTitle = card.querySelector("h3");
          if (
            productTitle &&
            productTitle.innerHTML.includes(`Item ${newOrder.ID}`)
          ) {
            card.remove(); // Rimuove la card
          }
        });

        // creo card dell'ordine
        createOrderCard(newOrder);
      } else {
        console.error("Failed to submit order");
      }
    });
  } else {
    console.error("Elemento con id 'clienteForm' non trovato");
  }
});
/* 
document.addEventListener("DOMContentLoaded", function () {
  const prodCardContainer = document.getElementById("prodCardContainer");
  if (prodCardContainer) {
    // on refresh, update prodottiInProduzione in processoRiciclo
    processoRiciclo.updateClassItems();
    let items = JSON.parse(localStorage.getItem("items") || "{}");
    // iterare l'array in reverse order and append the cards
    for (let i = items.length - 1; i >= 0; i--) {
      let newProduct = items[i];
      createProductCard(newProduct, prodCardContainer);
    }
  }
}); */

/* 

function toggleMenu(){
  let overlay_menu = document.querySelector('.overlay-menu') as HTMLElement;
  if (overlay_menu) { // add null check
    let menu_state = overlay_menu.style.display;
    overlay_menu.style.display = menu_state === 'none' ? 'block' : 'none';
  } else {
    console.error("Elemento con classe 'overlay-menu' non trovato");
  }
}


//nab var
document.addEventListener('DOMContentLoaded', function() {
  const nav_prods = document.querySelector(".nav-link-products");
  const nav_clients = document.querySelector(".nav-link-clients");

  const prod_form = document.getElementById("productForm");
  const prodCardContainer = document.getElementById("prodCardContainer");
  const client_form = document.getElementById("clienteForm");
  const clientCardContainer = document.getElementById("clientCardContainer");

  nav_prods?.addEventListener("click", () => {
    prod_form?.classList.remove("hidden");
    prodCardContainer?.classList.remove("hidden");
    client_form?.classList.add("hidden");
    clientCardContainer?.classList.add("hidden");
  });

  nav_clients?.addEventListener("click", () => {
    client_form?.classList.remove("hidden");
    clientCardContainer?.classList.remove("hidden");
    prod_form?.classList.add("hidden");
    prodCardContainer?.classList.add("hidden");
  });
}); */
