import { validationResult } from "express-validator";

import Categoria from "../models/Categoria.js";
import Precio from "../models/Precio.js";

const admin = (req, res) => {
  // res.send('Mis propiedades');
  res.render('propiedades/admin', {
    pagina: 'Mis propiedades',
    barra: true
  });
};

// Función para crear una propiedad
const crear = async (req, res) => {
  // Consultar Modelo de Precio y Categoría, es importante tomar en cuenta el orden
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll()
  ]);

  // res.send('Crear propiedad');
  res.render("propiedades/crear", {
    pagina: "Crear propiedad",
    barra: true,
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    // datos:{}, sirve para que cuando el FORM se ingrese por primera vez, no marque error, porque en GUARDARA se envía el req.body
    datos: {}
  });
};

const guardar = async (req, res) => {
  // Validación
  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    // Hay errores
    // console.log(resultado.array());

    // Consultar Modelo de Precio y Categoría, es importante tomar en cuenta el orden
    const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll()
    ]);

    return res.render("propiedades/crear", {
      pagina: "Crear propiedad",
      barra: true,
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      datos: req.body
    });
  }
};

export { admin, crear, guardar };