import { check, validationResult } from "express-validator";

import Usuario from "../models/Usuario.js";
import { generarId } from "../helpers/tokens.js"; 
import { emailRegistro } from "../helpers/emails.js";

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar Sesión",
  });
};

const formularioRegistro = (req, res) => {
  // console.log(req.csrfToken());

  res.render("auth/registro", {
    pagina: "Crear Cuenta",
    csrfToken: req.csrfToken(), // Pasamos el token a la vista
  });
};

const registrar = async (req, res) => {
  // console.log('registrando...');

  // De esta forma leemos los datos que el usuario envia desde el formulario
  // console.log(req.body);

  // Validación
  await check("nombre")
    .notEmpty()
    .withMessage("El Nombre no puede ir vacío")
    .run(req);
  await check("email")
    .isEmail()
    .withMessage("El Email debe ser válido")
    .run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("El Password debe ser al menos de 6 caracteres")
    .run(req);
  await check("repetir_password")
    .equals("password")
    .withMessage("Los passwords no son iguales")
    .run(req);

  let resultado = validationResult(req);

  // Verificar que el resultado esté vacío
  if (!resultado.isEmpty()) {
    // Errores
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken: req.csrfToken(), // Pasamos el token a la vista
      errores: resultado.array(),
      // Con esto hacemos que si ingresamos datos y hay un error, no se borren los datos que ya habíamos ingresado
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  const { nombre, email, password } = req.body;

  // Verificar que el usuario no esté registrado o duplicado, finOne: busca el primero que encuentre, esta es una forma, la de aquí abajo, pero hay una mejor cuando aplicamos destructuración
  // const existeUusuario = await Usuario.findOne({
  //   where: { email: req.body.email },
  // });

  const existeUusuario = await Usuario.findOne({ where: { email } });

  console.log(existeUusuario);

  if (existeUusuario) {
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken: req.csrfToken(), // Pasamos el token a la vista
      errores: [{ msg: "El usuario ya está registrado" }],
      // Con esto hacemos que si ingresamos datos y hay un error, no se borren los datos que ya habíamos ingresado
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  // Almacenar un usuario
  // const usuario = await Usuario.create(req.body);
  // res.json(usuario);

  const usuario = await Usuario.create(
    {
      nombre,
      email,
      password,
      token: generarId()
    }
  );

  // Enviar el email de confirmación
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token
  });

  // Mostrar mensaje de confirmación
  res.render("templates/mensaje", {
    pagina: "Cuenta Creada Correctamente",
    mensaje: "Hemos enviado un Email de Confirmación, presiona en el enlace",
  });
};

// Función que comprueba una cuenta
// next: es para que continue con el siguiente middleware
const confirmar = async (req, res, next) => {
  // console.log("Confirmando...");
  // console.log(req.params.token);

  const { token } = req.params;
  console.log(token);
  // next();

  // Verificar si el token es válido
  const usuario = await Usuario.findOne({ where: { token } });

  // Confirmar la cuenta
  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Error al confirmar tu cuenta",
      mensaje: "Hubo un error al confirmar tu cuenta, intenta de nuevo",
      error: true,
    });
  }

  // Confirmarla cuenta
  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save();

  res.render("auth/confirmar-cuenta", {
    pagina: "Cuenta confirmada",
    mensaje: "La cuenta se confirmó correctamente, ya puedes iniciar sesión",
  });
};

const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupera tu acceso a Bienes Raíces",
    csrfToken: req.csrfToken(),
  });
};

const resetPassword = async (req, res) => {
  // Validación
  await check("email")
    .isEmail()
    .withMessage("El Email debe ser válido")
    .run(req);

  let resultado = validationResult(req);

  // Verificar que el resultado esté vacío
  if (!resultado.isEmpty()) {
    // Errores
    return res.render("auth/olvide-password", {
      pagina: "Recupera tu acceso a Bienes Raíces",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });
  }

  // Buscar el usuario
  const { email } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario) {
    return res.render("auth/olvide-password", {
      pagina: "Recupera tu acceso a Bienes Raíces",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El Email no pertenece a ningún usuario" }],
    });
  }
};  

export {
  formularioLogin,
  formularioRegistro,
  registrar,
  confirmar,
  formularioOlvidePassword,
  resetPassword
};
