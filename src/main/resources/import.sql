INSERT INTO usuario (apellido, email, nombre, password) VALUES ('Ramirez', 'peperamirez@gmail.com', 'Pepe', 'UnaPassSuperCompleja');
INSERT INTO usuario (apellido, email, nombre, password) VALUES ('Gonzalez', 'carlosgonzalez@gmail.com', 'Carlos', 'OtraPassSuperCompleja');
INSERT INTO usuario (apellido, email, nombre, password) VALUES ('Martinez', 'robertomartinez@gmail.com', 'Roberto', 'EstaPassSiEsSuperCompleja');
INSERT INTO usuario (apellido, email, nombre, password) VALUES ('Gimenez', 'agustingimenez@gmail.com', 'Agustin', 'TeJuroQueEstaPassEsSuperCompleja');

INSERT INTO medio_de_gasto (nombre, usuario_id) VALUES ('Efectivo', 1), ('Visa', 1),('Mastercard', 1);
INSERT INTO medio_de_gasto (nombre, usuario_id) VALUES ('Efectivo', 2),('Visa', 2),('American Express', 2);
INSERT INTO medio_de_gasto (nombre, usuario_id) VALUES ('Efectivo', 3),('Visa', 3);
INSERT INTO medio_de_gasto (nombre, usuario_id) VALUES ('Efectivo', 4),('Visa', 4),('Mastercard', 4);

INSERT INTO gasto_fijo (descripcion, monto, medio_de_gasto_id, usuario_id) VALUES ('Alquiler', 30000, 1, 1), ('Expensas', 5000, 1, 1), ('Telecentro', 4000, 2, 1), ('Gimnasio', 4000, 3, 1);
INSERT INTO gasto_fijo (descripcion, monto, medio_de_gasto_id, usuario_id) VALUES ('Alquiler', 30000, 4, 2), ('Expensas', 5000, 4, 2), ('Cablevision', 4000, 5, 2), ('Universidad', 15000, 6, 2);
INSERT INTO gasto_fijo (descripcion, monto, medio_de_gasto_id, usuario_id) VALUES ('Tuenti', 1000, 8, 3), ('Netflix', 1500, 8, 3);
INSERT INTO gasto_fijo (descripcion, monto, medio_de_gasto_id, usuario_id) VALUES ('Movistar', 3000, 10, 3), ('Spotify', 1000, 10, 3);

INSERT INTO gasto_ocasional (descripcion, monto, cantidad_de_cuotas, fecha_inicio_de_cobro, medio_de_gasto_id, usuario_id) VALUES ('Rappi', 2500, 1, '2022-09-01', 2, 1), ('Pava Electrica', 4000, 1, '2022-09-01', 2, 1);
INSERT INTO gasto_ocasional (descripcion, monto, cantidad_de_cuotas, fecha_inicio_de_cobro, medio_de_gasto_id, usuario_id) VALUES ('Colchon', 15000, 1, '2022-09-01', 5, 2), ('Campera', 20000, 1, '2022-09-01', 5, 2);
INSERT INTO gasto_ocasional (descripcion, monto, cantidad_de_cuotas, fecha_inicio_de_cobro, medio_de_gasto_id, usuario_id) VALUES ('Regalo', 13000, 1, '2022-09-01', 8, 3), ('Sarten', 10000, 1, '2022-09-01', 8, 3);
INSERT INTO gasto_ocasional (descripcion, monto, cantidad_de_cuotas, fecha_inicio_de_cobro, medio_de_gasto_id, usuario_id) VALUES ('Sushi', 5000, 1, '2022-09-01', 10, 4), ('Afeitadora', 9000, 1, '2022-09-01', 10, 4);

INSERT INTO ingreso_fijo (descripcion, monto, usuario_id) VALUES ('sueldo', 100000, 1);
INSERT INTO ingreso_fijo (descripcion, monto, usuario_id) VALUES ('alquiler', 50000, 1);
INSERT INTO ingreso_fijo (descripcion, monto, usuario_id) VALUES ('sueldo', 50000, 2);
INSERT INTO ingreso_fijo (descripcion, monto, usuario_id) VALUES ('sueldo', 200000, 3);
INSERT INTO ingreso_fijo (descripcion, monto, usuario_id) VALUES ('sueldo', 180000, 4);

INSERT INTO ingreso_ocasional (descripcion, monto, usuario_id, fecha_ingreso) VALUES ('Freelo', 10000, 1, '2022-09-01');
INSERT INTO ingreso_ocasional (descripcion, monto, usuario_id, fecha_ingreso) VALUES ('Otro freelo', 15000, 1, '2022-09-01');
INSERT INTO ingreso_ocasional (descripcion, monto, usuario_id, fecha_ingreso) VALUES ('Diseño web', 5000, 2, '2022-09-01');
INSERT INTO ingreso_ocasional (descripcion, monto, usuario_id, fecha_ingreso) VALUES ('Reparación PC', 10000, 3, '2022-09-01');
INSERT INTO ingreso_ocasional (descripcion, monto, usuario_id, fecha_ingreso) VALUES ('Campaña marketing', 100000, 4, '2022-09-01');
