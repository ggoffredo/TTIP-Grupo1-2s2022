-- noinspection SqlNoDataSourceInspectionForFile

INSERT INTO usuario (apellido, email, nombre, password) VALUES ('Ramirez', 'peperamirez@gmail.com', 'Pepe', 'UnaPassSuperCompleja');
INSERT INTO usuario (apellido, email, nombre, password) VALUES ('Gonzalez', 'carlosgonzalez@gmail.com', 'Carlos', 'OtraPassSuperCompleja');
INSERT INTO usuario (apellido, email, nombre, password) VALUES ('Martinez', 'robertomartinez@gmail.com', 'Roberto', 'EstaPassSiEsSuperCompleja');
INSERT INTO usuario (apellido, email, nombre, password) VALUES ('Gimenez', 'agustingimenez@gmail.com', 'Agustin', 'TeJuroQueEstaPassEsSuperCompleja');

INSERT INTO medio_de_pago (nombre) VALUES ('Efectivo'), ('Visa'),('Mastercard'), ('American Express');
-- Periodicidad SEMANAL, QUINCENAL, MENSUAL, BIMESTRAL, TRIMESTRAL, CUATRIMESTRAL, SEMESTRAL, ANUAL
--                 0         1         2         3          4             5            6        7
-- Duración n = 0 => CONSTANTE
-- Gastos fijos
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Alquiler', 30000, 0, 2, '2022-06-01', 1, 1), ('Expensas', 5000, 0, 2, '2022-06-01', 1, 1), ('Telecentro', 4000, 0, 2, '2022-07-01', 2, 1), ('Gimnasio', 4000, 0, 2, '2022-08-01', 2, 1);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Alquiler', 30000, 0, 2, '2022-09-01', 1, 2), ('Expensas', 5000, 0, 2, '2022-09-01', 1, 2), ('Cablevisión', 4000, 0, 2, '2022-09-01', 2, 2), ('Universidad', 15000, 0, 2, '2022-09-01', 2, 2);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Tuenti', 1000, 0, 2, '2022-09-01', 2, 3), ('Netflix', 1500, 0, 2, '2022-09-01', 4, 3);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Movistar', 3000, 0, 2, '2022-09-01', 1, 4), ('Spotify', 1000, 0, 2, '2022-09-01', 2, 4);

-- Gastos ocasionales
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Pava Electrica', 4000, 12, 2, '2022-07-01', 2, 1);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Supermercado', 8000, 1, 2, '2022-11-02', 2, 1);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Salida bar', 2000, 1, 2, '2022-11-03', 2, 1);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Futbol', 500, 1, 2, '2022-11-05', 2, 1), ('Asado', 2000, 1, 2, '2022-11-05', 2, 1), ('Boliche', 2000, 1, 2, '2022-11-05', 2, 1);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Futbol', 500, 1, 2, '2022-11-12', 2, 1);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Sushi', 7000, 1, 2, '2022-11-15', 2, 1);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Hamburguesas', 6000, 1, 2, '2022-11-18', 2, 1);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Futbol', 500, 1, 2, '2022-11-19', 2, 1);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Futbol', 500, 1, 2, '2022-11-26', 2, 1);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Carniceria', 10000, 1, 2, '2022-11-04', 2, 1);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Colchon', 15000, 12, 2, '2022-09-01', 1, 2), ('Campera', 20000, 3, 2, '2022-09-01', 2, 2);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Regalo', 13000, 1, 2, '2022-09-01', 3, 3), ('Sarten', 10000, 1, 2, '2022-09-01', 4, 3);
INSERT INTO gasto (descripcion, monto, duracion, periodicidad, fecha, medio_de_pago_id, usuario_id) VALUES ('Sushi', 5000, 1, 2, '2022-09-01', 1, 4), ('Afeitadora', 9000, 1, 2, '2022-09-01', 2, 4);

-- Ingresos fijos
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Sueldo', 100000, 0, 2, '2022-06-01', 1);
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Alquiler', 50000, 0, 2, '2022-06-01', 1);
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Sueldo', 50000, 0, 2, '2022-09-01', 2);
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Sueldo', 200000, 0, 2, '2022-09-01', 3);
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Sueldo', 180000, 0, 2, '2022-09-01', 4);

-- Ingresos ocasionales
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Freelo', 10000, 1, 2, '2022-06-01', 1);
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Otro freelo', 15000, 1, 2, '2022-07-01', 1);
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Diseño web', 5000, 1, 2, '2022-09-01', 2);
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Reparación PC', 10000, 1, 2, '2022-09-01', 3);
INSERT INTO ingreso (descripcion, monto, duracion, periodicidad, fecha, usuario_id) VALUES ('Campaña marketing', 100000, 1, 2, '2022-09-01', 4);

-- Plazos fijos disponibles
INSERT INTO pfijo (canal, codigo_entidad, denominacion, descripcion_entidad, fecha_informacion, mas_informacion, monto_minimo, nombre_completo, nombre_corto, plazo_minimo, tasa, territorio_de_validez) VALUES ('Home banking', 7,	'Pesos', 'Banco Galicia', '2022-08-12', '', 100,	'PLAZOFIJOTRADTASAREGULADA', 'PFTRADTASAREGULADA', '30 días', 70,	'Todo el territorio nacional');
INSERT INTO pfijo (canal, codigo_entidad, denominacion, descripcion_entidad, fecha_informacion, mas_informacion, monto_minimo, nombre_completo, nombre_corto, plazo_minimo, tasa, territorio_de_validez) VALUES ('Home banking', 11, 'Pesos', 'Banco Nación', '2022-08-12', '', 100, 'PLAZO FIJO TRADICIONAL', 'TRADICIONAL', '30 días', 65, 'Todo el territorio nacional');
INSERT INTO pfijo (canal, codigo_entidad, denominacion, descripcion_entidad, fecha_informacion, mas_informacion, monto_minimo, nombre_completo, nombre_corto, plazo_minimo, tasa, territorio_de_validez) VALUES ('Home banking', 14, 'Pesos', 'Banco Provincia', '2022-08-12', '', 100, 'PLAZO FIJO INTRANSFERIBLE EN PESOS', 'PLAZO FIJO INTRA.EN.PESOS', '30 días', 67, 'Todo el territorio nacional');