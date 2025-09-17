const admin = (req, res) => {
  // res.send('Mis propiedades');
  res.render('propiedades/admin', {
    pagina: 'Mis propiedades',
    barra: true
  });
};

// Función para crear una propiedad
const crear = (req, res) => {
  // res.send('Crear propiedad');
  res.render('propiedades/crear', {
    pagina: 'Crear propiedad',
    barra: true
  });
};

export { admin, crear };