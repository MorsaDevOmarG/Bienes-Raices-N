import { check, validationResult } from "express-validator";

import Usuario from "../models/Usuario.js";

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: 'Iniciar Sesión'
  });
};

const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: 'Crear Cuenta'
  });
};

const registrar = async (req, res) => {
  // console.log('registrando...');

  // De esta forma leemos los datos que el usuario envia desde el formulario
  // console.log(req.body);

  // Validación
  await check("nombre").notEmpty().withMessage("El Nombre no puede ir vacío").run(req);
  await check("email").isEmail().withMessage("El Email debe ser válido").run(req);
  await check("password").isLength({ min: 6 }).withMessage("El Password debe ser al menos de 6 caracteres").run(req);
  await check("repetir_password").equals(req.body.password).withMessage("Los passwords no son iguales").run(req);

  let resultado = validationResult(req);

  // Verificar que el resultado esté vacío

  res.json( resultado.array() );

  const usuario = await Usuario.create(req.body);

  res.json(usuario);
};

const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupera tu acceso a Bienes Raíces",
  });
};


export {
  formularioLogin,
  formularioRegistro,
  registrar,
  formularioOlvidePassword,
};