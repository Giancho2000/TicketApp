const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const btnCrear = document.querySelector("button");
const lblUltimoTicket = document.querySelector("#ultimo-ticket");

const socket = io();

socket.on("connect", () => {
  btnCrear.disabled = false;
});

socket.on("disconnect", () => {
  btnCrear.disabled = true;
  lblUltimoTicket.display = "none";
});

socket.on("ultimo-ticket", (ultimoT) => {
  lblUltimoTicket.innerText = `El ultimo ticket fue el #${ultimoT}`;
});

btnCrear.addEventListener("click", () => {
  socket.emit("crear-ticket", null, (ticket) => {
    lblNuevoTicket.innerText = ticket;
  });
});
