// Importar librería para respuestas
const Respuesta = require("../utils/respuesta.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
const { logMensaje } = require("../utils/logger.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar los modelos
const Pelicula = models.peliculas;
const Saga = models.sagas;

class PeliculaController {
  // Obtener todas las películas con su saga asociada
  async getAllPeliculas(req, res) {
    try {
      const data = await Pelicula.findAll({
        include: [
          {
            model: Saga,
            as: "saga", // asegúrate que este alias coincida con init-models
          },
        ],
      });
      res.status(200).json(Respuesta.exito(data, "Películas recuperadas correctamente"));
    } catch (err) {
      logMensaje("Error al recuperar las películas: " + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar las películas: ${req.originalUrl}`
          )
        );
    }
  }

  // Obtener una película por ID
  async getPeliculaById(req, res) {
    const id = req.params.id;
    try {
      const pelicula = await Pelicula.findByPk(id, {
        include: [{ model: Saga, as: "saga" }],
      });
      if (pelicula) {
        res.json(Respuesta.exito(pelicula, "Película recuperada"));
      } else {
        res.status(404).json(Respuesta.error(null, "Película no encontrada"));
      }
    } catch (err) {
      logMensaje("Error al recuperar la película: " + err);
      res
        .status(500)
        .json(
          Respuesta.error(null, `Error al recuperar la película: ${req.originalUrl}`)
        );
    }
  }

  // Crear nueva película
  async createPelicula(req, res) {
    const { titulo, duracion, fecha_estreno, recaudacion, saga_id } = req.body;
    try {
      const nuevaPelicula = await Pelicula.create({ titulo, duracion, fecha_estreno, recaudacion, saga_id });
      res.status(201).json(Respuesta.exito(nuevaPelicula, "Película creada correctamente"));
    } catch (err) {
      logMensaje("Error al crear la película: " + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al crear la película: ${req.originalUrl}`));
    }
  }

  // Actualizar una película
  async updatePelicula(req, res) {
    const id = req.params.id;
    const { titulo, duracion, fecha_estreno, recaudacion, saga_id } = req.body;
    try {
      const [numFilas] = await Pelicula.update(
        { titulo, duracion, fecha_estreno, recaudacion, saga_id },
        { where: { id } }
      );

      if (numFilas === 0) {
        res.status(404).json(Respuesta.error(null, "Película no encontrada"));
      } else {
        res.status(204).json(Respuesta.exito(null, "Película actualizada correctamente"));
      }
    } catch (err) {
      logMensaje("Error al actualizar la película: " + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al actualizar la película: ${req.originalUrl}`));
    }
  }

  // Eliminar película
  async deletePelicula(req, res) {
    const id = req.params.id;
    try {
      const numFilas = await Pelicula.destroy({ where: { id } });
      if (numFilas === 0) {
        res.status(404).json(Respuesta.error(null, "Película no encontrada"));
      } else {
        res.status(204).json(Respuesta.exito(null, "Película eliminada correctamente"));
      }
    } catch (err) {
      logMensaje("Error al eliminar la película: " + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al eliminar la película: ${req.originalUrl}`));
    }
  }
}

module.exports = new PeliculaController();
