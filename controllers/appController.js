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
      order: [
        [
          "createdAt", "DESC"
        ]
      ],
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
      order: [
        [
          "createdAt", "DESC"
        ]
      ],
    }),
  ]);

  console.log(categorias);

  res.render("inicio", {
    pagina: "Inicio",
    categorias,
    precios,
    casas,
    departamentos,
  });
};

const categoria = (req, res) => {};

const noEncontrado = (req, res) => {};

const buscador = (req, res) => {};

export { inicio, categoria, noEncontrado, buscador };
