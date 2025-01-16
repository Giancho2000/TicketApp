const lblEscritorio = document.querySelector("#escritorio");
const btnAtender = document.querySelector("button");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es obligatorio");
}

const escritorio = searchParams.get("escritorio");
lblEscritorio.innerText = escritorio;

const socket = io();

socket.on("connect", () => {
  btnCrear.disabled = false;
});

socket.on("disconnect", () => {
  btnCrear.disabled = true;
});

socket.on("ultimo-ticket", (ultimoT) => {
  lblUltimoTicket.innerText = `El ultimo ticket fue el #${ultimoT}`;
});

btnCrear.addEventListener("click", () => {
  /* socket.emit("crear-ticket", null, (ticket) => {
    lblNuevoTicket.innerText = ticket;
  }); */
});
