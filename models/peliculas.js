module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "peliculas",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duracion: {
        type: DataTypes.INTEGER, // duración en minutos
        allowNull: false,
      },
      fecha_estreno: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      recaudacion: {
        type: DataTypes.DECIMAL(15, 2), // cantidad en dinero
        allowNull: true,
      },
      saga_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "sagas",
          key: "id",
        },
      },
    },
    {
      tableName: "peliculas",
      timestamps: false,
    }
  );
};
