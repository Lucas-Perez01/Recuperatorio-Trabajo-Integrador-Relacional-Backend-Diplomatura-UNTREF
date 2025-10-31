import express from "express";
import {
  getAllContenido,
  getContenidoById,
  getContenidoByTitulo,
  getContenidoByGenero,
} from "../controllers/contenidoController.js";

const router = express.Router();

// Buscar contenido por título
router.get("/buscar", getContenidoByTitulo);

// Buscar contenido por género
router.get("/buscarGenero", getContenidoByGenero);

// Obtener contenido por ID
router.get("/:id", getContenidoById);

// Obtener todos los contenidos
router.get("/", getAllContenido);

export default router;
