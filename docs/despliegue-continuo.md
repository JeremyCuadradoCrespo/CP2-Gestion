# Despliegue Continuo - ContactFlow DevOps

Este documento describe el despliegue recomendado para llevar ContactFlow V1 y ContactFlow V2 a un entorno productivo real, manteniendo cada version como un sistema independiente.

## 1. Base de datos PostgreSQL

Se recomienda usar Render, Neon o Supabase para crear las bases de datos gestionadas.

Pasos generales:

1. Crear una instancia de PostgreSQL para V1 (por ejemplo `contactflow_v1`).
2. Crear una instancia de PostgreSQL para V2 (por ejemplo `contactflow_v2`).
3. Ejecutar `schema.sql` y luego `seed.sql` de cada version contra su base correspondiente, usando el cliente `psql` o la consola SQL del proveedor.
4. Copiar la cadena de conexion (`DATABASE_URL`) generada por el proveedor; se usara como variable de entorno del backend correspondiente.

## 2. Backend (Render)

### Backend V1

- Crear un servicio web ("Web Service") en Render.
- **Root directory:** `contactflow-v1/backend`
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Variables de entorno:** `DATABASE_URL`, `FRONTEND_URL`, `PORT`

### Backend V2

- Crear un segundo servicio web en Render.
- **Root directory:** `contactflow-v2/backend`
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Variables de entorno:** `DATABASE_URL`, `FRONTEND_URL`, `PORT`

Cada backend se despliega como un servicio totalmente independiente, con su propia base de datos y su propia URL publica.

## 3. Frontend (Vercel)

### Frontend V1

- Crear un proyecto en Vercel apuntando al repositorio `contactflow-devops`.
- **Root directory:** `contactflow-v1/frontend`
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Variable de entorno:** `VITE_API_URL` apuntando a la URL publica del backend V1 desplegado en Render.

### Frontend V2

- Crear un segundo proyecto en Vercel.
- **Root directory:** `contactflow-v2/frontend`
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Variable de entorno:** `VITE_API_URL` apuntando a la URL publica del backend V2 desplegado en Render.

## 4. Actualizar CORS

Una vez desplegados los frontends, actualizar la variable `FRONTEND_URL` de cada backend en Render con la URL publica final del frontend correspondiente en Vercel, para que la configuracion de CORS permita las peticiones reales.

## 5. Relacion con la integracion continua

El pipeline de GitHub Actions (`ci.yml`) valida y construye cada modulo antes de que el codigo llegue a `main`. El despliegue continuo se apoya en ese mismo flujo: al fusionar cambios validados hacia `main`, Render y Vercel (configurados con despliegue automatico desde `main`) reconstruyen y publican automaticamente la nueva version de cada servicio.

## Resumen de servicios a desplegar

| Servicio | Proveedor sugerido | Root directory |
|----------|----------------------|-------------------|
| Base de datos V1 | Render / Neon / Supabase | contactflow-v1/backend/database |
| Base de datos V2 | Render / Neon / Supabase | contactflow-v2/backend/database |
| Backend V1 | Render | contactflow-v1/backend |
| Backend V2 | Render | contactflow-v2/backend |
| Frontend V1 | Vercel | contactflow-v1/frontend |
| Frontend V2 | Vercel | contactflow-v2/frontend |
