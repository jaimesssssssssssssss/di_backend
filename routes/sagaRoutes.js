const express = require('express');
const router = express.Router();
const sagaController = require('../controllers/sagaController');

// Obtener todas las sagas
router.get('/', sagaController.getAllSagas);

// Obtener una saga por ID
router.get('/:id', sagaController.getSagaById);

// Crear nueva saga
router.post('/', sagaController.createSaga);

// Actualizar saga por ID
router.put('/:id', sagaController.updateSaga);

// Eliminar saga por ID
router.delete('/:id', sagaController.deleteSaga);

module.exports = router;
