import jwt from 'jsonwebtoken';
import { Usuario } from '../models/index.js';

const protegerRuta = async (req, res, next) => {
  console.log("Desde el middleware protegerRuta");

  // Verificar si hay un token
  // console.log(req.cookies);
  // console.log(req.cookies._token);
  const { _token } = req.cookies;
  
  if (!_token) {
    return res.redirect("/auth/login");
  }
  
  // Comprobar si hay un token
  try {
    const decode = jwt.verify(_token, process.env.JWT_SECRET);
    // console.log("Decode del Token:", decode);

    const usuario = await Usuario.scope('eliminarPassword').findByPk(decode.id);
    // console.log("Usuario Encontrado:" , usuario);

    // Almacenar el Usuario al Req
    if (usuario) {
      req.usuario = usuario;
    } else {
      return res.redirect('/auth/login')
    }

    return next();
  } catch (error) {
    return res.clearCookie('_token').redirect('/auth/login');
  }

  // next();
};

export default protegerRuta;