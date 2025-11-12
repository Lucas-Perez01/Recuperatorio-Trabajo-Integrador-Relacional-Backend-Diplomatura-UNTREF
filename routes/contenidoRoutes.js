import express from "express";
import {
  getAllContenido,
  getContenidoById,
  getContenidoByTitulo,
  getContenidoByGenero,
  getContenidoByCategoria,
  createContenido,
  updateContenido,
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

router.put("/:id", updateContenido);

export default router;
