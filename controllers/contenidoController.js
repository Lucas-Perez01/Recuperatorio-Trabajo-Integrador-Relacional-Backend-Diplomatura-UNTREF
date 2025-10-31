import { Op } from "sequelize";
import Contenido from "../models/contenido.js";
import Categoria from "../models/categoria.js";
import Actor from "../models/actor.js";
import Genero from "../models/genero.js";

const getAllContenido = async (req, res) => {
  try {
    const { titulo } = req.query;

    const where = titulo ? { titulo: { [Op.like]: `%${titulo}%` } } : {};

    const contenidos = await Contenido.findAll({
      where,
      include: [{ model: Categoria, as: "categoria", attributes: ["nombre"] }],
    });

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

const getContenidoByTitulo = async (req, res) => {
  try {
    const { titulo } = req.query;

    if (!titulo) {
      return res.status(400).json({
        error: {
          code: 400,
          message: "Debe proporcionar un título",
        },
      });
    }

    const contenidos = await Contenido.findAll({
      where: {
        titulo: { [Op.like]: `%${titulo}%` },
      },
      attributes: [
        "id_contenido",
        "titulo",
        "poster",
        "resumen",
        "temporadas",
        "trailer_url",
      ],
      include: [{ model: Categoria, as: "categoria", attributes: ["nombre"] }],
    });

    if (contenidos.length === 0) {
      return res.status(404).json({
        error: {
          code: 404,
          message: `No se encontraron contenidos que coincidan con el título '${titulo}'`,
        },
      });
    }

    res.json(contenidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al obtener contenidos por título",
        details: error.message,
      },
    });
  }
};

const getContenidoByGenero = async (req, res) => {
  try {
    const { genero } = req.query;

    if (!genero) {
      return res.status(400).json({
        error: { code: 400, message: "Debe proporcionar un género." },
      });
    }

    const contenidos = await Contenido.findAll({
      include: [
        {
          model: Genero,
          as: "generos",
          where: { nombre: genero },
          attributes: ["nombre"],
          through: { attributes: [] },
        },
        {
          model: Categoria,
          as: "categoria",
          attributes: ["nombre"],
        },
      ],
      attributes: [
        "id_contenido",
        "titulo",
        "poster",
        "resumen",
        "temporadas",
        "trailer_url",
      ],
    });

    if (contenidos.length === 0) {
      return res.status(404).json({
        error: {
          code: 404,
          message: `No se encontraron contenidos con el género '${genero}'.`,
        },
      });
    }

    res.json(contenidos);
  } catch (error) {
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al obtener contenidos por género",
        details: error.message,
      },
    });
  }
};
export {
  getAllContenido,
  getContenidoById,
  getContenidoByTitulo,
  getContenidoByGenero,
};
