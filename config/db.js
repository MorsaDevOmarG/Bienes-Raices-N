import Sequelize from 'sequelize';

const db = new Sequelize('bienesraices_node_mvc', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306',
  // timestaps para crear createdAt y updatedAt, de cuando se registra a un nuevo usuario
  define: {
    timestamps: true
  },
  // pool de conexiones a la base de datos (para que no se sature) y se pueda reutilizar la conexion a la base de datos cuando se necesite
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorAliases: false
});

export default db;