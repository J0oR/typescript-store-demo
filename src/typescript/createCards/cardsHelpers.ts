/*
 * create rows
 */
export function createRows(array: {value: string | undefined }[]): string {
  return array
    .map(
      (item) => `
          <span>${item.value}</span>
    `
    )
    .join("");
}

/*
* handle details button
*/
/* export function detailsButtonHandler(card: HTMLElement): void {
  const detailsButton = card.querySelector(".details-button") as HTMLButtonElement;
  detailsButton.addEventListener("click", () => {
    detailsButton.innerHTML = detailsButton.innerHTML === "show details" ? "hide details" : "show details";
    (card.querySelector(".card-rows-container") as HTMLButtonElement).toggleAttribute("hidden");
  });
}
 */
/*
* handle add to order button
*/
export function addToOrderButtonHandler(card: HTMLElement, selectedElementID: string, newOrderIDs: string[], switcher: "client" | "product"): void {
    //const addToOrderButton = card.querySelector(".add-to-order-button") as HTMLButtonElement;
    const addToOrderCheckbox = card.querySelector(".add-to-order-checkbox") as HTMLInputElement;
    const inputFieldId = switcher === "client" ? "userID" : "productID";
    const cardClass = switcher === "client" ? ".user-card" : ".item-card";

    addToOrderCheckbox.addEventListener("change", () => {

    // Update the order IDs and the input field
    newOrderIDs[switcher === "client" ? 0 : 1] = selectedElementID;
    (document.getElementById(inputFieldId) as HTMLInputElement).value = selectedElementID;

    // Remove the "selected" class from all other cards & add it to the clicked card
    document.querySelectorAll(cardClass).forEach((c) => {
      const checkbox = (c.querySelector(".add-to-order-checkbox") as HTMLInputElement);
      checkbox.checked = false;
      c.classList.remove("selected");
    });

    // Add the "selected" class to the clicked card, disable the "Add to Order" button and change its innerHTML
    card.classList.add("selected");
    addToOrderCheckbox.checked = true;
  });
}
