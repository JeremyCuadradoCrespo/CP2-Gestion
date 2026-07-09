# Control de Versiones - ContactFlow DevOps

## Uso de Git y GitHub

El proyecto utiliza Git como sistema de control de versiones distribuido y GitHub como repositorio remoto central. Todo el codigo fuente de contactflow-v1, contactflow-v2, la documentacion y la configuracion de CI/CD se versionan dentro de un unico repositorio: `contactflow-devops`.

Git permite:

- Registrar el historial completo de cambios del sistema.
- Trabajar de forma paralela en distintas funcionalidades sin interferir con el codigo estable.
- Revertir cambios problematicos de forma segura.
- Vincular cada cambio de codigo con una solicitud de cambio formal (ver `gestion-cambios.md`).

GitHub aporta, ademas del alojamiento remoto:

- Pull requests para revisar cambios antes de integrarlos.
- GitHub Actions para ejecutar integracion continua automaticamente.
- Historial visual de commits, ramas y etiquetas (tags).

## Ramas sugeridas

| Rama | Proposito |
|------|-----------|
| `main` | Rama estable, lista para despliegue. Solo recibe merges validados. |
| `develop` | Rama de integracion de funcionalidades antes de pasar a `main`. |
| `feature/v1-backend` | Desarrollo del backend de ContactFlow V1. |
| `feature/v1-frontend` | Desarrollo del frontend de ContactFlow V1. |
| `feature/v2-backend` | Desarrollo del backend de ContactFlow V2. |
| `feature/v2-frontend` | Desarrollo del frontend de ContactFlow V2. |
| `feature/ci` | Configuracion del workflow de integracion continua. |
| `feature/deployment` | Preparacion de la configuracion de despliegue continuo. |

Flujo recomendado: `feature/*` -> `develop` -> `main`.

## Commits descriptivos

Se recomienda seguir un formato tipo Conventional Commits para mantener el historial legible:

```
feat(v1-backend): agregar endpoint de eliminacion de contactos
fix(v2-backend): corregir validacion de categoria en edicion
docs: agregar guia de despliegue continuo
chore(ci): configurar workflow de GitHub Actions
```

Ejemplos de commits reales sugeridos para este proyecto:

```
feat(v1-backend): crear estructura inicial de la API REST
feat(v1-frontend): implementar formulario y listado de contactos
feat(v1-database): agregar schema.sql y seed.sql
feat(v2-backend): agregar busqueda y filtro por categoria
feat(v2-backend): agregar endpoint de reportes
feat(v2-frontend): agregar panel de reportes y edicion de contactos
chore(ci): agregar workflow de integracion continua
docs: documentar gestion de cambios y control de versiones
```

## Tags (etiquetas de version)

| Tag | Descripcion |
|-----|-------------|
| `v1.0.0` | Version estable de ContactFlow V1 - Agenda basica |
| `v2.0.0` | Version estable de ContactFlow V2 - Agenda avanzada |

Los tags se crean sobre `main` una vez que la version correspondiente ha sido validada por el pipeline de CI:

```
git tag -a v1.0.0 -m "ContactFlow V1 - Agenda basica estable"
git push origin v1.0.0

git tag -a v2.0.0 -m "ContactFlow V2 - Agenda avanzada estable"
git push origin v2.0.0
```

## Comparacion entre versiones

| Aspecto | contactflow-v1 | contactflow-v2 |
|---------|------------------|-------------------|
| Tag | v1.0.0 | v2.0.0 |
| Alcance funcional | CRUD basico (sin edicion) | CRUD completo + busqueda + categorias + reportes |
| Complejidad de rutas | 1 recurso (contacts) | 2 recursos (contacts, reports) |
| Estado | Estable | Evolucion funcional de V1 |

## Historial de cambios

El historial detallado de que se cambio, por que y quien lo aprobo se encuentra documentado en `gestion-cambios.md`, y queda reflejado en el historial de commits de las ramas `feature/*` fusionadas hacia `develop` y `main`.
