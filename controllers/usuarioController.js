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

const registrar = (req, res) => {
  console.log('registrando...');
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