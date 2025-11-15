import express from "express";
import { getAllActores } from "../controllers/actorController.js";

const router = express.Router();

router.get("/", getAllActores);

export default router;
