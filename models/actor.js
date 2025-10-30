// Model for Actor

import { DataTypes } from "sequelize";
import { sequelize } from "../conexion/database.js";

const Actor = sequelize.define(
  "Actor",
  {
    id_actor: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "actor",
    timestamps: false,
  }
);

export default Actor;
