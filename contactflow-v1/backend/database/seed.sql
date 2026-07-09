-- Datos de prueba para ContactFlow V1

INSERT INTO contacts (nombre, apellido, telefono, correo) VALUES
  ('Ana', 'Torres', '0991234567', 'ana.torres@example.com'),
  ('Luis', 'Mendoza', '0987654321', 'luis.mendoza@example.com'),
  ('Maria', 'Perez', '0965432109', 'maria.perez@example.com'),
  ('Carlos', 'Rodriguez', '0978123456', 'carlos.rodriguez@example.com'),
  ('Sofia', 'Vera', '0991239876', 'sofia.vera@example.com')
ON CONFLICT (correo) DO NOTHING;
