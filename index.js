const {
  buscarDuenyoPorDni,
  adoptarAnimal,
  listarAnimales,
  listarAnimalesEpecie,
  mostrarAnimalPorChip,
  cambiarNombreDuenyo,
} = require("./metodos");
const { preguntarDNI, preguntarOpciones } = require("./preguntador/preguntas");
const { preguntar } = require("./preguntador/preguntador");

(async () => {
  const { dniUsuario } = await preguntar(preguntarDNI);
  const idDuenyo = await buscarDuenyoPorDni(dniUsuario.toUpperCase());
  const respuestas = await preguntar(await preguntarOpciones());
  switch (respuestas.opcion) {
    case "listAllAnimals":
      listarAnimales(idDuenyo);
      break;
    case "listAllAnimalsFromSpecie":
      listarAnimalesEpecie(idDuenyo, respuestas.nombreEspecie);
      break;
    case "showDataFromAnimal":
      await mostrarAnimalPorChip(respuestas.chipAnimal, idDuenyo);
      break;
    case "adoptAnimal":
      if (!respuestas.idAnimalToAdopt) {
        console.log("No hay animales que adoptar");
        break;
      }
      adoptarAnimal(idDuenyo, respuestas.idAnimalToAdopt);
      console.log("Animal adoptado");
      break;
    case "changeName":
      cambiarNombreDuenyo(respuestas.nuevoNombre, idDuenyo);
      console.log("Nombre cambiado");
      break;
    default:
      break;
  }
})();
