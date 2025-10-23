import { unlink } from "node:fs/promises";
import { validationResult } from "express-validator";
import {
  Precio,
  Categoria,
  Propiedad,
  Mensaje,
  Usuario,
} from "../models/index.js";
import { esVendedor, formatearFecha } from "../helpers/index.js";

// import Categoria from "../models/Categoria.js";
// import Precio from "../models/Precio.js";

const admin = async (req, res) => {
  // Leer query string
  // console.log(req.query);

  const { pagina: paginaActual } = req.query;

  // Siempre tien que iniciar ^ y finalizar $ con números
  const expresion = /^[1-9]$/;

  if (!expresion.test(paginaActual)) {
    return res.redirect("/mis-propiedades?pagina=1");
  }

  try {
    const { id } = req.usuario;
    // console.log(id);

    // Límites y offset para el paginador
    const limit = 2;
    const offset = paginaActual * limit - limit;

    const [propiedades, total] = await Promise.all([
      Propiedad.findAll({
        limit,
        offset,
        where: {
          usuarioId: id,
        },
        include: [
          {
            model: Categoria,
            as: "categoria",
          },
          {
            model: Precio,
            as: "precio",
          },
          {
            model: Mensaje,
            as: "mensajes",
          },
        ],
      }),
      Propiedad.count({
        where: {
          usuarioId: id,
        },
      }),
    ]);

    // console.log(total);

    // res.send('Mis propiedades');
    res.render("propiedades/admin", {
      pagina: "Mis propiedades",
      propiedades,
      csrfToken: req.csrfToken(),
      paginas: Math.ceil(total / limit),
      paginaActual: Number(paginaActual),
      total,
      offset,
      limit,
    });
  } catch (error) {
    console.log(error);
  }
};

// Función para crear una propiedad
const crear = async (req, res) => {
  // Consultar Modelo de Precio y Categoría, es importante tomar en cuenta el orden
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
  ]);

  // res.send('Crear propiedad');
  res.render("propiedades/crear", {
    pagina: "Crear propiedad",
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    // datos:{}, sirve para que cuando el FORM se ingrese por primera vez, no marque error, porque en GUARDARA se envía el req.body
    datos: {},
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
      Precio.findAll(),
    ]);

    return res.render("propiedades/crear", {
      pagina: "Crear propiedad",
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      datos: req.body,
    });
  }

  // Crear un registro
  // console.log(req.body);
  const {
    titulo,
    descripcion,
    habitaciones,
    estacionamiento,
    wc,
    calle,
    lat,
    lng,
    precio: precioId,
    categoria: categoriaId,
  } = req.body;
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
      imagen: "",
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
  if (propiedad.publicado) {
    return res.redirect("/mis-propiedades");
  }

  // Validar que la propiedad pertenezca a quien visita esta página
  // console.log(req.usuario);
  // console.log(req.usuario.id);

  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }

  res.render("propiedades/agregar-imagen", {
    pagina: `Agregar Imagen: ${propiedad.titulo}`,
    csrfToken: req.csrfToken(),
    propiedad,
  });
};

const almacenarImagen = async (req, res, next) => {
  const { id } = req.params;

  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Validar que la propiedad no esté publicada
  if (propiedad.publicado) {
    return res.redirect("/mis-propiedades");
  }

  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }

  try {
    console.log(req.file);

    // Almacenar la imagen y publicar la propiedad
    propiedad.imagen = req.file.filename;
    propiedad.publicado = 1;

    await propiedad.save();

    // res.redirect("/mis-propiedades");

    next();
  } catch (error) {
    console.log(error);
  }
};

const editar = async (req, res) => {
  // res.send("Desde editar propiedad");

  const { id } = req.params;

  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Revisar que quien visita la página, sea quien creó la propiedad
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }

  // Consultar Modelo de Precio y Categoría, es importante tomar en cuenta el orden
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
  ]);

  // res.send('Crear propiedad');
  res.render("propiedades/editar", {
    pagina: `Editar propiedad: ${propiedad.titulo}`,
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    // datos:{}, sirve para que cuando el FORM se ingrese por primera vez, no marque error, porque en GUARDARA se envía el req.body
    datos: propiedad,
  });
};

