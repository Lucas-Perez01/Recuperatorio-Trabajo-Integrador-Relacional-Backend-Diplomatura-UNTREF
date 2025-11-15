import Genero from "../models/genero.js";

// Obtener todos los géneros
const getAllGeneros = async (req, res) => {
  try {
    // Obtener todos los géneros desde la base de datos
    const generos = await Genero.findAll({
      attributes: ["id_genero", "nombre"],
    });

    res.json(generos);
  } catch (error) {
    console.error("Error al obtener géneros:", error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al obtener géneros",
        details: error.message,
      },
    });
  }
};

export { getAllGeneros };
