# Construccion del Sistema - ContactFlow DevOps

Este documento explica el proceso de construccion (build) del sistema completo: instalacion de dependencias, creacion de bases de datos y arranque de cada modulo.

## Archivos que intervienen en la construccion

| Archivo | Rol |
|---------|-----|
| `contactflow-v1/backend/package.json` | Define dependencias y scripts (`start`, `dev`, `check`) del backend V1 |
| `contactflow-v1/frontend/package.json` | Define dependencias y scripts (`dev`, `build`, `preview`) del frontend V1 |
| `contactflow-v2/backend/package.json` | Define dependencias y scripts del backend V2 |
| `contactflow-v2/frontend/package.json` | Define dependencias y scripts del frontend V2 |
| `contactflow-v1/backend/database/schema.sql` | Crea la tabla `contacts` de V1 |
| `contactflow-v1/backend/database/seed.sql` | Inserta datos de prueba en V1 |
| `contactflow-v2/backend/database/schema.sql` | Crea la tabla `contacts` de V2 (con categoria y notas) |
| `contactflow-v2/backend/database/seed.sql` | Inserta datos de prueba en V2 |
| `*/backend/.env.example` | Plantilla de variables de entorno del backend |
| `*/frontend/.env.example` | Plantilla de variables de entorno del frontend (VITE_API_URL) |
| `.github/workflows/ci.yml` | Automatiza la construccion en cada push/pull request |

## 1. Instalar dependencias

Cada modulo (backend y frontend, de cada version) tiene su propio `package.json` y se instala de forma independiente:

```
cd contactflow-v1/backend && npm install
cd contactflow-v1/frontend && npm install
cd contactflow-v2/backend && npm install
cd contactflow-v2/frontend && npm install
```

## 2. Crear las bases de datos

Se requieren dos bases de datos PostgreSQL independientes:

```
createdb contactflow_v1
createdb contactflow_v2
```

## 3. Ejecutar schema.sql y seed.sql

Para V1:

```
psql -U usuario -d contactflow_v1 -f contactflow-v1/backend/database/schema.sql
psql -U usuario -d contactflow_v1 -f contactflow-v1/backend/database/seed.sql
```

Para V2:

```
psql -U usuario -d contactflow_v2 -f contactflow-v2/backend/database/schema.sql
psql -U usuario -d contactflow_v2 -f contactflow-v2/backend/database/seed.sql
```

## 4. Configurar variables de entorno

En cada backend y frontend, copiar el archivo de ejemplo:

```
copy .env.example .env      (Windows)
cp .env.example .env        (Linux/macOS)
```

Y editar `DATABASE_URL` con las credenciales reales de PostgreSQL.

## 5. Iniciar Backend V1

```
cd contactflow-v1/backend
npm run dev
```

Disponible en `http://localhost:4001`.

## 6. Iniciar Frontend V1

```
cd contactflow-v1/frontend
npm run dev
```

Disponible en `http://localhost:5173`.

## 7. Iniciar Backend V2

```
cd contactflow-v2/backend
npm run dev
```

Disponible en `http://localhost:4002`.

## 8. Iniciar Frontend V2

```
cd contactflow-v2/frontend
npm run dev
```

Disponible en `http://localhost:5174`.

## Validacion de la construccion

- Backend: `npm run check` ejecuta `node --check` sobre cada archivo fuente para detectar errores de sintaxis sin necesidad de un paso de compilacion.
- Frontend: `npm run build` genera el paquete de produccion con Vite en la carpeta `dist/`.

Estos mismos comandos son los que ejecuta automaticamente GitHub Actions (ver `integracion-continua.md`).
