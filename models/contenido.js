// Model for Contenido

import { DataTypes } from "sequelize";
import { sequelize } from "../conexion/database.js";
import Categoria from "./categoria.js";
import Genero from "./genero.js";
import Actor from "./actor.js";

const Contenido = sequelize.define(
  "Contenido",
  {
    id_contenido: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    poster: DataTypes.STRING(255),
    resumen: DataTypes.TEXT,
    temporadas: DataTypes.INTEGER,
    trailer_url: DataTypes.STRING(255),
    id_categoria: {
      type: DataTypes.INTEGER,
      references: {
        model: Categoria,
        key: "id_categoria",
      },
    },
  },
  {
    tableName: "contenido",
    timestamps: false,
  }
);

// Relaciones
Contenido.belongsTo(Categoria, { foreignKey: "id_categoria", as: "categoria" });
Categoria.hasMany(Contenido, { foreignKey: "id_categoria", as: "contenidos" });

Contenido.belongsToMany(Genero, {
  through: "contenido_genero",
  foreignKey: "id_contenido",
  otherKey: "id_genero",
  timestamps: false,
  as: "generos",
});

Genero.belongsToMany(Contenido, {
  through: "contenido_genero",
  foreignKey: "id_genero",
  otherKey: "id_contenido",
  timestamps: false,
  as: "contenidos",
});

Contenido.belongsToMany(Actor, {
  through: "contenido_actor",
  foreignKey: "id_contenido",
  otherKey: "id_actor",
  timestamps: false,
  as: "actores",
});

Actor.belongsToMany(Contenido, {
  through: "contenido_actor",
  foreignKey: "id_actor",
  otherKey: "id_contenido",
  timestamps: false,
  as: "contenidos",
});

export default Contenido;
