// alert('Soy el mapa');
(function () {
  // Logical Or
  const lat = document.querySelector('#lat').value || 20.67444163271174;
  const lng = document.querySelector('#lng').value || -103.38739216304566;
  const mapa = L.map("mapa").setView([lat, lng], 16);
  let marker;

  // Utilizar PROVIDER y GEOCODER
  const geocodeService = L.esri.Geocoding.geocodeService();

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);

  // El PIN, draggable: para mover el PIN, autoPan: para que el mapa se mueva si el PIN llega a un borde, es decir; se vuelve a centrar
  marker = L.marker([lat, lng], { draggable: true, autoPan: true }).addTo(mapa);

  // Detectar movimiento del marker (pin)
  marker.on("moveend", function (e) {
    marker = e.target;  // El marcador que se movió
    const posicion = marker.getLatLng(); // Obtener la posición del marcador
    mapa.panTo(new L.LatLng(posicion.lat, posicion.lng)); // Centrar el mapa en la nueva posición del marcador
    // console.log(posicion);

    // Obtener la información de la calle al soltar el pin
    geocodeService
      .reverse()
      .latlng(posicion, 16) // 16 es el nivel de precisión
      .run(
        function (error, resultado) {
          // console.log(resultado);
          marker.bindPopup(resultado.address.LongLabel); // Mostrar la dirección en un popup
          marker.openPopup(); // Abrir el popup automáticamente

          // Llenar los campos
          document.querySelector(".calle").textContent =
            resultado?.address?.Address ?? "";
          document.querySelector("#calle").value =
            resultado?.address?.Address ?? "";
          // document.querySelector(".ciudad").textContent =
          //   resultado?.address?.City ?? "";
          // document.querySelector(".estado").textContent =
          //   resultado?.address?.Region ?? "";
          // document.querySelector(".pais").textContent =
          //   resultado?.address?.CountryCodeISO3 ?? "";

          // document.querySelector("#lat").value = resultado?.latlng?.lat ?? "";
          // document.querySelector("#lng").value = resultado?.latlng?.lng ?? "";
          document.querySelector("#lat").value = posicion.lat.toFixed(6) ?? '';
          document.querySelector("#lng").value = posicion.lng.toFixed(6) ?? '';
        });
  });

  // 🚀 Agregar buscador
  L.Control.geocoder({
    defaultMarkGeocode: false, // Para manejar manualmente lo que hace al seleccionar
  })
    .on("markgeocode", function (e) {
      const bbox = e.geocode.bbox;
      const poly = L.polygon([
        bbox.getSouthEast(),
        bbox.getNorthEast(),
        bbox.getNorthWest(),
        bbox.getSouthWest(),
      ]).addTo(mapa);

      // Centrar en el resultado
      mapa.fitBounds(poly.getBounds());

      // Mover marcador a la ubicación encontrada
      const center = e.geocode.center;
      marker.setLatLng(center);
    })
    .addTo(mapa);
})();
