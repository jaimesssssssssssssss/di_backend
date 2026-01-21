const mysql = require("mysql2");
const config = require("../config/config");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || config.dbHost,
  user: process.env.DB_USER || config.dbUser,
  password: process.env.DB_PASSWORD || config.dbPassword,
  database: process.env.DB_NAME || config.dbName,
  port: process.env.DB_PORT || config.dbPort,
});

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err);
    return;
  }
  console.log("¡Conectado correctamente a la base de datos online!");
});

module.exports = connection;
