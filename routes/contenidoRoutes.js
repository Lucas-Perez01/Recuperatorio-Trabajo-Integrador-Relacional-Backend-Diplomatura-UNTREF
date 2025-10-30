import express from "express";
import {
  getAllContenido,
  getContenidoById,
} from "../controllers/contenidoController.js";

const router = express.Router();

router.get("/", getAllContenido);
router.get("/:id", getContenidoById);

export default router;
