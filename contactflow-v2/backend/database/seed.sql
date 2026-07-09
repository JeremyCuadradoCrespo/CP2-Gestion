-- Datos de prueba para ContactFlow V2
-- Al menos 20 contactos realistas con categorias variadas y notas

INSERT INTO contacts (nombre, apellido, telefono, correo, categoria, notas) VALUES
  ('Ana', 'Torres', '0991234567', 'ana.torres@example.com', 'Trabajo', 'Contacto del area de sistemas.'),
  ('Luis', 'Mendoza', '0987654321', 'luis.mendoza@example.com', 'Universidad', 'Companero de la materia de Ingenieria de Software.'),
  ('Maria', 'Perez', '0965432109', 'maria.perez@example.com', 'Familia', 'Prima materna.'),
  ('Carlos', 'Rodriguez', '0978123456', 'carlos.rodriguez@example.com', 'Personal', 'Amigo de la infancia.'),
  ('Sofia', 'Vera', '0991239876', 'sofia.vera@example.com', 'Otro', NULL),
  ('Diego', 'Salazar', '0993456789', 'diego.salazar@example.com', 'Trabajo', 'Lider del equipo de DevOps.'),
  ('Paula', 'Jimenez', '0987112233', 'paula.jimenez@example.com', 'Universidad', 'Tutora del proyecto integrador.'),
  ('Andres', 'Chavez', '0976554433', 'andres.chavez@example.com', 'Familia', 'Tio paterno.'),
  ('Camila', 'Rios', '0992213344', 'camila.rios@example.com', 'Personal', NULL),
  ('Jorge', 'Paredes', '0965778899', 'jorge.paredes@example.com', 'Otro', 'Contacto de soporte tecnico.'),
  ('Valentina', 'Castro', '0994456677', 'valentina.castro@example.com', 'Trabajo', 'Analista de calidad (QA).'),
  ('Mateo', 'Suarez', '0981223344', 'mateo.suarez@example.com', 'Universidad', 'Companero del grupo de tesis.'),
  ('Isabella', 'Ortiz', '0967889900', 'isabella.ortiz@example.com', 'Familia', 'Hermana menor.'),
  ('Sebastian', 'Molina', '0979334455', 'sebastian.molina@example.com', 'Personal', 'Vecino del edificio.'),
  ('Daniela', 'Guerrero', '0993112200', 'daniela.guerrero@example.com', 'Otro', 'Contacto de la aseguradora.'),
  ('Fernando', 'Herrera', '0985667788', 'fernando.herrera@example.com', 'Trabajo', 'Gerente de proyecto.'),
  ('Gabriela', 'Ramos', '0966223311', 'gabriela.ramos@example.com', 'Universidad', 'Ayudante de catedra de Bases de Datos.'),
  ('Ricardo', 'Navarro', '0977445566', 'ricardo.navarro@example.com', 'Familia', 'Primo por parte de padre.'),
  ('Antonella', 'Cordova', '0994667711', 'antonella.cordova@example.com', 'Personal', 'Companera del gimnasio.'),
  ('Emilio', 'Vargas', '0968990011', 'emilio.vargas@example.com', 'Otro', NULL),
  ('Renata', 'Espinoza', '0982556677', 'renata.espinoza@example.com', 'Trabajo', 'Responsable de recursos humanos.'),
  ('Gabriel', 'Aguirre', '0995778822', 'gabriel.aguirre@example.com', 'Universidad', 'Companero de laboratorio de redes.'),
  ('Lucia', 'Delgado', '0969884455', 'lucia.delgado@example.com', 'Familia', 'Tia materna.'),
  ('Nicolas', 'Campos', '0983221199', 'nicolas.campos@example.com', 'Personal', 'Amigo de la universidad.')
ON CONFLICT (correo) DO NOTHING;
