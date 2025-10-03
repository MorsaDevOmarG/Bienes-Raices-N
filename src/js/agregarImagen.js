import { Dropzone } from 'dropzone';
import { param } from 'express-validator';

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
  paramName: 'imagen', // Nombre del campo en el formulario
}