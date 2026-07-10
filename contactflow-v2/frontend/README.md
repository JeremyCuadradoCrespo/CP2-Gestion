# ContactFlow V2 - Frontend

Interfaz web de la agenda de contactos avanzada, construida con React + Vite. La V2 incluye una landing page profesional para presentar el sistema antes de ingresar a la agenda, y conserva la experiencia de gestion de contactos con barra superior, buscador, sidebar de navegacion, tabla, panel de detalle y modal de creacion/edicion.

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
    landing/                  Landing academica de ContactFlow V2
      LandingPage.jsx          Vista principal de presentacion
      LandingHeader.jsx        Header con navegacion interna y acceso a la agenda
      HeroSection.jsx          Hero con propuesta de valor y CTA
      ProblemSolutionSection.jsx Problema, solucion y enfoque academico
      FeatureSection.jsx       Tarjetas de funcionalidades
      ArchitectureSection.jsx  Flujo frontend, API, PostgreSQL, CI/CD y despliegue
      DevOpsSection.jsx        Practicas DevOps aplicadas
      LandingMetrics.jsx       Indicadores visuales del sistema
      LandingCTA.jsx           Llamada final para entrar a la agenda
      LandingFooter.jsx        Cierre informativo y tecnologias
    contacts/
      ContactsApp.jsx          Aplicacion original de contactos encapsulada
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
  App.jsx                    Controlador de vistas: landing o agenda
  main.jsx                   Punto de entrada
  index.css                  Sistema de diseno (variables CSS, layout, responsive)
```

## Landing page V2

La aplicacion inicia en la vista `landing`. Desde esa pantalla se puede revisar:

- Que es ContactFlow V2 y que problema resuelve.
- Funcionalidades de la agenda de contactos.
- Arquitectura full stack: React + Vite, Express, PostgreSQL, REST, GitHub Actions y despliegue continuo.
- Practicas DevOps: gestion de cambios, control de versiones, integracion continua, despliegue continuo, reutilizacion de componentes y variabilidad entre V1 y V2.
- Metricas visuales para apoyar la presentacion academica.

El boton `Ingresar a la agenda` cambia la vista a `contacts` usando estado interno en `App.jsx`, sin React Router y sin dependencias nuevas. Dentro de la agenda existe el boton `Volver a presentacion` para regresar a la landing sin perder la separacion entre la presentacion y la funcionalidad original.

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

- Landing profesional de presentacion para ContactFlow V2.
- Navegacion simple entre landing y agenda mediante estado interno.
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

## Demostracion sugerida

1. Ejecutar `npm run dev`.
2. Abrir la URL local de Vite y mostrar la landing inicial.
3. Recorrer las secciones de funcionalidades, arquitectura, DevOps y metricas.
4. Presionar `Ingresar a la agenda` para demostrar que la aplicacion de contactos sigue operativa.
5. Usar `Volver a presentacion` para evidenciar la navegacion entre ambas vistas.
