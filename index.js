import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';

// Crear la app
const app = express();

// Routing - MIDDLEWARE
// request: que se esta enviando al servidor
// response: lo que el servidor responde
// router.get("/", function (req, res) {
//   res.send("Hola Mundo en Express");
// });

// use: lo que hace es leer varias rutas (urls) a diferencia de get que solo lee una
app.use('/', usuarioRoutes);

// Definir un puerto
const port = 3000;

app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});