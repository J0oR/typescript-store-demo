export class Logger {
  static logSeparator(messageHeader: string, borderChar: string, messageBody: string): void {
    let side = borderChar === "#" ? "#" : "|";
    let angle = borderChar === "#" ? "#" : "+";
    const width = messageHeader.length + 2;
    const topBottom = angle + borderChar.repeat(width) + angle;
    const inBetween = side + " ".repeat(width) + side;
    const middle = side + " " + messageHeader + " " + side;
    console.log(topBottom + "\n" + inBetween + "\n" + middle + "\n" + inBetween + "\n" + topBottom);

    console.log(messageBody);
  }
}

/*
 * Genera un ID univoco
 */
export class IDGenerator {
  static generateID(): string {
    return (Date.now().toString(36) + Math.random().toString(36).slice(2, 5)).toUpperCase();
  }
}

/* 
local storage helpers 
*/
export function getLocalStorageData<T>(key: string, fallback: T): T {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
}

export function saveToLocalStorage(key: string, data: any) {
  const existingData = getLocalStorageData(key, null);
  if (JSON.stringify(existingData) !== JSON.stringify(data)) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

/*
* handle new added cards an

 */
export function animateCards(card: HTMLDivElement, cardContainer: HTMLDivElement, className: string): void {
  // Mark all existing cards before adding the new one
  const existingCards = document.querySelectorAll(className);

  // Delay applying "shift-down" only to existing cards
  existingCards.forEach((c) => {
    c.classList.add("shift-down");
  });

  setTimeout(() => {
    existingCards.forEach((c) => {
      c.classList.remove("shift-down");
    });
    card.classList.add("new-card");
    cardContainer.prepend(card);
    setTimeout(() => {
      card.classList.remove("new-card");
    }, 300);
  }, 300);
}

/*
 * handle form error messages
 */
export function formErrorMessage(condition: boolean, elemID: string, messageText: string): void {
  const element = document.getElementById(elemID) as HTMLInputElement;
  if (condition) {
    element.placeholder = messageText;
    element.value = ""; // Clear value
    element.classList.add("input-error"); // Add the error class to apply placeholder color
  } else {
    element.placeholder = "";
    element.classList.remove("input-error"); // Remove the error class when the condition is not met
  }
}

