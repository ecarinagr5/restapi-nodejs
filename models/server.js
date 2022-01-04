const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //path para usuarios
    this.usuariosPath = "/api/usuarios";

    //Middlewares
    this.middlewares();
    //Rutas de mi aplicacion
    this.routes();
  }

  //.use is to create a middleware

  middlewares() {
    //Directorio público
    //basically a function that will the receive the Request and Response objects
    this.app.use(express.static("public"));

    //CORS
    this.app.use(cors());
  }

  routes() {
    this.app.use("/api/usuarios", require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
