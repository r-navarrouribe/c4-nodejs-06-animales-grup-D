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
  const respuestas = await preguntar(await preguntarOpciones());
  console.log(respuestas);
  switch (respuestas.opcion) {
    case "listAllAnimals":
      listarAnimales(idDuenyo);
      break;
    case "listAllAnimalsFromSpecie":
      listarAnimalesEpecie(idDuenyo, respuestas.nombreEspecie);
      break;
    case respuestas.opcion === "adoptAnimal":
      listarAnimalesSinDueño();
      break;
    default:
      break;
  }
})();
