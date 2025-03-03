import { ProcessoProduzione } from "./classes/classes.js";
import { dettagliProcesso } from "./classes/types.js";
import { handleProductFormSubmit, createProduct, createProductCard } from "./createCards/createItem.js";
import { createClientCard, handleClientFormSubmit, createClient } from "./createCards/createUser.js";
import { createOrderCard, handleOrderFormSubmit } from "./createCards/createOrder.js";
import { saveToLocalStorage, getLocalStorageData } from "./helpers.js";
let products = [];
export const processoRiciclo = new ProcessoProduzione(dettagliProcesso.nome, dettagliProcesso.descrizione);
let clients = [];
let orders = [];
export let newOrderIDs = ["", ""];
/*
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("clients", JSON.stringify(clients));
  localStorage.setItem("orders", JSON.stringify(orders));
 */
function initializeLocalStorageData() {
    // check localstorage products
    const localStorageproducts = getLocalStorageData("products", []);
    localStorageproducts.forEach((prodotto) => {
        const prod = createProduct(prodotto.tipo, prodotto.ID, prodotto.taglia, prodotto.colore, prodotto.stato);
        products.push(prod);
        createProductCard(prod);
    });
    // check localstorage clients
    const localStorageClients = getLocalStorageData("clients", []);
    localStorageClients.forEach((client) => {
        const usr = createClient(client.nome, client.cognome, client.metodoPagamento, client.email, client.ID);
        clients.push(usr);
        createClientCard(usr);
    });
    // check localstorage orders
    const localStorageOrders = getLocalStorageData("orders", []);
    localStorageOrders.forEach((order) => {
        let prod = createProduct(order.tipo, order.ID, order.taglia, order.colore, "disponibile");
        let client = clients.find((client) => { var _a; return client.ID === ((_a = order.cliente) === null || _a === void 0 ? void 0 : _a.ID); });
        client === null || client === void 0 ? void 0 : client.ordinaProdotto(prod);
        orders.push(prod);
        createOrderCard(prod);
    });
}
/************************** Forms submit listeners *************************/
function attachFormListeners() {
    var _a, _b, _c;
    /*
     * handle products form
     */
    (_a = document.getElementById("productForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (event) => {
        event.preventDefault();
        // Get the product data from the form
        let newProduct = handleProductFormSubmit();
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
    (_b = document.getElementById("clientForm")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", (event) => {
        event.preventDefault();
        let newClient = handleClientFormSubmit();
        // Check if the email already exists
        if (!clients.some((client) => client.email === newClient.email)) {
            // Add the client to the clients array
            clients.push(newClient);
            // creo card
            createClientCard(newClient);
            // update localStorage
            saveToLocalStorage("clients", clients);
        }
        else {
            console.log("Email già esistente, cliente non aggiunto.");
        }
    });
    /*
     * handle orders form
     */
    (_c = document.getElementById("orderForm")) === null || _c === void 0 ? void 0 : _c.addEventListener("submit", (event) => {
        let newOrder = handleOrderFormSubmit(event, clients, products);
        if (newOrder) {
            // move product to orders
            moveProductToOrders(newOrder.ID);
            // Add the order to the orders array
            orders.push(newOrder);
            // creo card dell'ordine
            createOrderCard(newOrder);
            // update localStorage
            saveToLocalStorage("orders", orders);
        }
        else {
            console.error("Failed to submit order");
        }
    });
}
/*
 * move product to orders
 */
function moveProductToOrders(productID) {
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
    initializeLocalStorageData();
    attachFormListeners();
});
