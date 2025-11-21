-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS trailerflix;
USE trailerflix;

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de géneros
CREATE TABLE IF NOT EXISTS genero (
    id_genero INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla de actores
CREATE TABLE IF NOT EXISTS actor (
    id_actor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);

-- Tabla principal de contenido
CREATE TABLE IF NOT EXISTS contenido (
    id_contenido INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    poster VARCHAR(255),
    resumen TEXT,
    temporadas INT,
    trailer_url VARCHAR(255),
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

-- Tabla intermedia contenido-actores (N a N)
CREATE TABLE IF NOT EXISTS contenido_actor (
    id_contenido INT,
    id_actor INT,
    PRIMARY KEY (id_contenido, id_actor),
    FOREIGN KEY (id_contenido) REFERENCES contenido(id_contenido) ON DELETE CASCADE,
    FOREIGN KEY (id_actor) REFERENCES actor(id_actor) ON DELETE CASCADE
);

-- Tabla intermedia contenido-géneros (N a N)
CREATE TABLE IF NOT EXISTS contenido_genero (
    id_contenido INT,
    id_genero INT,
    PRIMARY KEY (id_contenido, id_genero),
    FOREIGN KEY (id_contenido) REFERENCES contenido(id_contenido) ON DELETE CASCADE,
    FOREIGN KEY (id_genero) REFERENCES genero(id_genero) ON DELETE CASCADE
);
