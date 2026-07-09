# ContactFlow V1 - Backend

API REST de la agenda de contactos basica, construida con Node.js, Express y PostgreSQL.

## Tecnologias

- Node.js + Express
- PostgreSQL (driver `pg`)
- dotenv para variables de entorno

## Estructura

```
src/
  config/db.js               Conexion a PostgreSQL (Pool)
  controllers/contactController.js   Logica de peticion/respuesta HTTP
  routes/contactRoutes.js    Definicion de rutas REST
  services/contactService.js Acceso a datos (SQL)
  validators/contactValidator.js Validaciones manuales
  app.js                     Configuracion de Express
  server.js                  Arranque del servidor
database/
  schema.sql                 Creacion de la tabla contacts
  seed.sql                   Datos de prueba
```

## Configuracion

1. Copiar variables de entorno:

```
copy .env.example .env      (Windows)
cp .env.example .env        (Linux/macOS)
```

2. Editar `.env` con los datos reales de conexion a PostgreSQL.

## Instalacion y ejecucion

```
npm install
npm run dev
```

El servidor inicia en `http://localhost:4001` (o el puerto definido en `PORT`).

## Base de datos

Ejecutar contra la base `contactflow_v1`:

```
psql -U usuario -d contactflow_v1 -f database/schema.sql
psql -U usuario -d contactflow_v1 -f database/seed.sql
```

## Endpoints

| Metodo | Ruta               | Descripcion              |
|--------|---------------------|---------------------------|
| GET    | /api/health          | Estado del servicio       |
| GET    | /api/contacts        | Lista todos los contactos |
| GET    | /api/contacts/:id    | Obtiene un contacto       |
| POST   | /api/contacts        | Crea un contacto          |
| DELETE | /api/contacts/:id    | Elimina un contacto       |

## Validacion de sintaxis

```
npm run check
```
