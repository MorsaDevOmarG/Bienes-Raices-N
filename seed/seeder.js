import { exit } from "node:process";
import categorias from "./categorias.js";
import Categoria from "../models/Categoria.js";
import db from "../config/db.js";

const importarDatos = async () => {
  try {
    // Autenticar
    await db.authenticate();

    // Generar las columnas
    await db.sync();

    // Insertar los datos, bulkCreate es para insertar varios registros
    await Categoria.bulkCreate(categorias);

    console.log("Datos importados correctamente");
    exit(0); // Forma de salir de un proceso sin error
  } catch (error) {
    console.log(error);
    // process.exit(1); // Forma de salir de un proceso con error
    exit(1);
  }
};