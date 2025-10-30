// Model for Categoria

import { DataTypes } from "sequelize";
import { sequelize } from "../conexion/database.js";

const Categoria = sequelize.define(
  "Categoria",
  {
    id_categoria: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "categoria",
    timestamps: false,
  }
);

export default Categoria;
