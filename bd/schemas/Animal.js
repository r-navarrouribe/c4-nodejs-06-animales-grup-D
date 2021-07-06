const { DataTypes } = require("sequelize");
const sequelize = require("..");

const Animal = sequelize.define(
  "Animal",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numero_chip: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    id_especie: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_duenyo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "animales",
    timestamp: false,
  }
);

module.exports = Animal;
