import express from 'express';
import { propiedades } from '../controllers/apiController.js';

const router = express.Router();

// Example route
router.get('/propiedades', propiedades);

export default router;