const debug = require("debug")("animales:servidor:errores");
const chalk = require("chalk");

const errorServidor = (err, puerto) => {
  debug(chalk.red("Error al iniciar el servidor"));
  if (err.code === "EADDRINUSE") {
    debug(chalk.red(`El puerto ${puerto} está ocupado.`));
  }
};

const error404 = (req, res, next) => {
  res.status(404).json({ error: true, mensaje: "Recurso no encontrado" });
};

const errorGeneral = (err, req, res, next) => {
  res.status(500).json({ error: true, mensaje: "Error general" });
};

module.exports = {
  errorServidor,
  error404,
  errorGeneral,
};
