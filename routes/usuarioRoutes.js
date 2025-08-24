import express from "express";

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

router.get("/", (req, res) => {
  res.send("Hola Mundo en Express desde Routing");
});

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
