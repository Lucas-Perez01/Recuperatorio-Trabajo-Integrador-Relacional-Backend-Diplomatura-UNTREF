import express from "express";
import { swaggerUi, swaggerSpec } from "./docs/swagger.js";
import { testConnection } from "./conexion/database.js";
import contenidoRoutes from "./routes/contenidoRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import generoRoutes from "./routes/generoRoutes.js";
import actorRoutes from "./routes/actorRoutes.js";

const app = express();

// Middleware JSON
app.use(express.json());

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Usar rutas
app.use("/contenido", contenidoRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/generos", generoRoutes);
app.use("/actores", actorRoutes);

// Probar conexión al iniciar
testConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
