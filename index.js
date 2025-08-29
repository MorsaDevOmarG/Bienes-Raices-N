import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";

// Crear la app
const app = express();

// Habilitando PUG
app.set("view engine", "pug");
app.set("views", "./views");

// Routing - MIDDLEWARE
// request: que se esta enviando al servidor
// response: lo que el servidor responde
// router.get("/", function (req, res) {
//   res.send("Hola Mundo en Express");
// });

// use: lo que hace es leer varias rutas (urls) a diferencia de get que solo lee una
// app.use("/", usuarioRoutes);

// Todas las rutas que se encuentren en: auth, se van a encontrar en el archvio, en este ejemplo sería en: usuarioRoutes.js
app.use("/auth", usuarioRoutes);

// Definir un puerto
const port = 3000;

app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
