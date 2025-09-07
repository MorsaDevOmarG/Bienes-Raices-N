import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

// Nombre de la tabla que se va crear (Usuarios)
const Usuario = db.define('usuarios', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // token: {
  //   type: DataTypes.STRING,
  // },  
  token: DataTypes.STRING,
  confirmado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  hooks: {
    beforeCreate: async function (usuario) {
      // Es recomendanble usar 10, si ponemos 100 o 200, tarda mucho en hashear y es más costoso para el SERVER
      const salt = await bcrypt.genSalt(10);

      usuario.password = await bcrypt.hash(usuario.password, salt);
    }
  }
});

export default Usuario;