const preguntarDNI = [
  {
    name: "dniUsuario",
    message: "¿Cuál es tu numero de DNI?",
    type: "input",
  },
];

const listarAnimalesSinDueño = async () => {
  const animalesSinDueño = await Animal.findAll({
    where: {
      id_duenyo: null,
    },
  });
  // Devolver un array con objetos, cada objeto tiene una propiedad name: [nombreAnimal] y value:[idAnimal]
  return animalesSinDueño.map((animal) => ({
    name: animal.nombre,
    value: animal.id,
  }));
};

const preguntarOpciones = () => {
  const animalesParaAdoptar = listarAnimalesSinDueño();
  return [
    {
      name: "opcion",
      message: "¿Qué opción quieres elegir?",
      type: "list",
      choices: [
        {
          name: "Listar todos mis animales",
          value: "listAllAnimals",
        },
        {
          name: "Listar todos mis animales de una especie",
          value: "listAllAnimalsFromSpecie",
        },
        {
          name: "Mostrar los datos de uno de mis animales",
          value: "showDataFromAnimal",
        },
        {
          name: "Adoptar un animal",
          value: "adoptAnimal",
        },
        {
          name: "Cambiar mi nombre",
          value: "changeName",
        },
      ],
    },
    {
      name: "nombreEspecie",
      message: "Introduce el nombre de la especie que quieres buscar:",
      type: "input",
      when: (respuestasAnteriores) =>
        respuestasAnteriores.opcion === "listAllAnimalsFromSpecie",
    },
    {
      name: "chipAnimal",
      message: "Introduce el numero de chip del animal que quieres buscar:",
      type: "input",
      when: (respuestasAnteriores) =>
        respuestasAnteriores.opcion === "showDataFromAnimal",
    },
    {
      name: "idAnimalToAdopt",
      message: "Elige el animal que quieres adoptar:",
      type: "list",
      choices: animalesParaAdoptar,
      when: (respuestasAnteriores) =>
        respuestasAnteriores.opcion === "adoptAnimal",
    },
    {
      name: "nuevoNombre",
      message: "Introduce tu nuevo nombre:",
      type: "input",
      when: (respuestasAnteriores) =>
        respuestasAnteriores.opcion === "changeName",
    },
  ];
};

module.exports = {
  preguntarDNI,
  preguntarOpciones,
};
