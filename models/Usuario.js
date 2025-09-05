import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import e from 'express';

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
});