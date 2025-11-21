import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "TrailerFlix API",
      version: "1.0.0",
      description:
        "API para la plataforma TrailerFlix — CRUD de contenidos, categorías, géneros y actores.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    components: {
      schemas: {
        Contenido: {
          type: "object",
          properties: {
            id_contenido: { type: "integer", example: 1 },
            titulo: { type: "string", example: "The Mandalorian" },
            poster: { type: "string", example: "./posters/3.jpg" },
            resumen: { type: "string", example: "Resumen de ejemplo..." },
            temporadas: { type: ["integer", "null"], example: 2 },
            trailer: { type: "string", example: "https://youtube.com/..." },
            id_categoria: { type: "integer", example: 1 },
            categoria: {
              type: "object",
              properties: {
                id_categoria: { type: "integer", example: 1 },
                nombre: { type: "string", example: "Serie" },
              },
            },
            generos: {
              type: "array",
              items: { $ref: "#/components/schemas/Genero" },
            },
            actores: {
              type: "array",
              items: { $ref: "#/components/schemas/Actor" },
            },
          },
        },

        ContenidoCreate: {
          type: "object",
          required: ["titulo", "id_categoria"],
          properties: {
            titulo: { type: "string" },
            id_categoria: { type: "integer" },
            resumen: { type: "string" },
            temporadas: { type: ["integer", "null"] },
            trailer: { type: "string" },
            generos: { type: "array", items: { type: "integer" } },
            actores: { type: "array", items: { type: "integer" } },
          },
        },

        Categoria: {
          type: "object",
          properties: {
            id_categoria: { type: "integer", example: 1 },
            nombre: { type: "string", example: "Serie" },
          },
        },

        Genero: {
          type: "object",
          properties: {
            id_genero: { type: "integer", example: 1 },
            nombre: { type: "string", example: "Acción" },
          },
        },

        Actor: {
          type: "object",
          properties: {
            id_actor: { type: "integer", example: 1 },
            nombre: { type: "string", example: "Pedro Pascal" },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "object",
              properties: {
                code: { type: "integer" },
                message: { type: "string" },
                details: { type: ["string", "null"] },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

swaggerSpec.paths = {
  "/contenido": {
    get: {
      tags: ["Contenido"],
      summary: "Obtener todos los contenidos",
      responses: {
        200: {
          description: "Lista de contenidos",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Contenido" },
              },
            },
          },
        },
        500: { description: "Error de servidor" },
      },
    },
    post: {
      tags: ["Contenido"],
      summary: "Crear un nuevo contenido",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ContenidoCreate" },
          },
        },
      },
      responses: {
        201: { description: "Contenido creado" },
        400: { description: "Datos inválidos" },
        409: { description: "Título duplicado" },
        500: { description: "Error de servidor" },
      },
    },
  },

  "/contenido/{id}": {
    get: {
      tags: ["Contenido"],
      summary: "Obtener contenido por ID",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "integer" } },
      ],
      responses: {
        200: { description: "Contenido encontrado" },
        404: { description: "No encontrado" },
      },
    },

    put: {
      tags: ["Contenido"],
      summary: "Actualizar completamente un contenido",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "integer" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ContenidoCreate" },
          },
        },
      },
      responses: {
        200: { description: "Contenido actualizado" },
        400: { description: "Datos inválidos" },
        404: { description: "No encontrado" },
      },
    },

    patch: {
      tags: ["Contenido"],
      summary: "Actualización parcial",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "integer" } },
      ],
      requestBody: {
        required: true,
        content: { "application/json": { schema: { type: "object" } } },
      },
      responses: {
        200: { description: "Contenido parcialmente actualizado" },
        400: { description: "Datos inválidos" },
        404: { description: "No encontrado" },
      },
    },

    delete: {
      tags: ["Contenido"],
      summary: "Eliminar un contenido",
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "integer" } },
      ],
      responses: {
        200: { description: "Contenido eliminado" },
        404: { description: "No encontrado" },
      },
    },
  },

  "/contenido/buscar": {
    get: {
      tags: ["Filtros"],
      summary: "Filtrar contenidos por título",
      parameters: [
        {
          name: "titulo",
          in: "query",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Resultados de la búsqueda" },
        400: { description: "Parámetro inválido" },
        404: { description: "Sin resultados" },
      },
    },
  },

  "/contenido/buscarGenero": {
    get: {
      tags: ["Filtros"],
      summary: "Filtrar contenidos por género",
      parameters: [
        {
          name: "genero",
          in: "query",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Resultados por género" },
        400: { description: "Parámetro inválido" },
        404: { description: "Sin resultados" },
      },
    },
  },

  "/contenido/buscarCategoria": {
    get: {
      tags: ["Filtros"],
      summary: "Filtrar contenidos por categoría",
      parameters: [
        {
          name: "categoria",
          in: "query",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Resultados por categoría" },
        400: { description: "Parámetro inválido" },
        404: { description: "Sin resultados" },
      },
    },
  },

  "/categorias": {
    get: {
      tags: ["Categorías"],
      summary: "Obtener todas las categorías",
      responses: {
        200: { description: "Lista de categorías" },
        500: { description: "Error de servidor" },
      },
    },
  },

  "/generos": {
    get: {
      tags: ["Géneros"],
      summary: "Obtener todos los géneros",
      responses: {
        200: { description: "Lista de géneros" },
        500: { description: "Error de servidor" },
      },
    },
  },

  "/actores": {
    get: {
      tags: ["Actores"],
      summary: "Obtener todos los actores",
      responses: {
        200: { description: "Lista de actores" },
        500: { description: "Error de servidor" },
      },
    },
  },
};

export { swaggerSpec, swaggerUi };
