const { Sequelize } = require("sequelize");

const DB_PORT = 5432;
const DB_NAME = "ecommerce";
const DB_USER = "root";
const DB_PASSWORD = "root";
const DB_HOST = "node_ecommerce_db";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  port: DB_PORT,
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
