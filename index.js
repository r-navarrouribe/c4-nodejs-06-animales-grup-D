const { Sequelize, DataTypes, Op } = require("sequelize");

Sequelize.define(
  "Duenyos",
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
    timestamp: false,
  }
);
Sequelize.define(
  "Especies",
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
    timestamp: false,
  }
);
Sequelize.define(
  "Animales",
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
      type: DataTypes.INT,
      unique: true,
    },
    id_especie: {
      type: DataTypes.INT,
      allowNull: false,
    },
    id_duenyo: {
      type: DataTypes.INT,
      allowNull: true,
    },
  },
  {
    tableName: "animales",
    timestamp: false,
  }
);

const duenyo = (dni) => {
  try {
    Duenyos.findAll({
      where: {
        dni: {
          [Op.eq]: dni,
        },
      },
    });
  } catch (err) {
    console.log("No existe ningun usuario con ese dni");
  }
};
