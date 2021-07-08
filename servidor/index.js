const morganFreeman = require("morgan");
const { app, express } = require("./init");
const rutasAnimales = require("./rutas/animales");
const rutasUsuarios = require("./rutas/usuarios");
const { error404, errorGeneral } = require("./errores");

app.use(morganFreeman("dev"));
app.use(express.json());

app.use("/animales", rutasAnimales);
/* app.use("/usuarios", rutasUsuarios); */
app.use(error404);
app.use(errorGeneral);
