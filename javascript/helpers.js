export class Logger {
    static logSeparator(messageHeader, borderChar, messageBody) {
        let side = borderChar === "#" ? "#" : "|";
        let angle = borderChar === "#" ? "#" : "+";
        const width = messageHeader.length + 2;
        const topBottom = angle + borderChar.repeat(width) + angle;
        const inBetween = side + " ".repeat(width) + side;
        const middle = side + " " + messageHeader + " " + side;
        /* console.log(
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
        console.log(messageBody); */
    }
}
export class IDGenerator {
    static generateID() {
        // Combina timestamp e numero casuale
        return Date.now() * 1000 + Math.floor(Math.random() * 1000);
    }
}
