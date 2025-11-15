import express from "express";
import { getAllCategorias } from "../controllers/categoriaController.js";

const router = express.Router();

router.get("/", getAllCategorias);

export default router;
