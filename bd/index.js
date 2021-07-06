require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  host: "localhost",
  username: process.env.USERNAMEDB,
  password: process.env.PASSWORDDB,
  database: process.env.DATABASE,
  dialect: "mysql",
});

module.exports = sequelize;
