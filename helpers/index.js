const esVendedor = (usuarioId, propiedadUsuarioId) => {
  return usuarioId === propiedadUsuarioId;
};

const formatearFecha = fecha => {
  // console.log(fecha);
  // console.log(new Date(fecha).toISOString());
  // console.log(new Date(fecha).toISOString().split('T'));
  // console.log(new Date(fecha).toISOString().slice(0, 10));

  const nuevaFecha = new Date(fecha).toISOString().slice(0, 10);

  const opciones = {
    weekday: 'long',
    yer: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return new Date(nuevaFecha).toLocaleDateString('es-ES', opciones);
};

export { esVendedor, formatearFecha };