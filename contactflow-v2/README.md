# ContactFlow V2 - Agenda avanzada

ContactFlow V2 es la version avanzada de la agenda de contactos del proyecto **ContactFlow DevOps**. Es una aplicacion full stack completa e independiente (frontend, backend y base de datos propios) cuyo diseño y organizacion visual estan inspirados en una aplicacion profesional de contactos (tipo Google Contacts), construida enteramente con componentes propios, sin logos, iconos ni recursos propietarios de terceros.

## Que es ContactFlow V2

Es una agenda de contactos con funcionalidades completas de gestion: creacion, edicion, eliminacion, busqueda, filtrado por categoria, notas y reportes basicos, todo respaldado por una API REST propia y una base de datos PostgreSQL real (sin LocalStorage como almacenamiento principal y sin datos quemados en el frontend).

## Funcionalidades

- Listar contactos obtenidos en tiempo real desde PostgreSQL.
- Crear contactos mediante un modal accesible (`role="dialog"`, `aria-modal`).
- Editar contactos existentes reutilizando el mismo modal/formulario.
- Eliminar contactos con confirmacion visual mediante mensajes de estado.
- Buscar contactos por nombre, apellido, telefono o correo (`search`).
- Filtrar contactos por categoria, tanto desde el sidebar como desde un selector en el area principal (`category`).
- Ver el detalle completo de un contacto en un panel lateral derecho (o modal en movil).
- Ver reportes basicos por categoria en tarjetas compactas en la parte superior del listado.
- Estados de carga (spinner) y estado vacio cuando no hay resultados.
- Mensajes de exito y error visibles con `aria-live`.
- Navegacion alfabetica lateral que desplaza la vista al primer contacto cuyo nombre inicia con la letra seleccionada.

## Diseño inspirado en una agenda profesional tipo Google Contacts

La interfaz reproduce la organizacion visual tipica de una agenda de contactos profesional, sin usar ningun logo, icono oficial ni recurso propietario:

- **Barra superior fija**: boton de menu tipo hamburguesa, marca "ContactFlow" (iniciales "CF" en un bloque de color, sin logos externos), buscador principal grande y redondeado, botones de ayuda/configuracion (representados con caracteres Unicode) y avatar circular del usuario con inicial.
- **Menu lateral izquierdo**: boton destacado "Crear contacto", vista "Contactos" con contador total, vistas estaticas "Frecuentes" y "Otros contactos", seccion "Administrar" (Importar, Papelera) y seccion "Etiquetas" con las categorias reales del sistema, resaltando la categoria activa con fondo azul claro.
- **Area principal**: titulo "Contactos" con contador, tarjetas de reporte, listado en formato tabla (Nombre, Correo, Telefono, Categoria, Acciones) con avatar circular de iniciales coloreado segun el contacto.
- **Barra alfabetica lateral**: letras A-Z junto a la tabla, funcional para saltar al primer contacto correspondiente.
- **Modal de creacion/edicion**: formulario controlado con validacion y errores visibles por campo.
- **Panel de detalle**: panel lateral derecho en escritorio (modal de pantalla completa en movil) con avatar grande, datos completos, notas, fechas y acciones (editar, eliminar, cerrar).

Todos los iconos se resuelven con caracteres Unicode o marcado propio; no se usan SVG ni imagenes de terceros.

## Endpoints

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | /api/health | Estado del servicio |
| GET | /api/contacts | Lista contactos (acepta `search` y `category`) |
| GET | /api/contacts/:id | Obtiene un contacto por ID |
| POST | /api/contacts | Crea un contacto |
| PUT | /api/contacts/:id | Actualiza un contacto |
| DELETE | /api/contacts/:id | Elimina un contacto |
| GET | /api/reports/summary | Reporte de contactos por categoria |

Formato de respuesta consistente en toda la API:

```
Exito:  { "success": true, "data": ... }
Error:  { "success": false, "message": "Mensaje claro del error" }
```

## Estructura

