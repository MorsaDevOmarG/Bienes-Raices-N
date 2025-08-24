// Extrar la libreria de express
const express = require('express');

// Crear la app
const app = express();

// Routing
// request: que se esta enviando al servidor
// response: lo que el servidor responde
app.get('/', function (req, res) {
  res.send('Hola Mundo en Express');
});

// Definir un puerto
const port = 3000;

app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});