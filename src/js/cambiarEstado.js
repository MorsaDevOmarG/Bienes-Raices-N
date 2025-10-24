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
        const url = `/propiedad/${id}`;

        const respuesta = await fetch(url, {
          method: 'PUT',
          headers: {
            'CSRF-TOKEN': token
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
) ()