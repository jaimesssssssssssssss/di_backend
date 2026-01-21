const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController');

// Obtener todas las películas
router.get('/', peliculaController.getAllPeliculas);

// Obtener una película por ID
router.get('/:id', peliculaController.getPeliculaById);

// Crear nueva película
router.post('/', peliculaController.createPelicula);

// Actualizar película por ID
router.put('/:id', peliculaController.updatePelicula);

// Eliminar película por ID
router.delete('/:id', peliculaController.deletePelicula);

module.exports = router;
