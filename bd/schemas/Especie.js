const { DataTypes } = require("sequelize");
const sequelize = require("..");
const Animal = require("./Animal");

const Especie = sequelize.define(
  "Especie",
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
  },
  {
    tableName: "especies",
    timestamps: false,
  }
);

Especie.hasMany(Animal, { foreignKey: "id_especie" });
Animal.belongsTo(Especie, { foreignKey: "id_especie" });

module.exports = Especie;
