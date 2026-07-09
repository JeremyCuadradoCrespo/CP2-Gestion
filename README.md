# ContactFlow DevOps

Proyecto Final Integrador: **Implementacion de un Entorno DevOps para una Aplicacion Simple**

Caso de estudio: Agenda de Contactos con arquitectura Full Stack y entorno DevOps.

## Descripcion

ContactFlow DevOps es un repositorio academico que contiene **dos sistemas full stack reales e independientes**, `contactflow-v1` y `contactflow-v2`, cada uno con su propio frontend (React + Vite), su propio backend (Node.js + Express) y su propia base de datos (PostgreSQL). El objetivo es demostrar, de forma practica, los pilares de la Gestion de la Configuracion de Software: gestion del cambio, control de versiones, construccion del sistema, integracion continua, despliegue continuo, reutilizacion de software y variabilidad real.

## Objetivo academico

Implementar una agenda de contactos full stack aplicando Gestion de la Configuracion de Software, demostrando:

- Gestion del cambio.
- Gestion de versiones con Git y GitHub.
- Construccion del sistema.
- Backend con endpoints REST.
- Base de datos relacional.
- Integracion continua con GitHub Actions.
- Despliegue continuo.
- Reutilizacion de software.
- Variabilidad mediante dos versiones reales del sistema.

## Arquitectura general

Cada version es un sistema full stack autonomo:

```
Frontend (React + Vite)  <-- HTTP / REST -->  Backend (Node.js + Express)  <-- pg -->  PostgreSQL
```

No existe codigo ni base de datos compartida entre V1 y V2: son dos aplicaciones separadas dentro del mismo repositorio, cada una desplegable de forma independiente.

## contactflow-v1 - Agenda basica

Version 1.0. Funcionalidades:

- Registrar contactos.
- Listar contactos.
- Consultar un contacto por ID.
- Eliminar contactos.
- Persistencia en PostgreSQL.

Campos: `id`, `nombre`, `apellido`, `telefono`, `correo`, `fecha_creacion`.

No incluye busqueda avanzada, categorias, notas, edicion ni reportes.

## contactflow-v2 - Agenda avanzada

Version 2.0. Funcionalidades:

- Registrar, listar, consultar, editar y eliminar contactos.
- Buscar contactos por nombre, apellido, telefono o correo.
- Filtrar contactos por categoria.
- Agregar notas a los contactos.
- Generar reportes basicos desde el backend.
- Persistencia en PostgreSQL.

Campos: `id`, `nombre`, `apellido`, `telefono`, `correo`, `categoria`, `notas`, `fecha_creacion`, `fecha_actualizacion`.

Categorias disponibles: Personal, Trabajo, Universidad, Familia, Otro.

## Tecnologias usadas

**Frontend:** React, Vite, JavaScript, CSS puro.

**Backend:** Node.js, Express, JavaScript, API REST.

**Base de datos:** PostgreSQL, con conexion mediante `pg`.

**Configuracion:** variables de entorno con `dotenv`.

**Validacion:** validaciones manuales en backend y frontend (sin librerias externas de validacion).

**CI/CD:** GitHub Actions para integracion continua; despliegue recomendado en Vercel (frontend), Render (backend) y Render/Neon/Supabase (base de datos).

## Estructura del repositorio

```
contactflow-devops/
├── .github/workflows/ci.yml
├── docs/
│   ├── gestion-cambios.md
│   ├── control-versiones.md
│   ├── construccion-sistema.md
│   ├── integracion-continua.md
│   ├── despliegue-continuo.md
│   ├── reutilizacion-variabilidad.md
│   └── guia-exposicion.md
├── contactflow-v1/
│   ├── backend/   (Express + PostgreSQL, agenda basica)
│   └── frontend/  (React + Vite, agenda basica)
├── contactflow-v2/
│   ├── backend/   (Express + PostgreSQL, agenda avanzada)
│   └── frontend/  (React + Vite, agenda avanzada)
├── README.md
└── .gitignore
```

## Endpoints - ContactFlow V1

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | /api/health | Estado del servicio |
| GET | /api/contacts | Lista todos los contactos |
| GET | /api/contacts/:id | Obtiene un contacto por ID |
| POST | /api/contacts | Crea un contacto |
| DELETE | /api/contacts/:id | Elimina un contacto |

