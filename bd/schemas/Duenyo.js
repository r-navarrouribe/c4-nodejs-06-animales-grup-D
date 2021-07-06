const { DataTypes } = require("sequelize");
const sequelize = require("..");
const Animal = require("./Animal");

const Duenyo = sequelize.define(
  "Duenyo",
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
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING(9),
      unique: true,
    },
  },
  {
    tableName: "duenyos",
    timestamps: false,
  }
);

Duenyo.hasMany(Animal, { foreignKey: "id_duenyo" });
Animal.belongsTo(Duenyo, { foreignKey: "id_duenyo" });

module.exports = Duenyo;
