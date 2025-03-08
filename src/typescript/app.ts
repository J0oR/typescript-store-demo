import { ProcessoProduzione, Prodotto, Cliente } from "./classes/classes.js";
import { dettagliProcesso } from "./classes/types.js";
import { handleProductFormSubmit, createProduct, createProductCard } from "./createCards/createItem.js";
import { createClientCard, handleClientFormSubmit, createClient } from "./createCards/createUser.js";
import { createOrderCard, handleOrderFormSubmit } from "./createCards/createOrder.js";
import { saveToLocalStorage, getLocalStorageData, formErrorMessage } from "./helpers.js";
import "../scss/style.scss";

import logo from "../imgs/logo.webp";
const logoImg = document.querySelector(".logo-img") as HTMLImageElement;
if (logoImg) {
  logoImg.src = logo;
}

export const processoRiciclo = new ProcessoProduzione(dettagliProcesso.nome, dettagliProcesso.descrizione);
let clients: Cliente[] = [];
export let newOrderIDs: [string, string] = ["", ""];

/*
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("clients", JSON.stringify(clients));
  localStorage.setItem("orders", JSON.stringify(orders)); 
*/

/*
 *  INITIALIZE LOCALSTORAGE DATA WHEN THE PAGE IS LOADED
 */
function initializeLocalStorageData() {
  // check localstorage products
  const localStorageproducts = getLocalStorageData<Prodotto[]>("products", []);
  localStorageproducts.forEach((prodotto: Prodotto) => {
    console.log("AAAA", prodotto);
    const prod = createProduct(prodotto.tipo, prodotto.ID, prodotto.taglia, prodotto.colore, prodotto.stato);
    //products.push(prod);
    createProductCard(prod);
  });
  // check localstorage clients
  const localStorageClients = getLocalStorageData<Cliente[]>("clients", []);
  localStorageClients.forEach((client: Cliente) => {
    const usr = createClient(client.nome, client.cognome, client.metodoPagamento, client.email, client.ID);
    clients.push(usr);
    createClientCard(usr);
  });
  // check localstorage orders
  const localStorageOrders = getLocalStorageData<Prodotto[]>("orders", []);
  localStorageOrders.forEach((order: Prodotto) => {
    let prod: Prodotto = createProduct(order.tipo, order.ID, order.taglia, order.colore, "disponibile");
    let client: Cliente | undefined = clients.find((client) => client.ID === order.cliente?.ID);
    client?.ordinaProdotto(prod);
    //orders.push(prod);
    processoRiciclo.spostaInOrdinati(prod);
    createOrderCard(prod);
  });
}

/*
 *  ATTACH FORM LISTENERS
 */
function attachFormListeners() {
  // handle products form
  document.getElementById("productForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    // Get the product data from the form
    let newProduct: Prodotto = handleProductFormSubmit();
    // make card and update localStorage
    createProductCard(newProduct, "form");
    saveToLocalStorage("products", processoRiciclo.prodottiInProduzione);
  });

  // handle clients form
  const clientsForm = document.getElementById("clientForm") as HTMLFormElement;
  clientsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let newClient: Cliente = handleClientFormSubmit();
    let clientExists = clients.some((client) => client.email === newClient.email);
    formErrorMessage(clientExists, "clientForm", "error-message-email-existing", "A client with this email already exists!");
    // Check if the email already exists
    if (!clientExists) {
      // Add client to clients array, create card and update localStorage
      clients.push(newClient);
      createClientCard(newClient, "form");
      saveToLocalStorage("clients", clients);
    }
  });

  // handle orders form
  document.getElementById("orderForm")?.addEventListener("submit", (event) => {
    let newOrder: Prodotto | undefined = handleOrderFormSubmit(event, clients);
    if (newOrder) {
      // move product to orders
      processoRiciclo.spostaInOrdinati(newOrder);
      // remove card from products and add card to orders
      document.querySelector(`[data-product-id="${newOrder.ID}"]`)?.remove();
      createOrderCard(newOrder, "form");
      // Update localStorage after filtering products
      saveToLocalStorage("products", processoRiciclo.prodottiInProduzione);
      saveToLocalStorage("orders", processoRiciclo.prodottiOrdinati);
    }
  });
}

/*
 *  ADD EVENT LISTENERS TO THE NAVIGATION LINKS
 */
function addNavigationListeners() {
  const navLinks = document.querySelectorAll<HTMLButtonElement>(".nav-link");
  const sections = document.querySelectorAll<HTMLElement>(".section");
  // Add click event listener to each navigation link
  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", () => {
      // Hide all sections and show the section associated with the clicked link
      sections.forEach((section) => (section.hidden = !(navLink.dataset.section! == section.dataset.section!)));
      // Disable all navigation links and enable the clicked link
      navLinks.forEach((link) => {
        link.disabled = link === navLink;
        link.classList.toggle("active", link === navLink);
      });
    });
  });
}

/*
 * ON PAGE LOAD ATTACH LISTENERS
 */
document.addEventListener("DOMContentLoaded", () => {
  addNavigationListeners();
  initializeLocalStorageData();
  attachFormListeners();
});
