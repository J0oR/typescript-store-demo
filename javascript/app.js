import { ProcessoProduzione } from "./classes/classes.js";
import { dettagliProcesso } from "./classes/types.js";
import { handleProductFormSubmit, createProduct, createProductCard } from "./createCards/createItem.js";
import { createClientCard, handleClientFormSubmit, createClient } from "./createCards/createUser.js";
import { createOrderCard, handleOrderFormSubmit } from "./createCards/createOrder.js";
let products = [];
export const processoRiciclo = new ProcessoProduzione(dettagliProcesso.nome, dettagliProcesso.descrizione);
let clients = [];
let orders = [];
export let newOrderIDs = ["", ""];
localStorage.setItem("processoRiciclo", JSON.stringify(processoRiciclo));
/*  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("clients", JSON.stringify(clients));
  localStorage.setItem("orders", JSON.stringify(orders));
 */
document.addEventListener("DOMContentLoaded", function () {
    // check localstorage products
    if (localStorage.getItem("products")) {
        const localStorageproducts = JSON.parse(localStorage.getItem("products") || "[]");
        localStorageproducts.map((prodotto) => {
            const prod = createProduct(prodotto.tipo, prodotto.ID, prodotto.taglia, prodotto.colore, prodotto.stato);
            products.push(prod);
            createProductCard(prod);
        });
    }
    else {
        localStorage.setItem("products", JSON.stringify(products));
    }
    // check localstorage clients
    if (localStorage.getItem("clients")) {
        const localStorageClients = JSON.parse(localStorage.getItem("clients") || "[]");
        localStorageClients.map((client) => {
            const usr = createClient(client.nome, client.cognome, client.metodoPagamento, client.email, client.ID);
            clients.push(usr);
            createClientCard(usr);
        });
    }
    else {
        localStorage.setItem("clients", JSON.stringify(clients));
    }
    // check localstorage orders
    if (localStorage.getItem("orders")) {
        const localStorageOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        localStorageOrders.map((order) => {
            let prod = createProduct(order.tipo, order.ID, order.taglia, order.colore, order.stato);
            if (order.cliente) {
                let client = clients.find((client) => { var _a; return client.ID === ((_a = order.cliente) === null || _a === void 0 ? void 0 : _a.ID); });
                console.log(client, typeof client);
                if (client) {
                    prod.stato = "disponibile";
                    client.ordinaProdotto(prod);
                    prod.stato = "esaurito";
                    //prod.cliente = client;
                    orders.push(prod);
                    createOrderCard(prod);
                }
                else {
                    console.log("No client associated with the order", order);
                }
            }
        });
    }
    else {
        localStorage.setItem("orders", JSON.stringify(orders));
    }
});
/************************** Forms submit listeners *************************/
document.addEventListener("DOMContentLoaded", function () {
    /*
     * handle products form
     */
    const productForm = document.getElementById("productForm");
    if (productForm) {
        productForm.addEventListener("submit", (event) => {
            event.preventDefault();
            // Get the product data from the form
            let newProduct = handleProductFormSubmit(); // Call the function to get the product
            // Add the product to the products array
            products.push(newProduct);
            // creo card
            createProductCard(newProduct);
            // update localStorage
            localStorage.setItem("products", JSON.stringify(products));
        });
    }
    else {
        console.error("Elemento con id 'productForm' non trovato");
    }
    /*
     * handle clients form
     */
    const clientForm = document.getElementById("clientForm");
    if (clientForm) {
        clientForm.addEventListener("submit", (event) => {
            event.preventDefault();
            let newClient = handleClientFormSubmit();
            // Check if the email already exists
            if (!clients.some((client) => client.email === newClient.email)) {
                // Add the client to the clients array
                clients.push(newClient);
                // creo card
                createClientCard(newClient);
                // update localStorage
                localStorage.setItem("clients", JSON.stringify(clients));
            }
            else {
                console.log("Email già esistente, cliente non aggiunto.");
            }
        });
    }
    else {
        console.error("Elemento con id 'clienteForm' non trovato");
    }
    /*
     * handle orders form
     */
    const orderForm = document.getElementById("orderForm");
    if (orderForm) {
        orderForm.addEventListener("submit", (event) => {
            let newOrder = handleOrderFormSubmit(event, clients, products);
            if (newOrder) {
                // move product to orders
                moveProductToOrders(newOrder.ID);
                // Add the order to the orders array
                orders.push(newOrder);
                // creo card dell'ordine
                createOrderCard(newOrder);
                // update localStorage
                localStorage.setItem("orders", JSON.stringify(orders));
            }
            else {
                console.error("Failed to submit order");
            }
        });
    }
    else {
        console.error("Elemento con id 'clienteForm' non trovato");
    }
});
/*
 * move product to orders
 */
function moveProductToOrders(productID) {
    // Remove the product from 'products' because it is out of stock after the order
    products = products.filter((product) => product.ID !== productID);
    // Update localStorage after filtering products
    localStorage.setItem("products", JSON.stringify(products));
    // Trova e rimuovi la card associata al prodotto
    document.querySelectorAll(".card").forEach((card) => {
        var _a;
        if ((_a = card.querySelector("h3")) === null || _a === void 0 ? void 0 : _a.innerHTML.includes(`Item ${productID}`)) {
            card.remove();
        }
    });
}
