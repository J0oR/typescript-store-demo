/*
 * create rows
 */
export function createRows(array: { label: string; value: string | undefined }[], label: string, value: string): string {
  return array
    .map(
      (item) => `
        <div class="item-row">
          <p>${item.label}</p>
          <p>${item.value}</p>
        </div>
    `
    )
    .join("");
}

/*
* handle details button
*/
export function detailsButtonHandler(card: HTMLElement): void {
  const detailsButton = card.querySelector(".details-button") as HTMLButtonElement;
  detailsButton.addEventListener("click", () => {
    detailsButton.innerHTML = detailsButton.innerHTML === "show details" ? "hide details" : "show details";
    (card.querySelector(".card-rows-container") as HTMLButtonElement).toggleAttribute("hidden");
  });
}

/*
* handle add to order button
*/
export function addToOrderButtonHandler(card: HTMLElement, selectedElementID: string, newOrderIDs: string[], switcher: "client" | "product"): void {
    const addToOrderButton = card.querySelector(".add-to-order-button") as HTMLButtonElement;
    const inputFieldId = switcher === "client" ? "userID" : "productID";
    const cardClass = switcher === "client" ? ".user-card" : ".item-card";

    addToOrderButton.addEventListener("click", () => {

    // Update the order IDs and the input field
    newOrderIDs[switcher === "client" ? 0 : 1] = selectedElementID;
    (document.getElementById(inputFieldId) as HTMLInputElement).value = selectedElementID;

    // Remove the "selected" class from all other cards & add it to the clicked card
    // Remove the "selected" class from all other cards
    // enable the "Add to Order" button and change its innerHTML
    document.querySelectorAll(cardClass).forEach((c) => {
      const button = (c.querySelector(".add-to-order-button") as HTMLButtonElement);
      button.disabled = false;
      button.innerHTML = "Add to Order";
      c.classList.remove("selected");
    });

    // Add the "selected" class to the clicked card, disable the "Add to Order" button and change its innerHTML
    card.classList.add("selected");
    addToOrderButton.innerHTML = "added";
    addToOrderButton.disabled = true;
  });
}
