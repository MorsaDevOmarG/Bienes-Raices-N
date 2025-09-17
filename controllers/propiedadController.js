const admin = (req, res) => {
  // res.send('Mis propiedades');
  res.render('propiedades/admin', {
    pagina: 'Mis propiedades',
    barra: true
  });
};

export { admin };