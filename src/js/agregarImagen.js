import { Dropzone } from "dropzone";

const token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");

Dropzone.options.imagen = {
  dictDefaultMessage: "Sube tus imágenes aquí",
  acceptedFiles: ".png, .jpg, .jpeg",
  maxFilesize: 5, // MB
  maxFiles: 1,
  parallelUploads: 1, // Subir 1 archivo a la vez
  autoProcessQueue: false, // Procesar la cola automáticamente
  addRemoveLinks: true, // Permitir eliminar archivos
  dictRemoveFile: "Eliminar Archivo",
  dictMaxFilesExceeded: "Solo puedes subir 1 archivo",
  headers: {
    "CSRF-Token": token,
  },
  paramName: "imagen", // Nombre del campo en el formulario
  init: function () {
    const dropzone = this;
    const btnPublicar = document.querySelector("#publicar");

    btnPublicar.addEventListener("click", function () {
      // Si hay archivos en la cola, procesarlos
      dropzone.processQueue();
    });

    dropzone.on("queuecomplete", function (file, message) {
      // console.log(message);
      if (this.getActiveFiles().length == 0) {
        // Redireccionar
        window.location.href = "/mis-propiedades";
      }
    });
  },
};
