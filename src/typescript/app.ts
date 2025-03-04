import { ProcessoProduzione, Prodotto, Cliente } from "./classes/classes.js";
import { dettagliProcesso } from "./classes/types.js";
import { handleProductFormSubmit, createProduct, createProductCard } from "./createCards/createItem.js";
import { createClientCard, handleClientFormSubmit, createClient } from "./createCards/createUser.js";
import { createOrderCard, handleOrderFormSubmit } from "./createCards/createOrder.js";
import { saveToLocalStorage, getLocalStorageData } from "./helpers.js";
import '../scss/style.scss';

let products: Prodotto[] = [];
export const processoRiciclo = new ProcessoProduzione(dettagliProcesso.nome, dettagliProcesso.descrizione);
let clients: Cliente[] = [];
let orders: Prodotto[] = [];
export let newOrderIDs: [string, string] = ["", ""];

/*
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("clients", JSON.stringify(clients));
  localStorage.setItem("orders", JSON.stringify(orders)); 
 */

function initializeLocalStorageData() {

  // check localstorage products
  const localStorageproducts = getLocalStorageData<Prodotto[]>("products", []);
  localStorageproducts.forEach((prodotto: Prodotto) => {
    const prod = createProduct(prodotto.tipo, prodotto.ID, prodotto.taglia, prodotto.colore, prodotto.stato);
    products.push(prod);
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
      orders.push(prod);
      createOrderCard(prod);
  });
}

/************************** Forms submit listeners *************************/

function attachFormListeners() {
  /*
   * handle products form
   */
  document.getElementById("productForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    // Get the product data from the form
    let newProduct: Prodotto = handleProductFormSubmit();
    // Add the product to the products array
    products.push(newProduct);
    // creo card
    createProductCard(newProduct);
    // update localStorage
    saveToLocalStorage("products", products);
  });
  /*
   * handle clients form
   */
  document.getElementById("clientForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    let newClient: Cliente = handleClientFormSubmit();
    // Check if the email already exists
    if (!clients.some((client) => client.email === newClient.email)) {
      // Add the client to the clients array
      clients.push(newClient);
      // creo card
      createClientCard(newClient);
      // update localStorage
      saveToLocalStorage("clients", clients);
    } else {
      console.log("Email già esistente, cliente non aggiunto.");
    }
  });
  /*
   * handle orders form
   */
  document.getElementById("orderForm")?.addEventListener("submit", (event) => {
    let newOrder: Prodotto | undefined = handleOrderFormSubmit(event, clients, products);
    if (newOrder) {
      // move product to orders
      moveProductToOrders(newOrder.ID);
      // Add the order to the orders array
      orders.push(newOrder);
      // creo card dell'ordine
      createOrderCard(newOrder);
      // update localStorage
      saveToLocalStorage("orders", orders);
    } else {
      console.error("Failed to submit order");
    }
  });
}

/*
 * move product to orders
 */
function moveProductToOrders(productID: number): void {
  // Remove the product from 'products' because it is out of stock after the order
  products = products.filter((product) => product.ID !== productID);
  // Update localStorage after filtering products
  saveToLocalStorage("products", products);
  // Trova e rimuovi la card associata al prodotto
  // Find and remove the card based on the product ID
  const card = document.querySelector(`[data-product-id="${productID}"]`);
  if (card) {
    card.remove();
  }
}

// Initialize application
document.addEventListener("DOMContentLoaded", () => {

  const productButton = document.querySelector(".product-toggle-btn") as HTMLButtonElement;
  productButton.addEventListener("click", () => {
    productButton.innerHTML = productButton.innerHTML === '+' ? '-' : '+';
    (document.querySelector(".product-toggable") as HTMLElement).toggleAttribute('hidden');
  });
  const clientButton = document.querySelector(".client-toggle-btn") as HTMLButtonElement;
  clientButton.addEventListener("click", () => {
    clientButton.innerHTML = clientButton.innerHTML === '+' ? '-' : '+';
    (document.querySelector(".client-toggable") as HTMLElement).toggleAttribute('hidden');
  });
  const orderButton = document.querySelector(".order-toggle-btn") as HTMLButtonElement;
  orderButton.addEventListener("click", () => {
    orderButton.innerHTML = orderButton.innerHTML === '+' ? '-' : '+';
    (document.querySelector(".order-toggable") as HTMLElement).toggleAttribute('hidden');
  });
  
  initializeLocalStorageData();
  attachFormListeners();
});
