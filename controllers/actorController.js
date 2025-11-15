import Actor from "../models/actor.js";

// Obtener todos los actores
const getAllActores = async (req, res) => {
  try {
    // Obtener todos los actores desde la base de datos
    const actores = await Actor.findAll({
      attributes: ["id_actor", "nombre"],
    });

    res.json(actores);
  } catch (error) {
    console.error("Error al obtener actores:", error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al obtener actores",
        details: error.message,
      },
    });
  }
};

export { getAllActores };
