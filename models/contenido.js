// Model for Contenido

import { DataTypes } from "sequelize";
import sequelize from "../conexion/database.js";
import Categoria from "../Categoria.js";

const Contenido = sequelize.define("Contenido", {
  id_contenido: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resumen: {
    type: DataTypes.TEXT,
  },
  temporadas: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  trailer_url: {
    type: DataTypes.STRING,
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    references: {
      model: Categoria,
      key: "id_categoria",
    },
  },
});

export default Contenido;
