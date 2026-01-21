// Importar librería para respuestas
const Respuesta = require("../utils/respuesta.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
const { logMensaje } = require("../utils/logger.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo saga y película
const Saga = models.sagas;
const Pelicula = models.peliculas;

class SagaController {
  // Obtener todas las sagas con sus películas asociadas
  async getAllSagas(req, res) {
    try {
      const data = await Saga.findAll({
        include: [
          {
            model: Pelicula,
            as: "peliculas", // asegúrate que este alias coincida en init-models
          },
        ],
      });
      res.status(200).json(Respuesta.exito(data, "Sagas recuperadas correctamente"));
    } catch (err) {
      logMensaje("Error al recuperar las sagas: " + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al recuperar las sagas: ${req.originalUrl}`));
    }
  }

  // Obtener una saga por su ID
  async getSagaById(req, res) {
    const id = req.params.id;
    try {
      const saga = await Saga.findByPk(id, {
        include: [{ model: Pelicula, as: "peliculas" }],
      });
      if (saga) {
        res.json(Respuesta.exito(saga, "Saga recuperada"));
      } else {
        res.status(404).json(Respuesta.error(null, "Saga no encontrada"));
      }
    } catch (err) {
      logMensaje("Error al recuperar la saga: " + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al recuperar la saga: ${req.originalUrl}`));
    }
  }

  // Crear una nueva saga
  async createSaga(req, res) {
    const { nombre, descripcion, fecha_inicio, activa } = req.body;
    try {
      const nuevaSaga = await Saga.create({
        nombre,
        descripcion,
        fecha_inicio,
        activa,
      });
      res.status(201).json(Respuesta.exito(nuevaSaga, "Saga creada correctamente"));
    } catch (err) {
      logMensaje("Error al crear la saga: " + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al crear la saga: ${req.originalUrl}`));
    }
  }

  // Actualizar una saga existente
  async updateSaga(req, res) {
    const id = req.params.id;
    const { nombre, descripcion, fecha_inicio, activa } = req.body;
    try {
      const [numFilas] = await Saga.update(
        { nombre, descripcion, fecha_inicio, activa },
        { where: { id } }
      );

      if (numFilas === 0) {
        res.status(404).json(Respuesta.error(null, "Saga no encontrada"));
      } else {
        res.status(204).json(Respuesta.exito(null, "Saga actualizada correctamente"));
      }
    } catch (err) {
      logMensaje("Error al actualizar la saga: " + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al actualizar la saga: ${req.originalUrl}`));
    }
  }

  // Eliminar una saga
  async deleteSaga(req, res) {
    const id = req.params.id;
    try {
      const numFilas = await Saga.destroy({ where: { id } });
      if (numFilas === 0) {
        res.status(404).json(Respuesta.error(null, "Saga no encontrada"));
      } else {
        res.status(204).json(Respuesta.exito(null, "Saga eliminada correctamente"));
      }
    } catch (err) {
      logMensaje("Error al eliminar la saga: " + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al eliminar la saga: ${req.originalUrl}`));
    }
  }
}

module.exports = new SagaController();
