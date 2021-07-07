const {
  buscarDuenyoPorDni,
  adoptarAnimal,
  listarAnimales,
  listarAnimalesEpecie,
  mostrarAnimalPorChip,
  cambiarNombreDuenyo,
} = require("./metodos");
require("./servidor/index");
const { preguntarDNI, preguntarOpciones } = require("./preguntador/preguntas");
const { preguntar } = require("./preguntador/preguntador");

(async () => {
  const { dniUsuario } = await preguntar(preguntarDNI);
  const duenyo = await buscarDuenyoPorDni(dniUsuario.toUpperCase());
  console.log(duenyo);
  if (duenyo === null) {
    console.log("No existe un usuario con ese DNI");
    process.exit(0);
  }
  const respuestas = await preguntar(await preguntarOpciones());
  switch (respuestas.opcion) {
    case "listAllAnimals":
      listarAnimales(duenyo.id);
      break;
    case "listAllAnimalsFromSpecie":
      listarAnimalesEpecie(duenyo.id, respuestas.nombreEspecie);
      break;
    case "showDataFromAnimal":
      await mostrarAnimalPorChip(respuestas.chipAnimal, duenyo.id);
      break;
    case "adoptAnimal":
      if (!respuestas.idAnimalToAdopt) {
        console.log("No hay animales que adoptar");
        break;
      }
      adoptarAnimal(duenyo.id, respuestas.idAnimalToAdopt);
      console.log("Animal adoptado");
      break;
    case "changeName":
      cambiarNombreDuenyo(respuestas.nuevoNombre, duenyo.id);
      console.log("Nombre cambiado");
      break;
    default:
      break;
  }
})();
