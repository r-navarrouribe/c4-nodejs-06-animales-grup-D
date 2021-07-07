const { Op } = require("sequelize");
const Animal = require("./bd/schemas/Animal");
const Duenyo = require("./bd/schemas/Duenyo");
const Especie = require("./bd/schemas/Especie");

const buscarDuenyoPorDni = async (dni) => {
  const duenyo = await Duenyo.findOne({
    where: {
      dni,
    },
  });
  return duenyo;
};

// adoptar animal con id animal y dni dueño

const adoptarAnimal = async (idDuenyo, idAnimal) => {
  const adoptar = await Animal.update(
    {
      id_duenyo: idDuenyo,
    },
    {
      where: {
        id: idAnimal,
      },
    }
  );
  return adoptar;
};
// Listar animales
const listarAnimales = async (idDuenyo) => {
  const animales = await Animal.findAll({
    include: {
      model: Especie,
      required: true,
    },
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
      `Nombre: ${animal.nombre}. Edad: ${animal.edad}. Especie: ${animal.Especie.nombre}. Chip: ${animal.numero_chip}`,
      animal
    );
  }
};

const obtenerIdEspecie = async (nombreEspecie) => {
  const especie = await Especie.findOne({
    where: {
      nombre: nombreEspecie,
    },
  });
  if (!especie) return null;
  return especie.id;
};

const listarAnimalesEpecie = async (idDuenyo, especie) => {
  const animales = await Animal.findAll({
    include: {
      model: Especie,
      required: true,
    },
    where: {
      id_duenyo: +idDuenyo,
      id_especie: await obtenerIdEspecie(especie),
    },
    order: [["nombre", "ASC"]],
  });
  for (const animal of animales) {
    console.log(
      `Nombre: ${animal.nombre}. Edad: ${animal.edad}. Especie: ${animal.Especie.nombre}. Chip: ${animal.numero_chip}`
    );
  }
  return animales;
};

const listarAnimalesSinDueño = async () => {
  const animalesSinDueño = await Animal.findAll({
    include: {
      model: Especie,
      required: true,
    },
    where: {
      id_duenyo: null,
    },
  });
  if (!animalesSinDueño) {
    console.log("No hay animales para adoptar");
    return;
  }
  return animalesSinDueño;
};
// Listar animal por id

const listarAnimalId = async (id) => {
  const animal = await Animal.findOne({
    where: {
      id,
    },
  });
  return animal;
};
const mostrarAnimalPorChip = async (numeroChipIntroducido, idDuenyo) => {
  const animal = await Animal.findOne({
    include: {
      model: Especie,
      required: true,
    },
    where: {
      numero_chip: numeroChipIntroducido,
      id_duenyo: idDuenyo,
    },
  });
  if (!animal) {
    console.log(`No existe el animal con el chip ${numeroChipIntroducido}`);
    return;
  }
  const {
    nombre,
    edad,
    Especie: { nombre: nombreEspecie },
    id_especie: idEspecie,
    numero_chip: numeroChip,
  } = animal;
  console.log(
    `Nombre: ${nombre}. Edad: ${edad}. Especie: ${nombreEspecie}. Chip: ${numeroChip}`
  );
  return animal;
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

const listar = (lista) => {
  // map para no hacer dry que no funciona
  lista.map(
    ({
      id,
      nombre,
      edad,
      numero_chip: chip,
      Especie: { nombre: nombreEpecie },
    }) =>
      `\nid: ${id} - Nombre:  ${nombre} - Especie: ${nombreEpecie} - Edad:  ${edad} - Numero de chip:  ${chip}`
  );
  return lista;
};
module.exports = {
  listar,
  buscarDuenyoPorDni,
  listarAnimalId,
  adoptarAnimal,
  listarAnimales,
  listarAnimalesEpecie,
  listarAnimalesSinDueño,
  mostrarAnimalPorChip,
  cambiarNombreDuenyo,
};
