// Model for Genero

import { DataTypes } from "sequelize";
import sequelize from "../conexion/database.js";

const Genero = sequelize.define("Genero", {
  id_genero: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Genero;
