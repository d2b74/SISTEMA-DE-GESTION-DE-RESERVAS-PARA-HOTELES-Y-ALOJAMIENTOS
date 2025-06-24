-- 0) Eliminar la base si existe y crearla de nuevo
DROP DATABASE IF EXISTS Sistema_Hotel;
CREATE DATABASE Sistema_Hotel;
USE Sistema_Hotel;

-- TABLAS
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    dni VARCHAR(20),
    mail VARCHAR(50),
    telefono VARCHAR(20),
    contrasena VARCHAR(100),
    tipo BOOLEAN
);

CREATE TABLE huesped (
    id_huesped INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE administrativo (
    id_administrativo INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE estado_habitacion (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT
);

CREATE TABLE tipo_habitacion (
    id_tipo_habitacion INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT
);

CREATE TABLE servicio (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT,
    precio DECIMAL(10,2)
);

CREATE TABLE habitacion (
    id_habitacion INT AUTO_INCREMENT PRIMARY KEY,
    numero INT,
    estado INT,
    tipo INT,
    precio DECIMAL(10,2),
    descripcion TEXT,
    FOREIGN KEY (estado) REFERENCES estado_habitacion(id_estado),
    FOREIGN KEY (tipo) REFERENCES tipo_habitacion(id_tipo_habitacion)
);

CREATE TABLE imagen_habitacion (
    id_imagen INT AUTO_INCREMENT PRIMARY KEY,
    id_habitacion INT,
    url TEXT NOT NULL,
    orden INT DEFAULT 0,
    FOREIGN KEY (id_habitacion) REFERENCES habitacion(id_habitacion) ON DELETE CASCADE
);

CREATE TABLE servicio_habitacion (
    id_habitacion INT,
    id_servicio INT,
    PRIMARY KEY (id_habitacion, id_servicio),
    FOREIGN KEY (id_habitacion) REFERENCES habitacion(id_habitacion),
    FOREIGN KEY (id_servicio) REFERENCES servicio(id_servicio)
);

CREATE TABLE estado_reserva (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT
);

CREATE TABLE reserva (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_huesped INT,
    fecha_inicio DATE,
    fecha_fin DATE,
    estado INT,
    FOREIGN KEY (id_huesped) REFERENCES huesped(id_huesped),
    FOREIGN KEY (estado) REFERENCES estado_reserva(id_estado)
);

CREATE TABLE habitacion_reserva (
    id_reserva INT,
    id_habitacion INT,
    PRIMARY KEY (id_reserva, id_habitacion),
    FOREIGN KEY (id_reserva) REFERENCES reserva(id_reserva),
    FOREIGN KEY (id_habitacion) REFERENCES habitacion(id_habitacion)
);

CREATE TABLE checkin (
    id_checkin INT AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT,
    descripcion TEXT,
    usuario BOOLEAN,
    fecha DATE,
    hora TIME,
    FOREIGN KEY (id_reserva) REFERENCES reserva(id_reserva)
);

CREATE TABLE checkout (
    id_checkout INT AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT,
    descripcion TEXT,
    usuario BOOLEAN,
    fecha DATE,
    hora TIME,
    FOREIGN KEY (id_reserva) REFERENCES reserva(id_reserva)
);

CREATE TABLE encuesta (
    id_encuesta INT AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT,
    id_huesped INT,
    fecha DATE,
    FOREIGN KEY (id_reserva) REFERENCES reserva(id_reserva),
    FOREIGN KEY (id_huesped) REFERENCES huesped(id_huesped)
);

CREATE TABLE pregunta (
    id_pregunta INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    descripcion TEXT
);

CREATE TABLE encuesta_pregunta (
    id_encuesta INT,
    id_pregunta INT,
    respuesta TEXT,
    PRIMARY KEY (id_encuesta, id_pregunta),
    FOREIGN KEY (id_encuesta) REFERENCES encuesta(id_encuesta),
    FOREIGN KEY (id_pregunta) REFERENCES pregunta(id_pregunta)
);

CREATE TABLE reporte (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    id_admin INT,
    fecha DATE,
    nombre VARCHAR(50),
    dato TEXT,
    documento TEXT,
    FOREIGN KEY (id_admin) REFERENCES administrativo(id_administrativo)
);

CREATE TABLE promocion (
    id_promocion INT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT,
    precio DECIMAL(10,2),
    nombre VARCHAR(50)
);

CREATE TABLE temporada (
    id_temporada INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT,
    precio DECIMAL(10,2),
    fecha_inicio DATE,
    fecha_fin DATE
);

CREATE TABLE tarifa (
    id_tarifa INT AUTO_INCREMENT PRIMARY KEY,
    precio DECIMAL(10,2),
    id_temporada INT,
    id_reserva INT,
    FOREIGN KEY (id_temporada) REFERENCES temporada(id_temporada),
    FOREIGN KEY (id_reserva) REFERENCES reserva(id_reserva)
);

CREATE TABLE tarifa_promocion (
    id_tarifa INT,
    id_promocion INT,
    precio DECIMAL(10,2),
    PRIMARY KEY (id_tarifa, id_promocion),
    FOREIGN KEY (id_tarifa) REFERENCES tarifa(id_tarifa),
    FOREIGN KEY (id_promocion) REFERENCES promocion(id_promocion)
);

-- DATOS SEMILLA

-- 1) Usuarios (10)
INSERT INTO usuario (nombre, apellido, dni, mail, telefono, contrasena, tipo) VALUES
('Ana',   'García',    '20123456',  'ana.garcia@mail.com',     '2611234567', 'passAna1', 0),
('Bruno', 'López',     '20234567',  'bruno.lopez@mail.com',    '2612345678', 'passBru2', 0),
('Celia', 'Martínez',  '20345678',  'celia.martinez@mail.com', '2613456789', 'passCel3', 0),
('Diego', 'Pérez',     '20456789',  'diego.perez@mail.com',    '2614567890', 'passDie4', 0),
('Elena', 'Rodríguez', '20567890',  'elena.rodriguez@mail.com','2615678901', 'passEle5', 0),
('Facundo','Sosa',     '20678901',  'facundo.sosa@mail.com',   '2616789012', 'passFac6', 0),
('Gonzalo','Herrera',  '20789012',  'gonzalo.herrera@mail.com','2617890123', 'passGon7', 1),
('Helena', 'Vega',     '20890123',  'helena.vega@mail.com',    '2618901234', 'passHel8', 1),
('Iván',  'Castro',    '20901234',  'ivan.castro@mail.com',    '2619012345', 'passIva9', 1),
('Jimena','Moreira',   '21012345',  'jimena.moreira@mail.com', '2610123456', 'passJim0', 1);

-- 2) Huéspedes
INSERT INTO huesped (id_usuario) VALUES (1),(2),(3),(4),(5),(6);

