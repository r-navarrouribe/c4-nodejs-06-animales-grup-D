const express = require("express");
const { buscarDuenyoPorDni, cambiarNombreDuenyo } = require("../../metodos");

const router = express.Router();

router.post("/cambiar-nombre/", async (req, res, next) => {
  const { dniUsuario, nuevoNombre } = req.body;
  console.log(dniUsuario, nuevoNombre);
  const duenyo = await buscarDuenyoPorDni(dniUsuario);
  if (!duenyo) {
    res
      .status(403)
      .json({ error: true, mensaje: "No existe ningun usuario con este DNI" });
  }
  cambiarNombreDuenyo(nuevoNombre, duenyo.id);
  res.status(200).json({ error: false, mensaje: "Nombre cambiado" });
});

module.exports = router;
