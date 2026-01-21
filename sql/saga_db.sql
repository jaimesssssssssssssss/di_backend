-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 09-11-2025 a las 16:25:07
-- Versión del servidor: 8.0.43
-- Versión de PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `saga_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `id` int NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `duracion` double DEFAULT NULL,
  `fecha_estreno` date DEFAULT NULL,
  `recaudacion` double DEFAULT NULL,
  `saga_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`id`, `titulo`, `duracion`, `fecha_estreno`, `recaudacion`, `saga_id`) VALUES
(1, 'La Comunidad del Anillo', 178.5, '2001-12-19', 870000000, 1),
(2, 'Las Dos Torres', 179.2, '2002-12-18', 950000000, 1),
(3, 'El Retorno del Rey', 201, '2003-12-17', 1140000000, 1),
(4, 'Harry Potter y la Piedra Filosofal', 152, '2001-11-16', 974000000, 2),
(5, 'Harry Potter y la Cámara Secreta', 161, '2002-11-15', 879000000, 2),
(6, 'Star Wars: Una Nueva Esperanza', 121, '1977-05-25', 775000000, 3),
(7, 'Star Wars: El Imperio Contraataca', 124, '1980-05-21', 538000000, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sagas`
--

CREATE TABLE `sagas` (
  `id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `fecha_inicio` date DEFAULT NULL,
  `activa` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `sagas`
--

INSERT INTO `sagas` (`id`, `nombre`, `descripcion`, `fecha_inicio`, `activa`) VALUES
(1, 'El Señor de los Anillos', 'Saga de fantasía épica basada en las novelas de Tolkien.', '2001-12-19', 1),
(2, 'Harry Potter', 'Saga de magia y aventuras en Hogwarts.', '2001-11-16', 1),
(3, 'Star Wars', 'Saga de ciencia ficción y aventuras espaciales.', '1977-05-25', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `saga_id` (`saga_id`);

--
-- Indices de la tabla `sagas`
--
ALTER TABLE `sagas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `sagas`
--
ALTER TABLE `sagas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD CONSTRAINT `peliculas_ibfk_1` FOREIGN KEY (`saga_id`) REFERENCES `sagas` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
