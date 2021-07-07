const debug = require("debug")("animales:servidor:errores");
const chalk = require("chalk");

const errorServidor = (err, puerto) => {
  debug(chalk.red("Error al iniciar el servidor"));
  if (err.code === "EADDRINUSE") {
    debug(chalk.red(`El puerto ${puerto} está ocupado.`));
  }
};

module.exports = {
  errorServidor,
};
