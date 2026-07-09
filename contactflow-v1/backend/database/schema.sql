-- Esquema de base de datos para ContactFlow V1 (Agenda basica)

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  apellido VARCHAR(80) NOT NULL,
  telefono VARCHAR(30) NOT NULL,
  correo VARCHAR(120) NOT NULL UNIQUE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
