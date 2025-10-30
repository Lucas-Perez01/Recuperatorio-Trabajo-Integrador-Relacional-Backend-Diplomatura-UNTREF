// src/conexion/database.js
import { Sequelize } from "sequelize";
import config from "./index.js";

// Conexión a la base de datos MySQL usando variables de entorno
const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: "mysql",
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  }
);

// Prueba de conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos");
  } catch (error) {
    console.error("Error de conexión:", error);
  }
};

export { sequelize, testConnection };
