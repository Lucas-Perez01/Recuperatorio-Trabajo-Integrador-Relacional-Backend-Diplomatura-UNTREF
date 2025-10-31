import express from "express";
import {
  getAllContenido,
  getContenidoById,
  getContenidoByTitulo,
} from "../controllers/contenidoController.js";

const router = express.Router();

router.get("/", getAllContenido);
router.get("/buscar", getContenidoByTitulo);
router.get("/:id", getContenidoById);

export default router;
