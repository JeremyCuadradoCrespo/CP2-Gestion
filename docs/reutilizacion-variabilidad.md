# Reutilizacion y Variabilidad - ContactFlow DevOps

## Reutilizacion de software

Aunque contactflow-v1 y contactflow-v2 son dos proyectos full stack completamente separados (cada uno con su propio `package.json`, su propio `src`, su propia base de datos y su propia configuracion), ambos comparten un mismo enfoque arquitectonico que se reutiliza de forma consciente:

- **Reutilizacion de estructura de frontend:** ambos frontends siguen la misma organizacion de carpetas (`api/`, `components/`, `utils/`, `App.jsx`, `main.jsx`, `index.css`), lo que reduce la curva de aprendizaje al pasar de una version a otra.
- **Reutilizacion de estructura de backend:** ambos backends siguen el mismo patron por capas (`config/`, `controllers/`, `routes/`, `services/`, `validators/`), manteniendo una separacion de responsabilidades identica.
- **Reutilizacion de validadores:** la logica de validacion manual (formato de correo, formato de telefono, campos obligatorios) sigue el mismo criterio en V1 y V2; en V2 simplemente se extiende para incluir categoria y notas.
- **Reutilizacion del patron controller-service-route:** cada endpoint sigue siempre el mismo flujo: la ruta delega en el controlador, el controlador valida y delega en el servicio, y el servicio ejecuta la consulta SQL contra PostgreSQL. Este patron se repite identico en `contacts` (V1 y V2) y se reutiliza tambien para `reports` (V2).
- **Reutilizacion de componentes visuales:** `ContactForm`, `ContactList` y `ContactCard` existen en ambas versiones con la misma responsabilidad conceptual; en V2 se extienden (categoria, notas, edicion) y se agregan nuevos componentes (`SearchBar`, `CategoryFilter`, `ReportPanel`) sin romper el patron original.
- **Reutilizacion del sistema de diseno:** ambas interfaces comparten el mismo conjunto de variables CSS (`:root`), la misma paleta de colores, el mismo esquema de animaciones y las mismas practicas de accesibilidad.

## Variabilidad real

La variabilidad de este proyecto no se resuelve con una bandera de configuracion ni con una tabla que diga "Version 1" / "Version 2" dentro de una unica aplicacion. La variabilidad es **real y demostrable** porque:

- Existen **dos aplicaciones full stack independientes**, cada una con su propio backend Node.js/Express y su propio frontend React/Vite.
- Cada version tiene su **propia base de datos PostgreSQL**, con un esquema distinto (V2 agrega `categoria` y `notas`, ademas de `fecha_actualizacion`).
- Cada version expone **su propio conjunto de endpoints REST**: V1 con 5 endpoints basicos, V2 con 7 endpoints que incluyen busqueda, filtrado, edicion y reportes.
- Cada version puede **ejecutarse y desplegarse de manera totalmente independiente**, en puertos distintos (4001/5173 para V1, 4002/5174 para V2) y, en produccion, en servicios separados de Render y Vercel.
- Un usuario puede tener ambas versiones corriendo **simultaneamente** y comprobar, en vivo, que se trata de dos sistemas distintos con capacidades distintas.

## Diferencias entre V1 y V2

| Caracteristica | contactflow-v1 | contactflow-v2 |
|-----------------|-------------------|--------------------|
| Backend propio | Si (Express, puerto 4001) | Si (Express, puerto 4002) |
| Frontend propio | Si (Vite, puerto 5173) | Si (Vite, puerto 5174) |
| Base de datos propia | Si (contactflow_v1) | Si (contactflow_v2) |
| Endpoints propios | 5 endpoints (health, listar, obtener, crear, eliminar) | 7 endpoints (health, listar con filtros, obtener, crear, editar, eliminar, reporte) |
| Edicion de contactos | No | Si |
| Busqueda | No | Si (por nombre, apellido, telefono, correo) |
| Categorias | No | Si (Personal, Trabajo, Universidad, Familia, Otro) |
| Notas | No | Si |
| Reportes | No | Si (resumen por categoria) |
| Funcionalidades distintas | Agenda basica (CRUD sin edicion) | Agenda avanzada (CRUD completo + busqueda + reportes) |
| Despliegue independiente | Si (servicio propio en Render/Vercel) | Si (servicio propio en Render/Vercel) |

Esta tabla evidencia que V2 no reemplaza a V1: ambas conviven como productos separados, lo que constituye el caso de estudio de variabilidad real exigido por el proyecto.
