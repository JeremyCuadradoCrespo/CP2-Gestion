# Integracion Continua - ContactFlow DevOps

## Que hace GitHub Actions

El repositorio incluye un unico workflow, `.github/workflows/ci.yml`, llamado **"Integracion Continua"**. Este workflow se ejecuta automaticamente en GitHub Actions cada vez que hay un cambio relevante en el repositorio, sin intervencion manual.

## Eventos que disparan el workflow

- `push` a la rama `main`.
- `push` a la rama `develop`.
- `pull_request` con destino `main`.
- `pull_request` con destino `develop`.

## Jobs del workflow

El workflow define 4 jobs independientes, uno por cada modulo del sistema, todos ejecutados sobre `ubuntu-latest` con Node.js 20:

| Job | Modulo | Accion principal |
|-----|--------|--------------------|
| `validate-v1-backend` | contactflow-v1/backend | `npm install` + `npm run check` |
| `build-v1-frontend` | contactflow-v1/frontend | `npm install` + `npm run build` |
| `validate-v2-backend` | contactflow-v2/backend | `npm install` + `npm run check` |
| `build-v2-frontend` | contactflow-v2/frontend | `npm install` + `npm run build` |

## Que valida en el backend

El script `npm run check` ejecuta `node --check` sobre cada archivo fuente del backend (`server.js`, `app.js`, `config/db.js`, controllers, routes, services y validators). Esto detecta errores de sintaxis de JavaScript sin necesidad de levantar una base de datos real, lo que hace que la validacion sea rapida y no dependa de infraestructura externa.

## Que construye en el frontend

El script `npm run build` ejecuta Vite en modo produccion, transpilando y empaquetando el codigo React en la carpeta `dist/`. Si existe algun error de importacion, sintaxis o de referencias entre componentes, el build falla y el workflow reporta el error.

## Que ocurre cuando se hace push

1. El desarrollador hace `git push` hacia `develop` o `main` (o abre un pull request).
2. GitHub detecta el evento y dispara el workflow `Integracion Continua`.
3. Los 4 jobs se ejecutan en paralelo, cada uno en un runner limpio de Ubuntu.
4. Cada job hace checkout del repositorio, instala Node.js 20, instala las dependencias del modulo correspondiente y ejecuta la validacion o construccion.
5. Si todos los jobs terminan en verde, el pull request queda listo para fusionarse. Si alguno falla, GitHub marca el chequeo en rojo y bloquea la confianza en el cambio hasta que se corrija.

## Como demostrar la ejecucion automatica

1. Realizar un cambio pequeno en el codigo (por ejemplo, en `contactflow-v2/frontend`).
2. Hacer commit y `git push` hacia la rama `develop`.
3. Abrir la pestana **Actions** del repositorio en GitHub.
4. Mostrar el workflow `Integracion Continua` ejecutandose en tiempo real.
5. Mostrar los 4 jobs completandose correctamente (icono verde).
6. Abrir un pull request hacia `main` y mostrar como los checks de CI aparecen automaticamente antes del merge.
