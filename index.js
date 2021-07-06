const inquirer = require("inquirer");
const {
  buscarDuenyoPorDni,
  adoptarAnimal,
  listarAnimales,
  listarAnimalesEpecie,
  listarAnimalesSinDueño,
} = require("./metodos");
const { preguntarDNI, preguntarOpciones } = require("./preguntador/preguntas");
const { preguntar } = require("./preguntador/preguntador");

(async () => {
  const { dniUsuario } = await preguntar(preguntarDNI);
  const idDuenyo = await buscarDuenyoPorDni(dniUsuario.toUpperCase());
  const cosas = await preguntar(await preguntarOpciones());
  console.log(cosas);
  switch (cosas) {
    case cosas.opcion === "listAllAnimals":
      listarAnimales();
      break;
    case cosas.opcion === "listAllAnimalsFromSpecie":
      listarAnimalesEpecie();
      break;
    case cosas.opcion === "adoptAnimal":
      listarAnimalesSinDueño();
      break;
    default:
      break;
  }
})();
