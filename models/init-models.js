var DataTypes = require("sequelize").DataTypes;
var _sagas = require("./sagas");
var _peliculas = require("./peliculas");

function initModels(sequelize) {
  var sagas = _sagas(sequelize, DataTypes);
  var peliculas = _peliculas(sequelize, DataTypes);

  // Relación: una saga tiene muchas películas
  sagas.hasMany(peliculas, { as: "peliculas", foreignKey: "saga_id" });
  // Relación: una película pertenece a una saga
  peliculas.belongsTo(sagas, { as: "saga", foreignKey: "saga_id" });

  return {
    sagas,
    peliculas,
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
