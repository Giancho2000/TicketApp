const path = require("path");
const fs = require("fs");

class Ticket {
  constructor(numero, escritorio) {
    (this.numero = numero), (this.escritorio = escritorio);
  }
}

class TicketControl {
  constructor() {
    this.ultimoTicket = 0;
    this.diaHoy = new Date().getDate();
    this.tickets = [];
    this.ultimosTickets = [];

    this.init();
  }

  get toJson() {
    return {
      ultimoTicket: this.ultimoTicket,
      diaHoy: this.diaHoy,
      tickets: this.tickets,
      ultimosTickets: this.ultimosTickets,
    };
  }

  init() {
    const {
      ultimoTicket,
      diaHoy,
      tickets,
      ultimosTickets,
    } = require("../db/data.json");
    if (diaHoy === this.diaHoy) {
      this.ultimoTicket = ultimoTicket;
      this.tickets = tickets;
      this.ultimosTickets = ultimosTickets;
    } else {
      this.guardarDB();
    }
  }

  guardarDB() {
    const dbPath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  siguiente() {
    this.ultimoTicket += 1;
    const ticket = new Ticket(this.ultimoTicket, null);
    this.tickets.push(ticket);

    this.guardarDB();
    return `Usted tiene el ticket #${ticket.numero}`;
  }

  atenderTicket(escritorio) {
    // NO hay tickets para atender
    if (this.tickets.length === 0) {
      return null;
    }

    // Elimina y toma el ticket en cola
    const ticket = this.tickets.shift();
    //Asigna el escritorio
    ticket.escritorio = escritorio;

    // Pone el ticket atendido en la lista de los ultimos
    this.ultimosTickets.unshift(ticket);

    // Limita el arreglo de ultimos tickets a 4
    if (this.ultimosTickets.length > 4) {
      this.ultimosTickets.splice(-1, 1);
    }

    thiss.guardarDB();

    return ticket;
  }
}

module.exports = TicketControl;
