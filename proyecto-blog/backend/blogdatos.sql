DROP DATABASE IF EXISTS blog;
CREATE DATABASE blog;
USE blog;

DROP TABLE IF EXISTS blogs;
DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE blogs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    descripcion TEXT,
    imagen_url VARCHAR(255),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

INSERT INTO usuario (nombre, apellido, correo_electronico, contrasena)
VALUES ('Gonzalo', 'Diez', 'gonzalo@gmail.com', 'contraseña123');

INSERT INTO blogs (nombre, categoria, descripcion, imagen_url, usuario_id) 
VALUES ('JavaScript', 'Lenguajes', 'Javascript es uno de los lenguajes de programación más utilizados para el desarrollo de web, tanto en Front End (La vista de la página web que ve el usuario), como Back End (La lógica de la página web que el usuario no ve).', 'https://scoreapps.com/blog/wp-content/uploads/desarrollo-web.png', 1);