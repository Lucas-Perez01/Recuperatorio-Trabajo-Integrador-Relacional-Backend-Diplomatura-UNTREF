import { Op } from "sequelize";
import Contenido from "../models/contenido.js";
import Categoria from "../models/categoria.js";
import Actor from "../models/actor.js";
import Genero from "../models/genero.js";

// Controladores GET para contenidos

// Obtener todos los contenidos
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

// Obtener contenido por ID
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

// Obtener contenido por título
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

// Obtener contenido por género
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

// Obtener contenido por categoría
const getContenidoByCategoria = async (req, res) => {
  try {
    const { categoria } = req.query;

    if (!categoria) {
      return res.status(400).json({
        error: { code: 400, message: "Debe proporcionar una categoría." },
      });
    }

    const contenidos = await Contenido.findAll({
      include: [
        {
          model: Categoria,
          as: "categoria",
          where: { nombre: categoria },
          attributes: ["nombre"],
          required: true,
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
          message: `No se encontraron contenidos con la categoría '${categoria}'.`,
        },
      });
    }

    res.status(200).json(contenidos);
  } catch (error) {
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al obtener contenidos por categoría",
        details: error.message,
      },
    });
  }
};

// POST:

// Crear nuevo contenido
const createContenido = async (req, res) => {
  try {
    const {
      titulo,
      id_categoria, // Si categoria es 2 es Película, si es 1 es Serie
      resumen,
      temporadas,
      trailer,
      generos,
      actores,
    } = req.body;

    // Validaciones
    if (!titulo || !id_categoria) {
      return res.status(400).json({
        error: {
          code: 400,
          message: "El título y la categoría son obligatorios.",
        },
      });
    }

    // Si el contenido ya existe
    const existente = await Contenido.findOne({ where: { titulo } });
    if (existente) {
      return res.status(409).json({
        error: {
          code: 409,
          message: `Ya existe un contenido con el título '${titulo}'.`,
        },
      });
    }

    // Validaciones específicas
    if (id_categoria === 2 && temporadas !== null && temporadas !== undefined) {
      return res.status(400).json({
        error: {
          code: 400,
          message: "Las películas no deben tener temporadas.",
        },
      });
    }

    if (id_categoria === 1 && (!temporadas || temporadas < 1)) {
      return res.status(400).json({
        error: {
          code: 400,
          message: "Las series deben tener al menos una temporada.",
        },
      });
    }

    // Crear el nuevo contenido
    const nuevoContenido = await Contenido.create({
      titulo,
      id_categoria,
      resumen,
      temporadas: temporadas || null,
      trailer_url: trailer || null,
    });

    // Asociamos géneros si existen
    if (Array.isArray(generos) && generos.length > 0) {
      await nuevoContenido.addGeneros(generos);
    }

    // Asociamos actores si existen
    if (Array.isArray(actores) && actores.length > 0) {
      await nuevoContenido.addActores(actores);
    }

    // Aca obtenemos el contenido y sus relaciones
    const contenidoCreado = await Contenido.findByPk(
      nuevoContenido.id_contenido,
      {
        include: [
          {
            model: Genero,
            as: "generos",
            attributes: ["nombre"],
            through: { attributes: [] },
          },
          {
            model: Actor,
            as: "actores",
            attributes: ["nombre"],
            through: { attributes: [] },
          },
        ],
      }
    );

    res.status(201).json({
      message: "Contenido creado exitosamente",
      contenido: contenidoCreado,
    });
  } catch (error) {
    console.error("Error al crear contenido:", error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al crear contenido",
        details: error.message,
      },
    });
  }
};

// PUT:

// Actualizar contenido existente
const updateContenido = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titulo,
      id_categoria, // Si categoria es 2 es Película, si es 1 es Serie
      resumen,
      temporadas,
      trailer,
      generos,
      actores,
    } = req.body;

    // Verifica que el contenido exista
    const contenido = await Contenido.findByPk(id);
    if (!contenido) {
      return res.status(404).json({
        error: {
          code: 404,
          message: `No se encontró contenido con ID ${id}.`,
        },
      });
    }

    // Validaciones de campos (esto es obligatorio)
    if (!titulo || !id_categoria) {
      return res.status(400).json({
        error: {
          code: 400,
          message: "El título y la categoría son obligatorios.",
        },
      });
    }

    // Validaciones según tipo (si es película o serie)
    if (id_categoria === 2 && temporadas !== null && temporadas !== undefined) {
      return res.status(400).json({
        error: {
          code: 400,
          message: "Las películas no deben tener temporadas.",
        },
      });
    }

    if (id_categoria === 1 && (!temporadas || temporadas < 1)) {
      return res.status(400).json({
        error: {
          code: 400,
          message: "Las series deben tener al menos una temporada.",
        },
      });
    }

    // Validar título duplicado (que no sea el mismo contenido)
    const tituloExistente = await Contenido.findOne({
      where: { titulo, id_contenido: { [Op.ne]: id } },
    });

    if (tituloExistente) {
      return res.status(409).json({
        error: {
          code: 409,
          message: `Ya existe un contenido con el título '${titulo}'.`,
        },
      });
    }

    // Si pasa todas las validaciones:

    // Actualizamos el contenido
    await contenido.update({
      titulo,
      id_categoria,
      resumen,
      temporadas: temporadas || null,
      trailer_url: trailer || null,
    });

    // Actualizamos relaciones
    if (Array.isArray(generos)) {
      await contenido.setGeneros(generos); // Esto reemplaza relaciones
    }

    if (Array.isArray(actores)) {
      await contenido.setActores(actores);
    }

    // Aca recuperamos el contenido actualizado con sus relaciones
    const contenidoActualizado = await Contenido.findByPk(id, {
      include: [
        {
          model: Genero,
          as: "generos",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
        {
          model: Actor,
          as: "actores",
          attributes: ["nombre"],
          through: { attributes: [] },
        },
        { model: Categoria, as: "categoria", attributes: ["nombre"] },
      ],
    });

    res.json({
      message: "Contenido actualizado exitosamente.",
      contenido: contenidoActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar contenido:", error);
    res.status(500).json({
      error: {
        code: 500,
        message: "Error al actualizar contenido.",
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
  getContenidoByCategoria,
  createContenido,
  updateContenido,
};
