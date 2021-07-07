const express = require("express");

const app = express();
const rutaAdoptar = require("./rutas/adoptar");

const server = app.listen(5000, () => {
  console.log("Se ha iniciado el servidor");
});

app.use("/animales", rutaAdoptar);