const guardarCambios = async (req, res) => {
  // Verificar la validación
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    // Hay errores
    // console.log(resultado.array());

    const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll(),
    ]);

    return res.render("propiedades/editar", {
      pagina: "Editar propiedad",
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      datos: req.body,
    });
  }

  // Validar que la propiedad exista
  const { id } = req.params;
  const propiedad = await Propiedad.findByPk(id);

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Revisar que quien visita la página, sea quien creó la propiedad
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }

  // Reescribir el objeto y actualizarlo
  try {
    console.log(propiedad);

    const {
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lat,
      lng,
      precio: precioId,
      categoria: categoriaId,
    } = req.body;

    propiedad.set({
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
    });

    await propiedad.save();

    res.redirect("/mis-propiedades");
    // res.json(propiedad);
  } catch (error) {
    console.log(error);
  }
};

const eliminar = async (req, res) => {
  // console.log("Desde eliminar");

  const { id } = req.params;

  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Revisar que quien visita la página, sea quien creó la propiedad
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }

  // Eliminar la imagen
  await unlink(`public/uploads/${propiedad.imagen}`);

  // Eliminar la propiedad
  await propiedad.destroy();

  res.redirect("/mis-propiedades");
};

// Muestra una propiedad
const mostrarPropiedad = async (req, res) => {
  // res.send('Desde mostrar propiedad');

  const { id } = req.params;

  // console.log(req.usuario);

  const propiedad = await Propiedad.findByPk(id, {
    include: [
      {
        model: Categoria,
        as: "categoria",
      },
      {
        model: Precio,
        as: "precio",
      },
    ],
  });

  if (!propiedad) {
    return res.redirect("/404");
  }

  // console.log(esVendedor(req.usuario?.id, propiedad.usuarioId));

  res.render("propiedades/mostrar", {
    propiedad,
    pagina: propiedad.titulo,
    csrfToken: req.csrfToken(),
    usuario: req.usuario,
    esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId),
  });
};

const enviarMensaje = async (req, res) => {
  const { id } = req.params;

  // console.log(req.usuario);

  const propiedad = await Propiedad.findByPk(id, {
    include: [
      {
        model: Categoria,
        as: "categoria",
      },
      {
        model: Precio,
        as: "precio",
      },
    ],
  });

  if (!propiedad) {
    return res.redirect("/404");
  }

  // console.log(esVendedor(req.usuario?.id, propiedad.usuarioId));

  // Renderizar errores - validación
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    return res.render("propiedades/mostrar", {
      propiedad,
      pagina: propiedad.titulo,
      csrfToken: req.csrfToken(),
      usuario: req.usuario,
      esVendedor: esVendedor(req.usario?.id, propiedad.usuarioId),
      errores: resultado.array(),
    });
  }

  console.log(req.body);
  console.log(req.params);
  console.log(req.usuario);

  const { mensaje } = req.body;
  const { id: propiedadId } = req.params;
  const { id: usuarioId } = req.usuario;

  // return;

  // Almacemar el mensaje
  await Mensaje.create({
    mensaje,
    propiedadId,
    usuarioId,
  });

  // res.render("propiedades/mostrar", {
  //   propiedad,
  //   pagina: propiedad.titulo,
  //   csrfToken: req.csrfToken(),
  //   usuario: req.usuario,
  //   esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId),
  //   enviado: true,
  // });

  res.redirect("/");
};

// Leer mensajes recibidos
const verMensajes = async (req, res) => {
  // res.send("Mostrando mensajes...");

  const { id } = req.params;

  // Validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id, {
    include: [
      {
        model: Mensaje,
        as: "mensajes",
        include: [
          {
            model: Usuario.scope("eliminarPassword"),
            as: "usuario",
          },
        ],
      },
    ],
  });

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect("/mis-propiedades");
  }

  res.render("propiedades/mensajes", {
    pagina: "Mensajes",
    mensajes: propiedad.mensajes,
    formatearFecha
  });
};

export {
  admin,
  crear,
  guardar,
  agregarImagen,
  almacenarImagen,
  editar,
  guardarCambios,
  eliminar,
  mostrarPropiedad,
  enviarMensaje,
  verMensajes,
};
