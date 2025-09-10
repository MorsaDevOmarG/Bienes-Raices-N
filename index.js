import express from "express";
import csurf from "csurf";
import cookieParser from "cookie-parser";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import db from "./config/db.js";

// Crear la app
const app = express();

// Habilitar lectura de datos de formularios
// También puede aparecer como BODYPARSER, solo cambiamos a: express
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Habilitar cookie-parser
app.use(cookieParser());

// Habuilitar CSURF
app.use(csurf({ cookie: true }));

// Conectar a la base de datos
try {
  await db.authenticate();

  db.sync(); // Si no existe la tabla, la crea

  console.log("\nConexión exitosa a la Base de Datos...\n");
} catch (error) {
  console.error("Error al conectar a la base de datos: ", error);
}

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

// Carpeta pública
app.use(express.static("public"));

// Todas las rutas que se encuentren en: auth, se van a encontrar en el archvio, en este ejemplo sería en: usuarioRoutes.js
app.use("/auth", usuarioRoutes);

// Definir un puerto
// const port = 3000;
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
