-- noinspection SqlNoDataSourceInspectionForFile

INSERT INTO usuario (apellido, email, nombre, password) VALUES ('Ramirez', 'peperamirez@gmail.com', 'Pepe', 'UnaPassSuperCompleja');
INSERT INTO usuario (apellido, email, nombre, password) VALUES ('Gonzalez', 'carlosgonzalez@gmail.com', 'Carlos', 'OtraPassSuperCompleja');
INSERT INTO usuario (apellido, email, nombre, password) VALUES ('Martinez', 'robertomartinez@gmail.com', 'Roberto', 'EstaPassSiEsSuperCompleja');
INSERT INTO usuario (apellido, email, nombre, password) VALUES ('Gimenez', 'agustingimenez@gmail.com', 'Agustin', 'TeJuroQueEstaPassEsSuperCompleja');

INSERT INTO medio_de_pago (nombre) VALUES ('Efectivo'), ('Visa'),('Mastercard'), ('American Express');
-- Periodicidad SEMANAL, QUINCENAL, MENSUAL, BIMESTRAL, TRIMESTRAL, CUATRIMESTRAL, SEMESTRAL, ANUAL
--                 0         1         2         3          4             5            6        7
-- Gastos fijos
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Alquiler', 30000, 0, 2, '2022-09-01', 1, 1), ('Expensas', 5000, 0, 2, '2022-09-01', 1, 1), ('Telecentro', 4000, 0, 2, '2022-09-01', 2, 1), ('Gimnasio', 4000, 0, 2, '2022-09-01', 2, 1);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Alquiler', 30000, 0, 2, '2022-09-01', 1, 2), ('Expensas', 5000, 0, 2, '2022-09-01', 1, 2), ('Cablevision', 4000, 0, 2, '2022-09-01', 2, 2), ('Universidad', 15000, 0, 2, '2022-09-01', 2, 2);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Tuenti', 1000, 0, 2, '2022-09-01', 2, 3), ('Netflix', 1500, 0, 2, '2022-09-01', 4, 3);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Movistar', 3000, 0, 2, '2022-09-01', 1, 4), ('Spotify', 1000, 0, 2, '2022-09-01', 2, 4);

-- Gastos ocasionales (duracion 1, periodicidad 2 (mensual)) y en cuotas (duracion >= 1, periodicidad 3)
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Rappi', 2500, 1, 2, '2022-09-01', 1, 1), ('Pava Electrica', 4000, 12, 2, '2022-09-01', 2, 1);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Colchon', 15000, 12, 2, '2022-09-01', 1, 2), ('Campera', 20000, 3, 2, '2022-09-01', 2, 2);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Regalo', 13000, 1, 2, '2022-09-01', 3, 3), ('Sarten', 10000, 1, 2, '2022-09-01', 4, 3);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Sushi', 5000, 1, 2, '2022-09-01', 1, 4), ('Afeitadora', 9000, 1, 2, '2022-09-01', 2, 4);

-- Ingresos fijos
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Sueldo', 100000, 0, 2, '2022-09-01', 1);
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Alquiler', 50000, 0, 2, '2022-09-01', 1);
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Sueldo', 50000, 0, 2, '2022-09-01', 2);
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Sueldo', 200000, 0, 2, '2022-09-01', 3);
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Sueldo', 180000, 0, 2, '2022-09-01', 4);

-- Ingresos ocasionales
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Freelo', 10000, 1, 2, '2022-09-01', 1);
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Otro freelo', 15000, 1, 2, '2022-09-01', 1);
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Diseño web', 5000, 1, 2, '2022-09-01', 2);
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Reparación PC', 10000, 1, 2, '2022-09-01', 3);
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Campaña marketing', 100000, 1, 2, '2022-09-01', 4);
