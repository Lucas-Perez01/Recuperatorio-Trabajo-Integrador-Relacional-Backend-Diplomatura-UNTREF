import express from "express";
import { testConnection } from "./conexion/database.js";
import contenidoRoutes from "./routes/contenidoRoutes.js";

const app = express();

// Middleware JSON
app.use(express.json());

// Usar rutas
app.use("/contenido", contenidoRoutes);

// Probar conexión al iniciar
testConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
