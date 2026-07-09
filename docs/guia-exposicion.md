# Guia de Exposicion - ContactFlow DevOps

Guion sugerido para la exposicion del Proyecto Final Integrador, distribuido en 5 roles. Cada estudiante puede adaptar el guion a su propio estilo, manteniendo el orden general de la demostracion.

## Distribucion de roles

### Estudiante 1 - Gestion del cambio

- Explicar que es la gestion de la configuracion de software y por que es relevante en un proyecto real.
- Presentar la tabla de solicitudes de cambio (`docs/gestion-cambios.md`).
- Explicar el ciclo de vida de un cambio: solicitud, aprobacion, implementacion, integracion, verificacion.
- Relacionar 2 o 3 codigos de cambio (CH-00X) con funcionalidades visibles del sistema.

### Estudiante 2 - Gestion de versiones

- Explicar el uso de Git y GitHub en el proyecto.
- Mostrar la estrategia de ramas (`main`, `develop`, `feature/*`).
- Explicar la convencion de commits descriptivos utilizada.
- Mostrar los tags `v1.0.0` y `v2.0.0` en GitHub y explicar su significado.

### Estudiante 3 - Integracion continua

- Explicar que es la integracion continua y por que se automatiza.
- Mostrar el archivo `.github/workflows/ci.yml`.
- Explicar los 4 jobs del workflow y que valida/construye cada uno.
- Mostrar una ejecucion real en la pestana Actions de GitHub.

### Estudiante 4 - Despliegue continuo

- Explicar la diferencia entre integracion continua y despliegue continuo.
- Presentar la arquitectura de despliegue: PostgreSQL (Render/Neon/Supabase), backend (Render), frontend (Vercel).
- Mostrar la configuracion de variables de entorno en cada servicio.
- Explicar como un push a `main` puede disparar un redeploy automatico.

### Estudiante 5 - Reutilizacion y variabilidad

- Explicar la diferencia entre reutilizacion de estructura y variabilidad real.
- Mostrar la tabla comparativa de `docs/reutilizacion-variabilidad.md`.
- Explicar por que V1 y V2 son dos productos separados y no una sola app con un interruptor.
- Cerrar la exposicion con las conclusiones del proyecto.

## Demostracion en vivo (guion paso a paso)

1. Mostrar el repositorio en GitHub (`contactflow-devops`).
2. Mostrar las carpetas `contactflow-v1` y `contactflow-v2` en la raiz del repositorio.
3. Mostrar dentro de cada version las carpetas `backend`, `frontend` y `database`.
4. Ejecutar el backend V1 (`npm run dev` en `contactflow-v1/backend`).
5. Ejecutar el frontend V1 (`npm run dev` en `contactflow-v1/frontend`).
6. Registrar un contacto nuevo y luego eliminarlo en V1, mostrando los mensajes de exito.
7. Ejecutar el backend V2 (`npm run dev` en `contactflow-v2/backend`).
8. Ejecutar el frontend V2 (`npm run dev` en `contactflow-v2/frontend`).
9. En V2: registrar un contacto, buscarlo por nombre, editarlo, filtrarlo por categoria y revisar el panel de reportes.
10. Mostrar la documentacion de gestion de cambios (`docs/gestion-cambios.md`).
11. Mostrar el historial de commits y los tags `v1.0.0` / `v2.0.0` en GitHub.
12. Hacer un cambio pequeno en el frontend V2 (por ejemplo, un texto de la interfaz).
13. Crear un commit descriptivo del cambio.
14. Hacer `git push` hacia `develop`.
15. Mostrar GitHub Actions ejecutando automaticamente las validaciones del workflow `Integracion Continua`.
16. Mostrar el resultado del despliegue continuo actualizado (backend en Render, frontend en Vercel).

## Recomendaciones finales

- Ensayar los tiempos de cada seccion para que la exposicion no exceda el tiempo asignado.
- Tener las dos aplicaciones (V1 y V2) corriendo antes de empezar, para evitar tiempos muertos.
- Tener a la mano la pestana de GitHub Actions abierta en el navegador antes de hacer el push en vivo.
- Si el despliegue en la nube no esta disponible al momento de la exposicion, mostrar capturas de pantalla del despliegue previamente realizado como evidencia.
