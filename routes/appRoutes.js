import express from 'express';
import { inicio, categoria, noEncontrado, buscador  } from '../controllers/appController.js';

const router = express.Router();

// Definir las rutas de la aplicación aquí
// Página de inicio
router.get('/', inicio);

// Categorías
router.get('/categoria/:id', categoria);

// Página 404
router.get('/404', noEncontrado);

// Buscador
router.get('/buscador', buscador);

export default router;