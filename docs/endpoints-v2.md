# Endpoints de ContactFlow V2

## Estado del servicio

### GET /api/health

Verifica que el backend se encuentre activo.

## Contactos

### GET /api/contacts

Lista todos los contactos registrados.

Parámetros opcionales:

- search
- category

Ejemplo:

GET /api/contacts?search=ana&category=Trabajo

### GET /api/contacts/:id

Obtiene un contacto específico por su identificador.

### POST /api/contacts

Registra un nuevo contacto.

### PUT /api/contacts/:id

Actualiza un contacto existente.

### DELETE /api/contacts/:id

Elimina un contacto registrado.

## Reportes

### GET /api/reports/summary

Devuelve el resumen de contactos agrupados por categoría.