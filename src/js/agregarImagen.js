import { Dropzone } from 'dropzone';

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

Dropzone.options.imagen = {
  dictDEfaultMessage: 'Sube tus imágenes aquí',
  acceptedFiles: '.png, .jpg, .jpeg',
  maxFilesize: 5, // MB
  maxFiles: 1,
  parallelUploads: 1, // Subir 1 archivo a la vez
  autoProcessQueue: true, // Procesar la cola automáticamente
  addRemoveLinks: true, // Permitir eliminar archivos
  dictRemoveFile: 'Eliminar Archivo',
  dictMaxFilesExceeded: 'Solo puedes subir 1 archivo',
  headers: {
    'CSRF-Token': token
  },
  init: function() {
    // console.log('Iniciando Dropzone');
    this.on('error', function(file, message) {
      if (file.accepted === false) {
        this.removeFile(file); // Eliminar el archivo que no es válido
      }
      // console.log(message);
      alert(message);
    }
    );
    this.on('success', function(file, response) {
      // console.log(response);
      if (response.error) {
        alert(response.error);
        this.removeFile(file); // Eliminar el archivo que no se subió correctamente
        return;
      }
      // Si la subida es correcta, redireccionar
      window.location.href = '/mis-propiedades';
    });
    this.on('maxfilesexceeded', function (file) {
      this.removeAllFiles();
      this.addFile(file);
    });
  }
}