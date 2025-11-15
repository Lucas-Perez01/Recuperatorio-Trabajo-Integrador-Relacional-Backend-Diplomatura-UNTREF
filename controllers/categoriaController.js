import Categoria from "../models/categoria.js";

// Obtener todas las categorías
const getAllCategorias = async (req, res) => {
  try {
    // Busca todas las categorías en la base de datos
    const categorias = await Categoria.findAll({
      attributes: ["id_categoria", "nombre"],
    });

    res.json(categorias);
  } catch (error) {
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al obtener categorías",
        details: error.message,
      },
    });
  }
};

export { getAllCategorias };
