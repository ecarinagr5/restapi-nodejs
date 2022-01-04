const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //path para usuarios
    this.usuariosPath = "/api/usuarios";

    //DB connection
    this.conectarDB();

    //Middlewares
    this.middlewares();
    //Rutas de mi aplicacion
    this.routes();
  }

  //Function to connect to DB
  async conectarDB() {
    await dbConnection();
  }

  //.use is to create a middleware
  middlewares() {
    //Directorio público
    //basically a function that will the receive the Request and Response objects
    this.app.use(express.static("public"));

    // Lectura y parseo del body
    this.app.use(express.json());

    //CORS
    this.app.use(cors());
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