## Endpoints - ContactFlow V2

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | /api/health | Estado del servicio |
| GET | /api/contacts | Lista contactos (acepta `search` y `category`) |
| GET | /api/contacts/:id | Obtiene un contacto por ID |
| POST | /api/contacts | Crea un contacto |
| PUT | /api/contacts/:id | Actualiza un contacto |
| DELETE | /api/contacts/:id | Elimina un contacto |
| GET | /api/reports/summary | Reporte de contactos por categoria |

## Preparar PostgreSQL

Crear dos bases de datos independientes:

```
createdb contactflow_v1
createdb contactflow_v2
```

Ejecutar los scripts de cada version:

```
psql -U usuario -d contactflow_v1 -f contactflow-v1/backend/database/schema.sql
psql -U usuario -d contactflow_v1 -f contactflow-v1/backend/database/seed.sql

psql -U usuario -d contactflow_v2 -f contactflow-v2/backend/database/schema.sql
psql -U usuario -d contactflow_v2 -f contactflow-v2/backend/database/seed.sql
```

## Ejecutar ContactFlow V1

```
cd contactflow-v1/backend
npm install
copy .env.example .env      (Windows)
cp .env.example .env        (Linux/macOS)
npm run dev
```

```
cd contactflow-v1/frontend
npm install
copy .env.example .env      (Windows)
cp .env.example .env        (Linux/macOS)
npm run dev
```

Backend V1: `http://localhost:4001` | Frontend V1: `http://localhost:5173`

## Ejecutar ContactFlow V2

```
cd contactflow-v2/backend
npm install
copy .env.example .env      (Windows)
cp .env.example .env        (Linux/macOS)
npm run dev
```

```
cd contactflow-v2/frontend
npm install
copy .env.example .env      (Windows)
cp .env.example .env        (Linux/macOS)
npm run dev
```

Backend V2: `http://localhost:4002` | Frontend V2: `http://localhost:5174`

## Integracion continua (CI)

El workflow `.github/workflows/ci.yml` se ejecuta en cada `push` o `pull_request` hacia `main` o `develop`, y valida/construye los 4 modulos del sistema (backend y frontend de V1 y V2). Ver detalle en `docs/integracion-continua.md`.

## Despliegue continuo (CD)

Despliegue recomendado: PostgreSQL en Render/Neon/Supabase, backends en Render, frontends en Vercel, cada version con sus propios servicios y variables de entorno. Ver detalle en `docs/despliegue-continuo.md`.

## Evidencias recomendadas para la exposicion

- Capturas del repositorio en GitHub mostrando `contactflow-v1` y `contactflow-v2` como carpetas separadas.
- Capturas de ambas aplicaciones corriendo simultaneamente en distintos puertos.
- Capturas de GitHub Actions ejecutando el workflow de CI en verde.
- Capturas de los servicios desplegados en Render y Vercel.
- Historial de commits y tags `v1.0.0` / `v2.0.0` en GitHub.

## Ramas sugeridas

`main`, `develop`, `feature/v1-backend`, `feature/v1-frontend`, `feature/v2-backend`, `feature/v2-frontend`, `feature/ci`, `feature/deployment`.

## Commits sugeridos

```
feat(v1-backend): crear estructura inicial de la API REST
feat(v1-frontend): implementar formulario y listado de contactos
feat(v2-backend): agregar busqueda, categorias y reportes
feat(v2-frontend): agregar edicion, filtros y panel de reportes
chore(ci): configurar workflow de integracion continua
docs: documentar gestion de cambios y despliegue continuo
```

## Tags sugeridos

`v1.0.0` para la version estable de ContactFlow V1, `v2.0.0` para la version estable de ContactFlow V2.

## Documentacion adicional

Ver la carpeta `docs/` para el detalle completo de gestion de cambios, control de versiones, construccion del sistema, integracion continua, despliegue continuo, reutilizacion/variabilidad y la guia de exposicion.

## Autores

Proyecto academico elaborado como Proyecto Final Integrador de la asignatura correspondiente. Completar con los nombres de los integrantes del equipo antes de la entrega final.
