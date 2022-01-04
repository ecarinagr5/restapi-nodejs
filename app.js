//Structure node: 1-nodes imports goes first
//require('fs')
//require ('http')

//Structure node: 2-Third imports goes seconds
require("dotenv").config();
const Server = require("./models/server");
// create instance of server
const server = new Server();

//listen server
server.listen();
