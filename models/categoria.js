// Model for Categoria

import { DataTypes } from "sequelize";
import sequelize from "../conexion/database.js";

const Categoria = sequelize.define("Categoria", {
  id_categoria: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Categoria;
