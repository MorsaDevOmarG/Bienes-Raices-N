import express from "express";
import { body } from "express-validator";

import { admin, crear, guardar } from "../controllers/propiedadController.js";
import protegerRuta from "../middleware/protegerRuta.js";

const router = express.Router();

// De esta forma protememos la ruta, para que solo se muestre cuando el usuario este autenticado
router.get("/mis-propiedades", protegerRuta, admin);
router.get("/propiedades/crear", crear);
router.post(
  "/propiedades/crear",
  body("titulo").notEmpty().withMessage("El título es obligatorio"),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ max: 200 })
    .withMessage("La descripción no puede ser mayor a 200 caracteres"),
  body("categoria").isNumeric().withMessage("La categoría es obligatoria"),
  body("precio").isNumeric().withMessage("El precio es obligatorio"),
  body("habitaciones")
    .isNumeric()
    .withMessage("El número de habitaciones es obligatorio"),
  body("estacionamiento")
    .isNumeric()
    .withMessage("El número de lugares de estacionamiento es obligatorio"),
  body("wc").isNumeric().withMessage("El número de baños es obligatorio"),
  body("lat").notEmpty().withMessage("Ubica la Propiedad en el Mapa"),
  guardar
);

export default router;
