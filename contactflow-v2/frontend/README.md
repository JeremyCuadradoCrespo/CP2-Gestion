# ContactFlow V2 - Frontend

Interfaz web de la agenda de contactos avanzada, construida con React + Vite. El diseno esta inspirado en la organizacion visual de una agenda profesional tipo Google Contacts (barra superior con buscador, sidebar de navegacion, tabla de contactos, panel de detalle y modal de creacion/edicion), sin usar logos, iconos ni recursos propietarios de terceros.

## Tecnologias

- React 18
- Vite
- JavaScript (sin TypeScript)
- CSS puro con variables, Flexbox y diseno responsive mobile-first

## Estructura

```
src/
  api/contactApi.js          getContacts, getContactById, createContact, updateContact, deleteContact
  api/reportApi.js           getSummaryReport
  components/
    AppHeader.jsx             Barra superior: menu, marca, buscador, acciones, avatar
    Sidebar.jsx                Crear contacto, vistas, administrar, etiquetas/categorias
    ContactForm.jsx            Formulario controlado (modo create/edit)
    ContactModal.jsx           Modal accesible que envuelve ContactForm
    ContactTable.jsx           Tabla de contactos + barra alfabetica lateral
    ContactRow.jsx             Fila individual con avatar de iniciales
    ContactDetailsPanel.jsx    Panel lateral de detalle del contacto seleccionado
    SearchBar.jsx              Buscador reutilizable (usado en AppHeader)
    CategoryFilter.jsx         Selector de categoria
    ReportPanel.jsx            Tarjetas de metricas del reporte
    EmptyState.jsx             Estado vacio
    LoadingState.jsx           Estado de carga
    StatusMessage.jsx          Mensajes de exito/error con aria-live
  data/categories.js         Lista de categorias validas
  utils/formValidator.js     Validaciones manuales del formulario
  utils/initials.js          Iniciales y color de avatar por contacto
  App.jsx                    Composicion de la interfaz y manejo de estado global
  main.jsx                   Punto de entrada
  index.css                  Sistema de diseno (variables CSS, layout, responsive)
```

## Configuracion

```
copy .env.example .env      (Windows)
cp .env.example .env        (Linux/macOS)
```

`VITE_API_URL` debe apuntar al backend V2 (por defecto `http://localhost:4002/api`).

## Instalacion y ejecucion

```
npm install
npm run dev
```

La aplicacion inicia en `http://localhost:5174`.

## Funcionalidades

- Listar, crear, editar y eliminar contactos mediante modal accesible.
- Busqueda por nombre, apellido, telefono o correo (`search`), desde el buscador principal del header.
- Filtro por categoria (`category`), desde el sidebar o desde el selector del area principal.
- Panel de detalle lateral con datos completos, notas y fechas del contacto seleccionado.
- Barra alfabetica lateral que desplaza la vista al primer contacto de cada letra.
- Panel de reportes consumiendo `GET /api/reports/summary`.
- Mensajes de exito y error visibles con `aria-live`.
- Manejo de estados de carga y de listado vacio.

## Build de produccion

```
npm run build
npm run preview
```
