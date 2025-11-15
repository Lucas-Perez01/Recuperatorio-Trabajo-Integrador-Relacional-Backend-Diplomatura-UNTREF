import express from "express";
import { getAllGeneros } from "../controllers/generoController.js";

const router = express.Router();

router.get("/", getAllGeneros);

export default router;