-- 3) Administrativos
INSERT INTO administrativo (id_usuario) VALUES (7),(8),(9),(10);

-- 4) Estados de habitación
INSERT INTO estado_habitacion (nombre, descripcion) VALUES
('Disponible',    'La habitación está libre y lista para reservar.'),
('Ocupada',       'La habitación está ocupada por un huésped.'),
('Mantenimiento', 'La habitación está fuera de servicio.');

-- 5) Tipos de habitación
INSERT INTO tipo_habitacion (nombre, descripcion) VALUES
('Individual','Cama individual, para 1 persona.'),
('Doble',     'Camas dobles, para 2 personas.'),
('Suite',     'Suite premium con sala de estar.');

-- 6) Servicios
INSERT INTO servicio (nombre, descripcion, precio) VALUES
('WiFi',     'Acceso a Internet inalámbrico.',  0.00),
('Desayuno', 'Buffet de desayuno incluido.',    500.00),
('Gimnasio', 'Acceso al gimnasio del hotel.',   300.00),
('Piscina',  'Uso de piscina climatizada.',     400.00),
('Spa',      'Acceso al spa y sauna.',          800.00);

-- 7) Habitaciones (7 registros)
INSERT INTO habitacion (numero, estado, tipo, precio, descripcion) VALUES
(101, 1, 1, 1500.00, 'Individual con vista al jardín.'),
(102, 1, 2, 2500.00, 'Doble con balcón.'),
(103, 2, 2, 2600.00, 'Doble interior, planta baja.'),
(104, 3, 3, 4500.00, 'Suite con jacuzzi.'),
(105, 1, 3, 4300.00, 'Suite ejecutiva.'),
(106, 2, 1, 1400.00, 'Individual, sin vista.'),
(107, 1, 2, 2550.00, 'Doble con vista al estacionamiento.');

