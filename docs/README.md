# TrailerFlix API

API RESTful desarrollada para el **recuperatorio del Trabajo Integrador
Backend -- Base de Datos Relacional -- Diplomatura UNTREF**.

El proyecto gestiona contenidos audiovisuales similares a un catálogo de
streaming (películas y series), incluyendo géneros, categorías y actores
asociados.

## 📌 Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **MySQL / MariaDB**
- **Sequelize ORM**
- **Swagger UI** para documentación
- **REST Client** (api.http) para pruebas

## 📁 Estructura del Proyecto

Recuperatorio-Trabajo-Integrador-Relacional-Backend-Diplomatura-UNTREF/
│
├── conexion/
│ ├── database.js
│ └── index.js
│
├── controllers/
│ ├── actorController.js
│ ├── categoriaController.js
│ ├── contenidoController.js
│ └── generoController.js
│
├── docs/
│ ├── Create trailerflixDB - Create Tables.sql
│ ├── trailerflixDB - inserts.sql
│ ├── swagger.js
│ └── TrailerFlix.png
│
├── json/
│ └── trailerflix.json
│
├── models/
│ ├── actor.js
│ ├── categoria.js
│ ├── contenido.js
│ └── genero.js
│
├── routes/
│ ├── actorRoutes.js
│ ├── categoriaRoutes.js
│ ├── contenidoRoutes.js
│ └── generoRoutes.js
│
├── .env
├── .gitignore
├── api.http
├── app.js
├── package.json
├── package-lock.json
└── README.md

## 🗄️ Modelo de Base de Datos

La base de datos está formada por las siguientes tablas:

- **contenidos**
- **categorias**
- **generos**
- **actores**
- **contenido_genero** (relación N:N)
- **contenido_actor** (relación N:N)

Incluye **ON DELETE CASCADE** para mantener integridad en las tablas
intermedias.

## 🚀 Endpoints Principales

### **Contenidos**

---

Método Ruta Descripción

---

GET `/contenido` Obtener todos los contenidos

GET `/contenido/:id` Obtener contenido por ID

GET `/contenido/buscar?titulo=` Filtrar por título

GET `/contenido/buscarGenero?genero=` Filtrar por género

GET `/contenido/buscarCategoria?categoria=` Filtrar por categoría

POST `/contenido` Crear contenido

PUT `/contenido/:id` Actualizar completamente

PATCH `/contenido/:id` Actualizar parcialmente

DELETE `/contenido/:id` Eliminar contenido

---

### **Endpoints Adicionales**

Método Ruta

---

GET `/categorias`
GET `/generos`
GET `/actores`

## ⚠️ Manejo de Errores Incluido

- **404**: Contenido no encontrado\
- **400**: Datos inválidos\
- **404**: Ruta inexistente

## 🧪 Pruebas -- `api.http`

El archivo `api.http` incluye:

- Pruebas de todos los endpoints obligatorios\
- Pruebas opcionales\
- Pruebas de manejo de errores

## 📚 Documentación Swagger

Disponible en:

    http://localhost:3000/api-docs

Incluye todos los endpoints, esquemas y ejemplos de entrada/salida.

## 🧩 Instalación

1.  Clonar el repositorio\
2.  Instalar dependencias:

    npm install express,
    dotenv,
    mysql2,
    sequelize,
    swagger-jsdoc,
    swagger-ui-express

3.  Configurar `.env`:

    DB_HOST=localhost
    DB_USER=root
    DB_PASS=
    DB_NAME=trailerflix
    PORT=3000

4.  Ejecutar:

    npm start
