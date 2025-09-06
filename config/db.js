import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const db = new Sequelize(
  // "bienesraices_node_mvc", "root", "root",
  process.env.BD_NOMBRE,
  process.env.BD_USER,
  process.env.BD_PASS,

  {
    // host: "localhost",
    host: process.env.BD_HOST,
    dialect: "mysql",
    port: "3306",
    // timestaps para crear createdAt y updatedAt, de cuando se registra a un nuevo usuario
    define: {
      timestamps: true,
  },
  // pool de conexiones a la base de datos (para que no se sature) y se pueda reutilizar la conexion a la base de datos cuando se necesite
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  operatorAliases: false,
});

export default db;
