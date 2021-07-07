const express = require("express");

const router = express.Router();

router.get("/adoptar/:dni/:idAnimal", async (req, res, next) => {
  const { dni, idAnimal } = req.params;
  res.json(`aqui se adopta ${dni} ${idAnimal}`);
});

router.get("/especie/:id", async (req, res, next) => {
  const { id } = req.params;
  res.json(`Especie id :${id}`);
});
router.get("/animales/:id", async (req, res, next) => {
  
  res.json(`Animales id :${}`);
});




module.exports = router;
