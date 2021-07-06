const { Op } = require("sequelize");
const Animal = require("./bd/schemas/Animal");
const Duenyo = require("./bd/schemas/Duenyo");

const duenyo = async (dni) => {
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
      ["especie", "ASC"],
      ["nombre", "ASC"],
    ],
  });
  for (const animal of animales) {
    console.log(
      `Nombre: ${animal.nombre}. Edad: ${animal.edad}. Especie: ${animal.especie}. Chip: ${animal.chip}`
    );
  }
};

const listarAnimalesEpecie = async (idDuenyo, especie) => {
  const animales = await Animal.findAll({
    where: {
      id_duenyo: idDuenyo,
      especie,
    },
    order: ["nombre", "ASC"],
  });
  for (const animal of animales) {
    console.log(
      `Nombre: ${animal.nombre}. Edad: ${animal.edad}. Especie: ${animal.especie}. Chip: ${animal.chip}`
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

const buscarDuenyoPorDni = (dni) => {
  try {
    Duenyo.findAll({
      where: {
        dni: {
          [Op.eq]: dni,
        },
      },
    });
  } catch (err) {
    console.log("No existe ningun usuario con ese dni");
  }
};

module.exports = {
  duenyo,
  adoptarAnimal,
  listarAnimales,
  listarAnimalesEpecie,
  listarAnimalesSinDueño,
  buscarDuenyoPorDni,
};
