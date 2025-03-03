import { Logger } from "../helpers.js";
/************************ PRODOTTO ***************************/
export class Prodotto {
    constructor(tipo, ID, taglia, colore, stato) {
        this.tipo = tipo;
        this.ID = ID;
        this.taglia = taglia;
        this.colore = colore;
        this.stato = stato;
        this.cliente = null;
        this.statoOrdine = "non ordinato";
    }
    assegnaCliente(cliente) {
        let message = "";
        // Verifica se il cliente ha già acquistato il prodotto
        if (this.cliente && this.cliente.ID === cliente.ID) {
            message = `Il cliente ${cliente.nome} ${cliente.cognome} ha già acquistato questo prodotto.`;
            Logger.logSeparator(message, "-", `${JSON.stringify(this, null, 2)}\n`);
            return;
        }
        if (this.stato === "esaurito") {
            message = `Il cliente ${cliente.nome} ${cliente.cognome} vorrebbe ordinare un prodotto esaurito`;
        }
        else {
            this.cliente = cliente;
            message = `Il cliente ${cliente.nome} ${cliente.cognome} ha effettuato un ordine`;
            this.statoOrdine = "ordinato";
            this.stato = "esaurito";
        }
        Logger.logSeparator(message, "-", `\n${JSON.stringify(this, null, 2)}\n`);
    }
}
/**************************** CLIENTE ******************************/
export class Cliente {
    constructor(nome, cognome, metodoPagamento, email, ID) {
        this.nome = nome;
        this.cognome = cognome;
        this.metodoPagamento = metodoPagamento;
        this.email = email;
        this.ID = ID;
    }
    ordinaProdotto(prodotto) {
        prodotto.assegnaCliente(this);
    }
}
/* ********************** PROCESSO PRODUZIONE ********************** */
export class ProcessoProduzione {
    constructor(nome, descrizione) {
        this.nome = nome;
        this.descrizione = descrizione;
        this.prodottiInProduzione = [];
    }
    aggiungiProdotto(prodotto) {
        const prodottoEsistente = this.prodottiInProduzione.some((p) => p.ID === prodotto.ID);
        if (prodottoEsistente) {
            console.log(`Il prodotto con ID ${prodotto.ID} è già in produzione.`);
        }
        else {
            this.prodottiInProduzione.unshift(prodotto);
            let message = `Prodotto aggiunto al processo di produzione ${this.nome}`;
            Logger.logSeparator(message, "#", `\n${JSON.stringify(prodotto, null, 2)}\n\n`);
        }
    }
}
