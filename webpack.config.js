const path = require("path"); // Importa el módulo 'path' de Node.js

module.exports = {
  entry: "./src/app/index.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
  },
};
