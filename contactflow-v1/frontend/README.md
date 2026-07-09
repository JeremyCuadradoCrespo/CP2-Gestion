# ContactFlow V1 - Frontend

Interfaz web de la agenda de contactos basica, construida con React + Vite.

## Tecnologias

- React 18
- Vite
- JavaScript (sin TypeScript)
- CSS puro con variables, Flexbox y diseno responsive mobile-first

## Estructura

```
src/
  api/contactApi.js          Llamadas HTTP al backend V1
  components/                ContactForm, ContactList, ContactCard
  utils/formValidator.js     Validaciones manuales del formulario
  App.jsx                    Composicion de la interfaz
  main.jsx                   Punto de entrada
  index.css                  Estilos globales
```

## Configuracion

```
copy .env.example .env      (Windows)
cp .env.example .env        (Linux/macOS)
```

`VITE_API_URL` debe apuntar al backend V1 (por defecto `http://localhost:4001/api`).

## Instalacion y ejecucion

```
npm install
npm run dev
```

La aplicacion inicia en `http://localhost:5173`.

## Funcionalidades

- Listar contactos obtenidos desde PostgreSQL via `GET /api/contacts`.
- Registrar contactos via `POST /api/contacts`.
- Eliminar contactos via `DELETE /api/contacts/:id`.
- Mensajes de exito y error visibles con `aria-live`.
- Manejo de estado de carga y de lista vacia.

## Build de produccion

```
npm run build
npm run preview
```
