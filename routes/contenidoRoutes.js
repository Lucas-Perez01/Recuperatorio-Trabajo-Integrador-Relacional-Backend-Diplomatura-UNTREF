import express from "express";
import {
  getAllContenido,
  getContenidoById,
  getContenidoByTitulo,
  getContenidoByGenero,
  getContenidoByCategoria,
  createContenido,
  updateContenido,
  patchContenido,
  deleteContenido,
} from "../controllers/contenidoController.js";

const router = express.Router();

// Buscar contenido por título
router.get("/buscar", getContenidoByTitulo);

// Buscar contenido por género
router.get("/buscarGenero", getContenidoByGenero);

// Buscar contenido por categoría
router.get("/buscarCategoria", getContenidoByCategoria);

// Obtener contenido por ID
router.get("/:id", getContenidoById);

// Obtener todos los contenidos
router.get("/", getAllContenido);

// Crear nuevo contenido
router.post("/", createContenido);

// Actualizar un contenido
router.put("/:id", updateContenido);

// Actualizar parcialmente un contenido
router.patch("/:id", patchContenido);

// Eliminar un contenido por ID
router.delete("/:id", deleteContenido);

export default router;
