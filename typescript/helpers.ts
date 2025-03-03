export class Logger {
  static logSeparator(
    messageHeader: string,
    borderChar: string,
    messageBody: string
  ): void {
    let side = borderChar === "#" ? "#" : "|";
    let angle = borderChar === "#" ? "#" : "+";
    const width = messageHeader.length + 2;
    const topBottom = angle + borderChar.repeat(width) + angle;
    const inBetween = side + " ".repeat(width) + side;
    const middle = side + " " + messageHeader + " " + side;
    console.log(
      topBottom +
        "\n" +
        inBetween +
        "\n" +
        middle +
        "\n" +
        inBetween +
        "\n" +
        topBottom
    );
    
    console.log(messageBody);
  }
}


export class IDGenerator {
  static generateID(): number {
      // Combina timestamp e numero casuale
    return Date.now() * 1000 + Math.floor(Math.random() * 1000);
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