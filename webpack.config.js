const path = require("path"); // Importa el módulo 'path' de Node.js

module.exports = {
  entry: "./src/app/index.js",
  output: {
    path: path.resolve(__dirname, "src/public"), // Utiliza path.resolve para obtener la ruta absoluta
    filename: "bundle.js",
  },
};