-- 8) Imágenes de habitaciones
INSERT INTO imagen_habitacion (id_habitacion, url, orden) VALUES 
(1, '/images/habitaciones/habitacion1.jpeg', 1),
(1, '/images/habitaciones/habitacion2.jpeg', 2),
(2, '/images/habitaciones/habitacion3.jpeg', 1),
(2, '/images/habitaciones/habitacion4.jpeg', 2),
(3, '/images/habitaciones/habitacion5.jpeg', 1),
(3, '/images/habitaciones/habitacion6.jpeg', 2),
(4, '/images/habitaciones/habitacion7.jpeg', 1),
(4, '/images/habitaciones/habitacion8.jpeg', 2),
(5, '/images/habitaciones/habitacion9.jpeg', 1),
(5, '/images/habitaciones/habitacion10.jpeg', 2),
(7, '/images/habitaciones/habitacion11.jpeg', 1),
(7, '/images/habitaciones/habitacion12.jpeg', 2);

-- 9) Servicio por habitación
INSERT INTO servicio_habitacion (id_habitacion, id_servicio) VALUES
  (1,1),(1,2),
  (2,1),(2,2),(2,3),
  (4,1),(4,5),
  (5,2),(5,5),
  (7,1),(7,4);

-- 10) Estados de reserva
INSERT INTO estado_reserva (nombre, descripcion) VALUES
('Pendiente', 'Reserva creada, pendiente de confirmación.'),
('Confirmada','Reserva confirmada y pagada.'),
('Cancelada', 'Reserva cancelada.');

-- 11) Reservas (5 registros)
INSERT INTO reserva (id_huesped, fecha_inicio, fecha_fin, estado) VALUES
(1,'2025-06-10','2025-06-12',2),
(2,'2025-07-01','2025-07-05',1),
(3,'2025-08-15','2025-08-18',2),
(4,'2025-09-20','2025-09-22',1),
(5,'2025-10-05','2025-10-10',3);

-- 12) Habitaciones reservadas
INSERT INTO habitacion_reserva (id_reserva, id_habitacion) VALUES
  (1,1),(1,2),
  (2,3),
  (3,4),(3,5),
  (4,6),
  (5,7);

-- 13) Check-in / Check-out
INSERT INTO checkin  (id_reserva, descripcion, usuario, fecha, hora) VALUES
(1,'Llegada de huéspedes',7,'2025-06-10','14:00:00'),
(2,'Registro de llegada',8,'2025-07-01','15:30:00');
INSERT INTO checkout (id_reserva, descripcion, usuario, fecha, hora) VALUES
(1,'Salida del huésped',7,'2025-06-12','11:00:00'),
(2,'Checkout express',8,'2025-07-05','10:00:00');

-- 14) Preguntas y encuestas
INSERT INTO pregunta (titulo, descripcion) VALUES
('¿Cómo califica limpieza?','Limpieza general de la habitación.'),
('¿Cómo califica servicio?','Atención del personal.'),
('¿Repetiría su estancia?','¿Volvería a hospedarse con nosotros?');

INSERT INTO encuesta  (id_reserva, id_huesped, fecha) VALUES
(1,1,'2025-06-13'),
(3,3,'2025-08-19');

INSERT INTO encuesta_pregunta (id_encuesta, id_pregunta, respuesta) VALUES
(1,1,'Excelente'),
(1,2,'Muy buena'),
(1,3,'Sí'),
(2,1,'Buena'),
(2,3,'Tal vez');

-- 15) Reportes
INSERT INTO reporte (id_admin, fecha, nombre, dato, documento) VALUES
(1,'2025-06-15','Reporte Mensual','Ocupación hotel: 75%','/docs/reportes/junio.pdf'),
(2,'2025-07-01','Informe Julio','Ocupación hotel: 82%','/docs/reportes/julio.pdf');

-- 16) Promociones y temporadas
INSERT INTO promocion (descripcion, precio, nombre) VALUES
('10% descuento por reserva anticipada',0.90,'Anticipada'),
('2x1 en días de semana',           0.50,'Entresemana');

INSERT INTO temporada (descripcion, precio, nombre) VALUES
('Temporada alta (verano)',   1.20,'Alta'),
('Temporada baja (invierno)', 0.80,'Baja');

-- 17) Tarifas y promociones sobre tarifas
INSERT INTO tarifa (precio, id_temporada, id_reserva) VALUES
(2000.00,1,1),
(1800.00,2,2),
(4700.00,1,3);

INSERT INTO tarifa_promocion (id_tarifa, id_promocion, precio) VALUES
(1,1,1800.00),
(3,2,2350.00);
