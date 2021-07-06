const { Op } = require("sequelize");
const Animal = require("./bd/schemas/Animal");
const Duenyo = require("./bd/schemas/Duenyo");
const Especie = require("./bd/schemas/Especie");

const buscarDuenyoPorDni = async (dni) => {
  try {
    const duenyos = await Duenyo.findOne({
      where: {
        dni: {
          [Op.eq]: dni,
        },
      },
    });
    const idDuenyo = await duenyos.dataValues.id;
    return idDuenyo;
  } catch (e) {
    console.log(`No existe un usuario con dni ${dni}`);
    process.exit();
  }
};

// adoptar animal con id animal y dni dueño

const adoptarAnimal = async (idDuenyo, idAnimal) => {
  const adoptar = await Animal.update(
    {
      id_duenyo: idDuenyo,
    },
    {
      where: {
        id: {
          [Op.eq]: idAnimal,
        },
      },
    }
  );
};
// Listar animales
const listarAnimales = async (idDuenyo) => {
  const animales = await Animal.findAll({
    where: {
      id_duenyo: idDuenyo,
    },
    order: [
      ["id_especie", "ASC"],
      ["nombre", "ASC"],
    ],
  });
  for (const animal of animales) {
    console.log(
      `Nombre: ${animal.nombre}. Edad: ${animal.edad}. Especie: ${animal.id_especie}. Chip: ${animal.numero_chip}`,
      animal
    );
  }
};

const listarAnimalesEpecie = async (idDuenyo, especie) => {
  const animales = await Animal.findAll({
    where: {
      id_duenyo: idDuenyo,
      id_especie: await obtenerIdEspecie(especie),
    },
    order: [["nombre", "ASC"]],
  });
  for (const animal of animales) {
    console.log(
      `Nombre: ${animal.nombre}. Edad: ${animal.edad}. Especie: ${animal.id_especie}. Chip: ${animal.numero_chip}`
    );
  }
};

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

const mostrarAnimalPorChip = async (numeroChipIntroducido, idDuenyo) => {
  const animal = await Animal.findOne({
    where: {
      numero_chip: numeroChipIntroducido,
      id_duenyo: idDuenyo,
    },
  });
  if (!animal) return;
  const {
    dataValues: {
      nombre,
      edad,
      id_especie: idEspecie,
      numero_chip: numeroChip,
    },
  } = animal;
  console.log(
    `Nombre: ${nombre}. Edad: ${edad}. Especie: ${idEspecie}. Chip: ${numeroChip}`
  );
  return animal.dataValues;
};

const cambiarNombreDuenyo = (nuevoNombre, idDuenyo) => {
  Duenyo.update(
    {
      nombre: nuevoNombre,
    },
    {
      where: {
        id: idDuenyo,
      },
    }
  );
};

const obtenerIdEspecie = async (nombreEspecie) => {
  const especie = await Especie.findOne({
    where: {
      nombre: nombreEspecie,
    },
  });
  if (!especie) return null;
  return especie.dataValues.id;
};

module.exports = {
  buscarDuenyoPorDni,
  adoptarAnimal,
  listarAnimales,
  listarAnimalesEpecie,
  listarAnimalesSinDueño,
  mostrarAnimalPorChip,
  cambiarNombreDuenyo,
};
