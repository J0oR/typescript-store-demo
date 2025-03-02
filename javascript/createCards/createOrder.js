export function handleOrderFormSubmit(event, clients, products) {
    event.preventDefault();
    const orderForm = document.getElementById("orderForm");
    const userID = parseInt(orderForm.querySelector("#userID").value, 10);
    const productID = parseInt(orderForm.querySelector("#productID").value, 10);
    let selectedUser = clients.find((client) => client.ID === userID);
    let selectedProduct = products.find((item) => item.ID === productID);
    if (!selectedUser || !selectedProduct) {
        console.log("Undefined", selectedProduct, selectedUser);
        return undefined;
    }
    selectedUser.ordinaProdotto(selectedProduct);
    orderForm.querySelector("#userID").value = "";
    orderForm.querySelector("#productID").value = "";
    document.querySelectorAll(".user-card").forEach((c) => c.classList.remove("selected"));
    document.querySelectorAll(".item-card").forEach((c) => c.classList.remove("selected"));
    return selectedProduct;
}
export function createOrderCard(order) {
    var _a, _b, _c, _d, _e;
    const orderCardContainer = document.getElementById("orderCardContainer");
    const card = document.createElement("div");
    card.classList.add("card", "order-card");
    card.innerHTML = `
        <h3>Item ${order.ID}</h3>
    <div class="item-row">
        <p>type: </p>
        <p>${order.tipo}</p>
    </div>
    <div class="item-row">
        <p>color: </p>
        <p>${order.colore}</p>
    </div>
    <div class="item-row">
        <p>size: </p>
        <p>${order.taglia}</p>
    </div>
    <div class="item-row">
        <p>state:</p>
        <p>${order.stato}</p>
    </div>
        <h3>Client ${(_a = order.cliente) === null || _a === void 0 ? void 0 : _a.ID}</h3>
    <div class="item-row">
        <p>name:</p>
        <p>${(_b = order.cliente) === null || _b === void 0 ? void 0 : _b.nome}</p>
    </div>
    <div class="item-row">
        <p>surname:</p>
        <p>${(_c = order.cliente) === null || _c === void 0 ? void 0 : _c.cognome}</p>
    </div>
    <div class="item-row">
        <p>payment:</p>
        <p>${(_d = order.cliente) === null || _d === void 0 ? void 0 : _d.metodoPagamento}</p>
    </div>
    <div class="item-row">
        <p>email:</p>
        <p>${(_e = order.cliente) === null || _e === void 0 ? void 0 : _e.email}</p>
    </div>
  `;
    if (orderCardContainer) {
        orderCardContainer.prepend(card);
    }
    else {
        console.error("Elemento con id 'orderCardContainer' non trovato");
    }
}
