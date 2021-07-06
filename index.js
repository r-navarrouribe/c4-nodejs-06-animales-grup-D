const inquirer = require("inquirer");
const { duenyo, adoptarAnimal } = require("./metodos");
const { preguntarDNI, preguntarOpciones } = require("./preguntador/preguntas");
const { preguntar } = require("./preguntador/preguntador");

(async () => {
  const { dniUsuario } = await preguntar(preguntarDNI);
  const idDuenyo = await duenyo(dniUsuario.toUpperCase());
  const cosas = await preguntar(await preguntarOpciones());
})();
