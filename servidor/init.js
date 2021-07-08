require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("animales:servidor:init");
const express = require("express");
const { errorServidor } = require("./errores");

const app = express();

const puerto = process.env.PUERTO || 5001;

const server = app.listen(puerto, () => {
  debug(
    chalk.blue(`Servidor escuchando en http://localhost:${chalk.green(puerto)}`)
  );
});

server.on("error", (err) => errorServidor(err, puerto));

module.exports = { app, express };
