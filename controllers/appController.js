import { raw } from "mysql2";
import { Precio, Categoria, Propiedad } from "../models/index.js";

const inicio = async (req, res) => {
  const [categorias, precios, casas, departamentos] = await Promise.all([
    // raw: true, para que no regrese toda la info de sequelize, en este ejemplo trae el ID y el NOMBRE
    Categoria.findAll({ raw: true }),
    Precio.findAll({ raw: true }),
    Propiedad.findAll({
      limit: 3,
      where: {
        categoriaId: 1,
      },
      include: [
        {
          model: Precio,
          as: "precio",
        },
      ],
      order: [["createdAt", "DESC"]],
    }),
    Propiedad.findAll({
      limit: 3,
      where: {
        categoriaId: 2,
      },
      include: [
        {
          model: Precio,
          as: "precio",
        },
      ],
      order: [["createdAt", "DESC"]],
    }),
  ]);

  console.log(categorias);

  res.render("inicio", {
    pagina: "Inicio",
    categorias,
    precios,
    casas,
    departamentos,
    csrfToknen: req.csrfToken(),
  });
};

const categoria = async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  // Comprobar que la categoría exista
  const categoria = await Categoria.findByPk(id);

  if (!categoria) {
    return res.redirect("/404");
  }

  // Obtener las propiedades de la Categoría
  const propiedades = await Propiedad.findAll({
    where: {
      categoriaId: id,
    },
    include: [
      { model: Precio, as: "precio" },
    ],
  });

  res.render("categoria", {
    pagina: `${categoria.nombre}s en Venta`,
    propiedades,
    csrfToknen: req.csrfToken(),
  });
};

const noEncontrado = (req, res) => {
  res.status(404).render("404", {
    pagina: "No Encontrada",
    csrfToknen: req.csrfToken(),
  });
};

const buscador = (req, res) => {
  
};

export { inicio, categoria, noEncontrado, buscador };
