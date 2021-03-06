const express = require("express");
const {
  listar,
  adoptarAnimal,
  listarAnimalId,
  buscarDuenyoPorDni,
  listarAnimales,
  listarAnimalesEpecie,
  listarAnimalesSinDueño,
} = require("../../metodos");

const router = express.Router();

router.get("/adoptar/", async (req, res, next) => {
  const animalesSinDueño = await listarAnimalesSinDueño();
  if (animalesSinDueño.length === 0) {
    res.send("No hay animales para adoptar");
  } else {
    const animalesListados = animalesSinDueño.map(
      ({
        id,
        nombre,
        edad,
        numero_chip: chip,
        Especie: { nombre: nombreEpecie },
      }) =>
        `\nid: ${id} - Nombre:  ${nombre} - Especie: ${nombreEpecie} - Edad:  ${edad} - Numero de chip:  ${chip}`
    );
    res.send(`Los animales para adoptar son: ${animalesListados}`);
  }
});

router.get("/adoptar/:dni/:idAnimal", async (req, res, next) => {
  const { dni, idAnimal } = req.params;
  const { id } = await buscarDuenyoPorDni(dni);
  const adoptar = await adoptarAnimal(id, idAnimal);
  console.log(adoptar);
  if (adoptar[0] === 1) {
    const animalAdoptado = await listarAnimalId(idAnimal);
    res.send(`Has adoptado a ${animalAdoptado.nombre} `);
  } else {
    res.send("No se a podido adoptar al animal");
  }
});

router.get("/especie/:dni/:especie", async (req, res, next) => {
  const { dni, especie } = req.params;
  const { id } = await buscarDuenyoPorDni(dni);
  const animalEspeciePorDuenyo = await listarAnimalesEpecie(id, especie);
  console.log(animalEspeciePorDuenyo);
  if (animalEspeciePorDuenyo.length !== 0) {
    const animalesListados = animalEspeciePorDuenyo.map(
      ({
        id,
        nombre,
        edad,
        numero_chip: chip,
        Especie: { nombre: nombreEpecie },
      }) =>
        `\nid: ${id} - Nombre:  ${nombre} - Especie: ${nombreEpecie} - Edad:  ${edad} - Numero de chip:  ${chip}`
    );
    res.send(`Los animales de la especie ${especie} son: ${animalesListados}`);
  } else {
    res.send(
      `El duenyo con dni ${dni.toUpperCase()} no tiene animales de la especie ${especie.toLocaleLowerCase()}`
    );
  }
});

router.get("/", async (req, res, next) => {
  res.json("Los animales son :");
});

module.exports = router;
