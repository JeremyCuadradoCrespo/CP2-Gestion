# Gestion de Cambios - ContactFlow DevOps

La gestion de la configuracion del software exige un control formal de cada cambio introducido en el sistema. A continuacion se documenta el historial de solicitudes de cambio (CH) que dieron origen a ContactFlow V1 y ContactFlow V2, siguiendo un formato tipico de control de cambios en proyectos de software.

## Registro de solicitudes de cambio

| Codigo | Cambio solicitado | Motivo | Responsable | Fecha de aprobacion | Version afectada | Estado |
|--------|---------------------|--------|---------------|------------------------|---------------------|---------|
| CH-001 | Crear backend V1 para registrar contactos | Se requiere una API REST que permita persistir contactos en PostgreSQL | Equipo Backend | 2026-03-10 | contactflow-v1 | Completado |
| CH-002 | Crear frontend V1 para consumir endpoints basicos | Se necesita una interfaz de usuario funcional para operar la agenda | Equipo Frontend | 2026-03-12 | contactflow-v1 | Completado |
| CH-003 | Crear base de datos PostgreSQL para V1 | El sistema debe persistir datos reales en una base relacional | Equipo Backend | 2026-03-13 | contactflow-v1 | Completado |
| CH-004 | Agregar eliminacion de contactos en V1 | La version inicial solo permitia crear y listar; se requiere eliminar registros | Equipo Backend | 2026-03-18 | contactflow-v1 | Completado |
| CH-005 | Crear variante avanzada V2 como proyecto separado | Se decidio demostrar variabilidad real mediante dos sistemas full stack independientes | Equipo Arquitectura | 2026-04-02 | contactflow-v2 | Completado |
| CH-006 | Agregar edicion de contactos en V2 | La agenda avanzada debe permitir modificar datos existentes | Equipo Backend | 2026-04-08 | contactflow-v2 | Completado |
| CH-007 | Agregar busqueda de contactos en V2 | Se requiere localizar contactos por nombre, apellido, telefono o correo | Equipo Backend | 2026-04-12 | contactflow-v2 | Completado |
| CH-008 | Agregar categorias y notas en V2 | Se necesita clasificar contactos y registrar informacion adicional | Equipo Backend / Frontend | 2026-04-15 | contactflow-v2 | Completado |
| CH-009 | Agregar reportes desde backend en V2 | Se requiere visibilidad estadistica de los contactos por categoria | Equipo Backend | 2026-04-20 | contactflow-v2 | Completado |
| CH-010 | Configurar integracion continua para frontend y backend | Se necesita validar automaticamente cada cambio subido al repositorio | Equipo DevOps | 2026-04-25 | contactflow-v1 y contactflow-v2 | Completado |
| CH-011 | Preparar despliegue continuo de frontend, backend y base de datos | El sistema debe quedar listo para desplegarse en servicios en la nube | Equipo DevOps | 2026-04-30 | contactflow-v1 y contactflow-v2 | Completado |

## Procedimiento de gestion del cambio

1. Toda modificacion relevante al sistema se registra primero como una solicitud de cambio (CH) con su justificacion.
2. El responsable evalua el impacto sobre la version afectada (V1, V2 o ambas).
3. Una vez aprobado, el cambio se implementa en una rama especifica (ver `control-versiones.md`).
4. El cambio se integra mediante pull request hacia `develop` y posteriormente hacia `main`.
5. El pipeline de integracion continua valida automaticamente el cambio antes de fusionarlo.
6. El estado del cambio se actualiza a "Completado" una vez verificado en el entorno correspondiente.

Este procedimiento garantiza trazabilidad: cada funcionalidad presente en el codigo puede vincularse a una solicitud de cambio formalmente aprobada.
