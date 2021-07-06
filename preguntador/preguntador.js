const inquirer = require("inquirer");
const { preguntarDNI, preguntarOpciones } = require("./preguntas");

const preguntar = async (preguntas) => {
  const respuestas = await inquirer.prompt(preguntas);
  return respuestas;
};

// (async () => {
//   const { dniUsuario } = await preguntar(preguntarDNI);
//   // console.log(dniUsuario);
//   const respuestas = await preguntar(preguntarOpciones());
//   console.log(respuestas);
// })();

module.exports = {
  preguntar,
};
