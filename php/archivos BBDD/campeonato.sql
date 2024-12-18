-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-12-2024 a las 03:14:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `campeonato`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `circuitos`
--

CREATE TABLE `circuitos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `localizacion` varchar(255) NOT NULL,
  `longitud` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `pais_origen` varchar(255) NOT NULL,
  `presupuesto` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pilotos`
--

CREATE TABLE `pilotos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `equipo` varchar(255) NOT NULL,
  `nacionalidad` varchar(255) NOT NULL,
  `puntos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados`
--

CREATE TABLE `resultados` (
  `id` int(11) NOT NULL,
  `id_piloto` int(11) NOT NULL,
  `id_circuito` int(11) NOT NULL,
  `posicion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temporadas`
--

CREATE TABLE `temporadas` (
  `id` int(11) NOT NULL,
  `año` int(11) NOT NULL,
  `campeon_piloto` int(11) NOT NULL,
  `campeon_equipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `circuitos`
--
ALTER TABLE `circuitos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pilotos`
--
ALTER TABLE `pilotos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_piloto` (`id_piloto`),
  ADD KEY `id_circuito` (`id_circuito`);

--
-- Indices de la tabla `temporadas`
--
ALTER TABLE `temporadas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campeon_piloto` (`campeon_piloto`),
  ADD KEY `campeon_equipo` (`campeon_equipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `circuitos`
--
ALTER TABLE `circuitos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pilotos`
--
ALTER TABLE `pilotos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `resultados`
--
ALTER TABLE `resultados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `temporadas`
--
ALTER TABLE `temporadas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD CONSTRAINT `resultados_ibfk_1` FOREIGN KEY (`id_piloto`) REFERENCES `pilotos` (`id`),
  ADD CONSTRAINT `resultados_ibfk_2` FOREIGN KEY (`id_circuito`) REFERENCES `circuitos` (`id`);

--
-- Filtros para la tabla `temporadas`
--
ALTER TABLE `temporadas`
  ADD CONSTRAINT `temporadas_ibfk_1` FOREIGN KEY (`campeon_piloto`) REFERENCES `pilotos` (`id`),
  ADD CONSTRAINT `temporadas_ibfk_2` FOREIGN KEY (`campeon_equipo`) REFERENCES `equipos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
