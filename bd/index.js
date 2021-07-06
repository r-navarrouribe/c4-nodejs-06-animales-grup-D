require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  host: "localhost",
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dialect: "mysql",
});

module.exports = sequelize;
