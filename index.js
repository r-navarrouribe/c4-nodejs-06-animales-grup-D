const { preguntarDNI } = require("./preguntador/preguntas");
const { preguntar } = require("./preguntador/preguntador");

(() => {
  preguntar(preguntarDNI);
})();
