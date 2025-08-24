import express from "express";

const router = express.Router();

// Routing
// request: que se esta enviando al servidor
// response: lo que el servidor responde
router.get("/", function (req, res) {
  res.send("Hola Mundo en Express desde Routing");
});

router.get("/nosotros", function (req, res) {
  res.send("Sobre Nosotros"); 
});

export default router;