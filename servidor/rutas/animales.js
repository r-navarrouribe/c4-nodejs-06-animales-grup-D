const express = require("express");

const router = express.Router();

router.get("/adoptar/:dni/:idAnimal", async (req, res, next) => {
  const { dni, idAnimal } = req.params;
  res.json(`aqui se adopta ${dni} ${idAnimal}`);
});

module.exports = router;
