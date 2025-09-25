const protegerRuta = (req, res, next) => {
  console.log("Desde el middleware protegerRuta");

  next();

  // Verificar si hay un token


  // Comprobar si ha un token
};

export default protegerRuta;