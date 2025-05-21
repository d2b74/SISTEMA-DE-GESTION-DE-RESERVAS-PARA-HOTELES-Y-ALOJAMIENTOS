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
    FOREIGN KEY (tipo) REFERENCES tipo_habitacion(id_tipo_habitacion)--SE SACO EL FOREIGN KEY DE SERVICIO    
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
    hora DATE,
    FOREIGN KEY (id_reserva) REFERENCES reserva(id_reserva)
);

CREATE TABLE checkout (
    id_checkout INT AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT,
    descripcion TEXT,
    usuario BOOLEAN,
    hora DATE,
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
    dato TEXT,--dato es la descripcion que se va a mostrar en el reporte
    documento TEXT,--es la url del pdf
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
    descripcion TEXT,
    precio DECIMAL(10,2),
    nombre VARCHAR(50)
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
