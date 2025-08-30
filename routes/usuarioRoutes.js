import express from "express";
import { formularioLogin, formularioRegistro } from "../controllers/usuarioController.js";

const router = express.Router();

// Routing
// request: que se esta enviando al servidor
// response: lo que el servidor responde
// router.get("/", function (req, res) {
//   res.send("Hola Mundo en Express desde Routing");
// });

// router.post("/", function (req, res) {
//   res.json({ mensaje: "Usando Post en el servidor" });
// });

// router.get("/", (req, res) => {
//   res.send("Hola Mundo en Express desde Routing");
// });

// Render: se encarga de mostrar una vista, no es necesario poner: views, render se encargar de escanear la carpeta views
router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);

// router.post("/", (req, res) => {
//   res.json({ mensaje: "Usando Post en el servidor" });
// });

// Otra forma de englobar varias verbos HTTP y urls
// router
//   .route("/")
//   .get("/", function (req, res) {
//     res.send("Hola Mundo en Express desde Routing");
//   })
//   .post("/", function (req, res) {
//     res.json({ mensaje: "Usando Post en el servidor" });
//   });

export default router;
