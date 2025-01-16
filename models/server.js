const express = require("express");
const cors = require("cors");
const { socketController } = require("../sockets/controllers");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {};
    //socket server
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);
    //Middlewares
    this.middlewares();
    //Routes
    this.routes();
    //Sockets
    this.sockets();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.static("public"));
  }

  routes() {}

  sockets() {
    this.io.on("connection", socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Aplicacion corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
