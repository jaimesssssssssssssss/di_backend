module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "sagas",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      activa: {
        type: DataTypes.INTEGER, // ahora es numérico
        allowNull: false,
        defaultValue: 1, // 1 = activa, 0 = inactiva
      },
    },
    {
      tableName: "sagas",
      timestamps: false,
    }
  );
};