```
contactflow-v2/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/contactController.js
│   │   ├── controllers/reportController.js
│   │   ├── routes/contactRoutes.js
│   │   ├── routes/reportRoutes.js
│   │   ├── services/contactService.js
│   │   ├── services/reportService.js
│   │   ├── validators/contactValidator.js
│   │   ├── app.js
│   │   └── server.js
│   ├── database/schema.sql
│   ├── database/seed.sql
│   ├── .env.example
│   ├── package.json
│   └── README.md
└── frontend/
    ├── src/
    │   ├── api/contactApi.js
    │   ├── api/reportApi.js
    │   ├── components/
    │   │   ├── AppHeader.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── ContactForm.jsx
    │   │   ├── ContactModal.jsx
    │   │   ├── ContactTable.jsx
    │   │   ├── ContactRow.jsx
    │   │   ├── ContactDetailsPanel.jsx
    │   │   ├── SearchBar.jsx
    │   │   ├── CategoryFilter.jsx
    │   │   ├── ReportPanel.jsx
    │   │   ├── EmptyState.jsx
    │   │   ├── LoadingState.jsx
    │   │   └── StatusMessage.jsx
    │   ├── data/categories.js
    │   ├── utils/formValidator.js
    │   ├── utils/initials.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env.example
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Base de datos

Tabla `contacts` en PostgreSQL con los campos: `id`, `nombre`, `apellido`, `telefono`, `correo`, `categoria`, `notas`, `fecha_creacion`, `fecha_actualizacion`. Categorias validas: Personal, Trabajo, Universidad, Familia, Otro.

`database/seed.sql` incluye 24 contactos de prueba con nombres, telefonos, correos, categorias y notas realistas, para que la interfaz se vea completa durante la exposicion.

```
createdb contactflow_v2
psql -U usuario -d contactflow_v2 -f backend/database/schema.sql
psql -U usuario -d contactflow_v2 -f backend/database/seed.sql
```

## Variables de entorno

Backend (`backend/.env.example`):

```
PORT=4002
DATABASE_URL=postgresql://usuario:password@localhost:5432/contactflow_v2
FRONTEND_URL=http://localhost:5174
```

Frontend (`frontend/.env.example`):

```
VITE_API_URL=http://localhost:4002/api
```

## Ejecucion local

Backend:

```
cd contactflow-v2/backend
npm install
copy .env.example .env      (Windows)
cp .env.example .env        (Linux/macOS)
npm run dev
```

Frontend:

```
cd contactflow-v2/frontend
npm install
copy .env.example .env      (Windows)
cp .env.example .env        (Linux/macOS)
npm run dev
```

Backend disponible en `http://localhost:4002` (verificar con `GET http://localhost:4002/api/health`). Frontend disponible en `http://localhost:5174`.

## Buenas practicas aplicadas

- **Arquitectura frontend por capas**: `api/` (consumo REST), `components/` (presentacion), `utils/` y `data/` (logica auxiliar), `App.jsx` (orquestacion de estado).
- **Consumo real de API REST**: todas las operaciones (`getContacts`, `getContactById`, `createContact`, `updateContact`, `deleteContact`, `getSummaryReport`) usan `fetch` contra `VITE_API_URL`, sin datos quemados ni LocalStorage como almacenamiento principal.
- **CSS moderno**: variables CSS en `:root`, Flexbox en header/sidebar/formularios/tarjetas, sombras y radios consistentes.
- **Responsive design mobile-first**: `index.css` define estilos base para movil y los amplia con `@media (min-width: 768px)` y `@media (min-width: 1024px)`; la tabla se adapta a tarjetas apiladas en pantallas pequeñas y el sidebar se vuelve un panel colapsable.
- **Accesibilidad**: etiquetas semanticas (`header`, `aside`, `main`, `section`, `form`, `footer`), labels asociados a inputs, `aria-label` en botones de icono, `aria-live` en mensajes de estado, `role="dialog"` + `aria-modal` + `aria-labelledby` en el modal, `:focus-visible` visible en todos los elementos interactivos y soporte a `prefers-reduced-motion`.
- **Estados de carga y error**: `LoadingState`, `EmptyState` y `StatusMessage` cubren los distintos estados de la interfaz sin dejar la pantalla en blanco o sin retroalimentacion.
- **Componentizacion**: cada responsabilidad visual (header, sidebar, tabla, fila, modal, formulario, panel de detalle, reportes) vive en su propio componente reutilizable.

## Como probar la interfaz

1. Levantar el backend y confirmar `GET /api/health`.
2. Levantar el frontend en `http://localhost:5174`.
3. Verificar que el listado cargue los 24 contactos de prueba.
4. Buscar un contacto por nombre o correo en el buscador principal.
5. Filtrar por una categoria desde el sidebar o desde el selector del area principal.
6. Crear un contacto nuevo desde el boton "Crear contacto".
7. Editar y eliminar un contacto desde la tabla o desde el panel de detalle.
8. Seleccionar un contacto para ver su panel de detalle con notas y fechas.
9. Revisar las tarjetas de reporte en la parte superior del listado.
