# ContactFlow V2 - Backend

API REST de la agenda de contactos avanzada, construida con Node.js, Express y PostgreSQL.

## Tecnologias

- Node.js + Express
- PostgreSQL (driver `pg`)
- dotenv para variables de entorno

## Estructura

```
src/
  config/db.js                       Conexion a PostgreSQL (Pool)
  controllers/contactController.js   Logica CRUD + busqueda/filtro
  controllers/reportController.js    Logica del reporte de resumen
  routes/contactRoutes.js            Rutas REST de contactos
  routes/reportRoutes.js             Rutas REST de reportes
  services/contactService.js         Acceso a datos de contactos
  services/reportService.js          Acceso a datos del reporte
  validators/contactValidator.js     Validaciones manuales (creacion y edicion)
  app.js                             Configuracion de Express
  server.js                          Arranque del servidor
database/
  schema.sql                         Creacion de la tabla contacts
  seed.sql                           Datos de prueba
```

## Configuracion

```
copy .env.example .env      (Windows)
cp .env.example .env        (Linux/macOS)
```

## Instalacion y ejecucion

```
npm install
npm run dev
```

El servidor inicia en `http://localhost:4002` (o el puerto definido en `PORT`).

## Base de datos

Ejecutar contra la base `contactflow_v2`:

```
psql -U usuario -d contactflow_v2 -f database/schema.sql
psql -U usuario -d contactflow_v2 -f database/seed.sql
```

`seed.sql` incluye 24 contactos de prueba con categorias y notas variadas, pensados para que el listado se vea completo en la interfaz.

**Importante:** no hay un sistema de migraciones automatico. Cada vez que `database/schema.sql` cambie en un `git pull`, hay que volver a correr `psql -f database/schema.sql` contra la base local antes de levantar el backend. Es seguro re-ejecutarlo: usa `CREATE TABLE IF NOT EXISTS` y `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`, asi que no borra datos existentes. Si se omite este paso, los endpoints que dependen de columnas nuevas (por ejemplo `favorito`, `eliminado`) fallan con un error de Postgres tipo `column "favorito" does not exist`.

## Endpoints

| Metodo | Ruta                        | Descripcion                                              |
|--------|------------------------------|-----------------------------------------------------------|
| GET    | /api/health                  | Estado del servicio                                       |
| GET    | /api/contacts                | Lista contactos (acepta `search`, `category`, `favorito`) |
| GET    | /api/contacts/trash          | Lista contactos en la papelera                            |
| GET    | /api/contacts/:id            | Obtiene un contacto                                       |
| POST   | /api/contacts                | Crea un contacto                                          |
| POST   | /api/contacts/import         | Importa contactos en bloque (`{ contactos: [...] }`)      |
| PUT    | /api/contacts/:id            | Actualiza un contacto                                     |
| PATCH  | /api/contacts/:id/favorito   | Marca/desmarca un contacto como favorito                  |
| DELETE | /api/contacts/:id            | Mueve un contacto a la papelera (borrado logico)          |
| POST   | /api/contacts/:id/restaurar  | Restaura un contacto desde la papelera                    |
| DELETE | /api/contacts/:id/permanente | Elimina definitivamente un contacto de la papelera         |
| GET    | /api/reports/summary         | Reporte por categoria                                     |

`GET /api/health` responde:

```json
{ "success": true, "data": { "status": "ok", "service": "ContactFlow V2 API" } }
```

## Categorias validas

Personal, Trabajo, Universidad, Familia, Otro

## Validacion de sintaxis

```
npm run check
```
