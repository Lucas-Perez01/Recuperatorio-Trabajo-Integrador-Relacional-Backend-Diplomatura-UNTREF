// Model for Actor

import { DataTypes } from "sequelize";
import sequelize from "../conexion/database.js";

const Actor = sequelize.define("Actor", {
  id_actor: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_actor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Actor;
