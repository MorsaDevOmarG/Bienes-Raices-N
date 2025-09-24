import express from 'express';
import { body } from 'express-validator';

import { admin, crear, guardar } from '../controllers/propiedadController.js';

const router = express.Router();

router.get('/mis-propiedades', admin);
router.get('/propiedades/crear', crear);
router.post('/propiedades/crear',
  body('titulo').notEmpty().withMessage('El título es obligatorio'),
  body('descripcion').notEmpty().withMessage('La descripción es obligatoria').isLength({ max: 200 }).withMessage('La descripción no puede ser mayor a 200 caracteres'),
  body('categoria').notEmpty().withMessage('La categoría es obligatoria'),
  guardar
);

export default router;