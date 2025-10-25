(
  function () {
    // alert('cambiando estado');

    const cambiarEstadoBotones = document.querySelectorAll('.cambiar-estado');
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    

    cambiarEstadoBotones.forEach(boton => {
      boton.addEventListener('click', cambiarEstadoPropiedad);
    });

    async function cambiarEstadoPropiedad(e) {
      // console.log('presionadno');
      // console.log(e.target.dataset);

      const { propiedadId: id } = e.target.dataset;
      // console.log(id);

      try {
        const url = `/propiedades/${id}`;

        const respuesta = await fetch(url, {
          method: 'PUT',
          headers: {
            'CSRF-TOKEN': token
          }
        });

        const resultado = await respuesta.json();
        console.log(resultado);
      } catch (error) {
        console.log(error);
      }
    }
  }
) ()