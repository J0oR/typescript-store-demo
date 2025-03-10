export interface IProdotto {
  tipo: "costume da bagno" | "pareo" | "cappello";
  ID: string;
  taglia: string;
  colore: string;
  stato: "esaurito" | "disponibile";
  // assegna un prodotto a un cliente specifico
  assegnaCliente(cliente: ICliente): void;
}

export interface ICliente {
  nome: string;
  cognome: string;
  metodoPagamento: string;
  email: string;
  ID: string;
  ordinaProdotto(prodotto: IProdotto): void;
}

export enum dettagliProcesso {
  nome = "Riciclo plastica",
  descrizione = "Riciclo di plastica marina per creare produrre tessuti resistenti e sostenibili"
}

export interface IProcessoProduzione {
  nome: dettagliProcesso.nome;
  descrizione: dettagliProcesso.descrizione;
  prodottiInProduzione: IProdotto[];
  prodottiOrdinati: IProdotto[];

  // aggiungere un prodotto al processo di produzione.
  aggiungiProdotto(prodotto: IProdotto): void;
  spostaInOrdinati(prodotto: IProdotto): void;
}
