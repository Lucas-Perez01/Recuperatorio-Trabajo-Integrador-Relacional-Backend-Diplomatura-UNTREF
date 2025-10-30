import express from "express";
import { testConnection } from "./conexion/database.js";

const app = express();

// Probar conexión al iniciar
testConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
