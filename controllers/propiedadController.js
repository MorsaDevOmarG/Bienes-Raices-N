import Categoria from "../models/Categoria.js";
import Precio from "../models/Precio.js";

const admin = (req, res) => {
  // res.send('Mis propiedades');
  res.render('propiedades/admin', {
    pagina: 'Mis propiedades',
    barra: true
  });
};

// Función para crear una propiedad
const crear = async (req, res) => {
  // Consultar Modelo de Precio y Categoría, es importante tomar en cuenta el orden
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll()
  ]);

  // res.send('Crear propiedad');
  res.render('propiedades/crear', {
    pagina: 'Crear propiedad',
    barra: true,
    categorias,
    precios
  });
};

export { admin, crear };