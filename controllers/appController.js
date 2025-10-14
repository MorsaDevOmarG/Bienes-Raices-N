import { raw } from "mysql2";
import { Precio, Categoria, Propiedad } from "../models/index.js";

const inicio = async (req, res) => {
  const [categorias, precios] = await Promise.all([
    // raw: true, para que no regrese toda la info de sequelize, en este ejemplo trae el ID y el NOMBRE
    Categoria.findAll({ raw: true }),
    Precio.findAll({ raw: true }),
  ]);

  console.log(categorias);

  res.render("inicio", {
    pagina: "Inicio",
    categorias,
    precios,
  });
};

const categoria = (req, res) => { };

const noEncontrado = (req, res) => { };

const buscador = (req, res) => { };

export {
  inicio,
  categoria,
  noEncontrado,
  buscador
};