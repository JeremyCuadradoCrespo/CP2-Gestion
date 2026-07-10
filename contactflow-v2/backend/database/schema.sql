-- Esquema de base de datos para ContactFlow V2 (Agenda avanzada)

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  apellido VARCHAR(80) NOT NULL,
  telefono VARCHAR(30) NOT NULL,
  correo VARCHAR(120) NOT NULL UNIQUE,
  categoria VARCHAR(30) NOT NULL CHECK (categoria IN ('Personal', 'Trabajo', 'Universidad', 'Familia', 'Otro')),
  notas TEXT,
  favorito BOOLEAN NOT NULL DEFAULT FALSE,
  eliminado BOOLEAN NOT NULL DEFAULT FALSE,
  fecha_eliminacion TIMESTAMP,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migracion para bases de datos creadas antes de agregar favoritos y papelera.
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS favorito BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS eliminado BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS fecha_eliminacion TIMESTAMP;
