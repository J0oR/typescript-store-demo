import { IProdotto, ICliente, IProcessoProduzione, dettagliProcesso } from "./types";

import { Logger } from "../helpers.js";

/************************ PRODOTTO ***************************/

export class Prodotto implements IProdotto {
  cliente: ICliente | null = null;

  constructor(public tipo: "costume da bagno" | "pareo" | "cappello", public ID: number, public taglia: string, public colore: string, public stato: "esaurito" | "disponibile") {}

  assegnaCliente(cliente: ICliente): void {
    let message = "";

    // Verifica se il cliente ha già acquistato il prodotto
    if (this.cliente && this.cliente.ID === cliente.ID) {
      message = `Il cliente ${cliente.nome} ${cliente.cognome} ha già acquistato questo prodotto.`;
      Logger.logSeparator(message, "-", `${JSON.stringify(this, null, 2)}\n`);
      return;
    }
    if (this.stato === "esaurito") {
      message = `Il cliente ${cliente.nome} ${cliente.cognome} vorrebbe ordinare un prodotto esaurito`;
    } else {
      this.cliente = cliente;
      message = `Il cliente ${cliente.nome} ${cliente.cognome} ha effettuato un ordine`;
      this.stato = "esaurito";
    }
    Logger.logSeparator(message, "-", `\n${JSON.stringify(this, null, 2)}\n`);
  }
}

/**************************** CLIENTE ******************************/

export class Cliente implements ICliente {
  constructor(public nome: string, public cognome: string, public metodoPagamento: string, public email: string, public ID: number) {}
  ordinaProdotto(prodotto: IProdotto): void {
    prodotto.assegnaCliente(this);
  }
}

/* ********************** PROCESSO PRODUZIONE ********************** */

export class ProcessoProduzione implements IProcessoProduzione {
  prodottiInProduzione: IProdotto[] = [];
  prodottiOrdinati: IProdotto[] = [];

  constructor(public nome: dettagliProcesso.nome, public descrizione: dettagliProcesso.descrizione) {}

  aggiungiProdotto(prodotto: IProdotto): void {
    const prodottoEsistente = this.prodottiInProduzione.some((p) => p.ID === prodotto.ID);
    if (prodottoEsistente) {
      console.log(`Il prodotto con ID ${prodotto.ID} è già in produzione.`);
    } else {
      this.prodottiInProduzione.unshift(prodotto);
      let message = `Prodotto aggiunto al processo di produzione ${this.nome}`;
      Logger.logSeparator(message, "#", `\n${JSON.stringify(prodotto, null, 2)}\n\n`);
    }
  }

  spostaInOrdinati(prodotto: IProdotto): void {
    // prendi il prodotto, spostalo da prodottiInProduzione a prodottiOrdinati
    const prodottoIndex = this.prodottiInProduzione.findIndex((p) => p.ID === prodotto.ID);
    if (prodottoIndex !== -1) {
      this.prodottiOrdinati.push(this.prodottiInProduzione.splice(prodottoIndex, 1)[0]);
      let message = `Prodotto spostato in ordini ${this.nome}`;
      Logger.logSeparator(message, "#", `\n${JSON.stringify(prodotto, null, 2)}\n\n`);
    }
  }
}
