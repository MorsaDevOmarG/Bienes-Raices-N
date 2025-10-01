import { validationResult } from "express-validator";
import { Precio, Categoria, Propiedad } from "../models/index.js";

// import Categoria from "../models/Categoria.js";
// import Precio from "../models/Precio.js";

const admin = (req, res) => {
  // res.send('Mis propiedades');
  res.render('propiedades/admin', {
    pagina: 'Mis propiedades',
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
  res.render("propiedades/crear", {
    pagina: "Crear propiedad",
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    // datos:{}, sirve para que cuando el FORM se ingrese por primera vez, no marque error, porque en GUARDARA se envía el req.body
    datos: {}
  });
};

const guardar = async (req, res) => {
  // Validación
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    // Hay errores
    // console.log(resultado.array());

    // Consultar Modelo de Precio y Categoría, es importante tomar en cuenta el orden
    const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll()
    ]);

    return res.render("propiedades/crear", {
      pagina: "Crear propiedad",
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      datos: req.body
    });
  }

  // Crear un registro
  // console.log(req.body);
  const { titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio: precioId, categoria: categoriaId } = req.body;
  // console.log(req.usuario);

  const { id: usuarioId } = req.usuario;

  try {

    const propiedadGuardada = await Propiedad.create({
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lat,
      lng,
      precioId,
      categoriaId,
      usuarioId,
      imagen: ''
    });

    const { id } = propiedadGuardada;
    res.redirect(`/propiedades/agregar-imagen/${id}`);
    // res.json(propiedadGuardada);

  } catch (error) {
    console.log(error);
  }
};

const agregarImagen = async (req, res) => {
  // res.send('Desde agregar imagen');

  const { id } = req.params;

  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Validar que la propiedad no esté publicada

  // Validar que la propiedad pertenezca a quien visita esta página

  res.render('propiedades/agregar-imagen', {
    pagina: 'Agregar Imagen',
    csrfToken: req.csrfToken()
  });
};

export { admin, crear, guardar, agregarImagen };