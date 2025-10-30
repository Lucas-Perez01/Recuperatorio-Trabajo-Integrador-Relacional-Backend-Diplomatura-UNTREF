import Contenido from "../models/contenido.js";
import Categoria from "../models/categoria.js";

const getAllContenido = async (req, res) => {
  try {
    const contenidos = await Contenido.findAll();
    res.json(contenidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al obtener contenidos",
        details: error.message,
      },
    });
  }
};

const getContenidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const contenido = await Contenido.findByPk(id);

    if (!contenido) {
      return res.status(404).json({
        error: {
          code: 404,
          message: "Contenido no encontrado",
        },
      });
    }

    res.json(contenido);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al obtener el contenido",
        details: error.message,
      },
    });
  }
};

export { getAllContenido, getContenidoById };
