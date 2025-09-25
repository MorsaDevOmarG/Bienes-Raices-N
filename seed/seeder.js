import { exit } from "node:process";
import categorias from "./categorias.js";
import precios from "./precios.js";
// import Categoria from "../models/Categoria.js";
// import Precio from "../models/Precio.js";
import usuarios from "./usuarios.js";
import db from "../config/db.js";
import { truncate } from "node:fs";
import { Categoria, Precio, Usuario } from "../models/index.js";

const importarDatos = async () => {
  try {
    // Autenticar
    await db.authenticate();

    // Generar las columnas
    await db.sync();

    // Insertar los datos, bulkCreate es para insertar varios registros
    // await Categoria.bulkCreate(categorias);

    // await Precio.bulkCreate(precios);

    // Otra forma de insertar los datos, ejecutandolos al mismo tiempo
    await Promise.all([
      Categoria.bulkCreate(categorias),
      Precio.bulkCreate(precios),
      Usuario.bulkCreate(usuarios)
    ]);

    console.log("Datos importados correctamente");
    exit(0); // Forma de salir de un proceso sin error
  } catch (error) {
    console.log(error);
    // process.exit(1); // Forma de salir de un proceso con error
    exit(1);
  }
};

const eliminarDatos = async () => {
  try {
    // Eliminar los datos
    // await Promise.all([
    //   Categoria.destroy({ where: {}, truncate: true }),
    //   Precio.destroy({ where: {}, truncate: true }),
    // ]);

    // Otra forma de eliminar los datos
    await db.sync({ force: true });

    console.log("Datos eliminados correctamente");

    exit(0); // Forma de salir de un proceso sin error
  } catch (error) {
    console.log(error);
    // process.exit(1); // Forma de salir de un proceso con error
    exit(1);
  }
};

// Ejecutar sedder
if (process.argv[2] === "-i") {
  importarDatos();
}

// Ejecutar eliminar
if (process.argv[2] === "-e") {
  eliminarDatos();
}
