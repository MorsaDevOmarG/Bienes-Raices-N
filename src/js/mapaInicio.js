(function () {
  const lat = 20.67444163271174;
  const lng = -103.38739216304566;
  const mapa = L.map("mapa-inicio").setView([lat, lng], 16);

  // Son una capa que estará sobre el mapa
  let markers = new L.FeatureGroup().addTo(mapa);
  // console.log(markers); - encontramos en consola: PROTOTYPES y de nuevo PROTOTYPES, para ver las opciones de MARKERS

  let propiedades = [];

  // Filtros
  const filtros = {
    categoria: "",
    precio: "",
  };

  const categoriasSelect = document.querySelector("#categorias");
  const preciosSelect = document.querySelector("#precios");

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);

  // Filtrado de Categorías y Precios
  categoriasSelect.addEventListener("change", (e) => {
    filtros.categoria = +e.target.value;
    // console.log(filtros);

    filtrarPropiedades();
  });

  preciosSelect.addEventListener("change", (e) => {
    filtros.precio = +e.target.value;
    // console.log(filtros);

    filtrarPropiedades();
  });

  const obtenerPropiedades = async () => {
    try {
      const url = "/api/propiedades";
      const respuesta = await fetch(url);
      propiedades = await respuesta.json();
      // console.log(propiedades);

      mostrarPropiedades(propiedades);
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarPropiedades = (propiedades) => {
    // console.log(propiedades);

    // Limpiar los markers
    markers.clearLayers();

    propiedades.forEach((propiedad) => {
      // Agregar el PIN
      const marker = new L.marker([propiedad?.lat, propiedad?.lng], {
        autoPan: true,
      }).addTo(mapa).bindPopup(`
          <p class="text-indigo-600 font-bold">${propiedad?.categoria.nombre}</p>

          <h1 class="text-xl font-extrabold uppercase my-2">${propiedad?.titulo}</h1>  

          <img src="/uploads/${propiedad?.imagen}" alt="Imagen de la propiedad ${propiedad?.titulo}" />

          <p class="text-gray-600 font-bold">${propiedad?.precio.nombre}</p>

          <a class="bg-indigo-600 block p-2 text-center font-bold uppercase" href="/propiedad/${propiedad?.id}">Ver Propiedad</a>
        `);

      markers.addLayer(marker);
    });
  };

  const filtrarPropiedades = () => {
    // console.log("Filtrando...");
    // console.log(propiedades);

    const resultado = propiedades
      .filter(filtrarCategoria)
      .filter(filtrarPrecio);
    // console.log(resultado);

    mostrarPropiedades(resultado);
  };

  const filtrarCategoria = (propiedad) => {
    // console.log(propiedad);

    return filtros.categoria
      ? propiedad.categoriaId === filtros.categoria
      : propiedad;
  };

  const filtrarPrecio = (propiedad) => {
    // console.log(propiedad);

    return filtros.precio
      ? propiedad.precioId === filtros.precio
      : propiedad;
  };

  obtenerPropiedades();
})();
