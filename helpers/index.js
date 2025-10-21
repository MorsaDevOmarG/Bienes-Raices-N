const esVendedor = (usuarioId, propiedadUsuarioId) => {
  return usuarioId.toString() === propiedadUsuarioId.toString();
};

export { esVendedor };