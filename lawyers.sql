-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Ноя 23 2022 г., 20:00
-- Версия сервера: 10.4.25-MariaDB
-- Версия PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `lawyers`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cases`
--

CREATE TABLE `cases` (
  `id` int(11) NOT NULL,
  `idadvokat` int(11) NOT NULL,
  `idclient` int(11) NOT NULL,
  `idsudia` int(11) NOT NULL,
  `idstatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `cases`
--

INSERT INTO `cases` (`id`, `idadvokat`, `idclient`, `idsudia`, `idstatus`) VALUES
(4, 18, 17, 19, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `delostati`
--

CREATE TABLE `delostati` (
  `id` int(11) NOT NULL,
  `idstati` int(11) NOT NULL,
  `srok` int(11) NOT NULL,
  `gonarar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `types`
--

INSERT INTO `types` (`id`, `name`) VALUES
(1, 'Client'),
(2, 'Advokat'),
(3, 'Sudia');

-- --------------------------------------------------------

--
-- Структура таблицы `uk`
--

CREATE TABLE `uk` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `max` int(11) NOT NULL,
  `min` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `password`, `type`) VALUES
(17, 'Danabek', 'Serikkaliev', 'clockwedrayzer@gmail.com', '$2b$10$Jmsr2.CAFjs/DJGAbdEjcumLK2Q4gfZ54fXt3.UF1n9nXRHFoespu', 1),
(18, 'Asset', 'Serikkaliev', 'clockwedrayzer1@gmail.com', '$2b$10$hhmCBYov2rg1rDoMqjbHIucGG.hFls59t84fwo9bhZZk/RlvAI5nO', 2),
(19, 'Daulet', 'Serikkaliev', 'clockwedrayzer2@gmail.com', '$2b$10$YK0cComxexWLtovyyWViE.GNqQaToLo1AhR9ZYXt5K2JQM1H4hr6u', 3),
(20, 'Max', 'Serikkaliev', 'max@gmail.com', '$2b$10$hrkCYfCCj1WJtX9ZZNNxi.GtbwzSdIf0e2dxLFzKdAFHWwwkcbSEa', 1),
(21, 'Alex', 'Serikkaliev', 'alex@gmail.com', '$2b$10$Wi7glQhLOLBIYeV/z92veuLyjilGeYW517o/gahASKIVo9l5hzoYq', 2),
(22, 'Victor', 'Serikkaliev', 'Victor@gmail.com', '$2b$10$eYMKmiZAl5.IRq.qpdy0O.f6DFCEwPtGirbd1Jfyk47E/.At74Bly', 3);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idadvokat` (`idadvokat`),
  ADD KEY `idclient` (`idclient`,`idsudia`),
  ADD KEY `idsudia` (`idsudia`);

--
-- Индексы таблицы `delostati`
--
ALTER TABLE `delostati`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idstati` (`idstati`);

--
-- Индексы таблицы `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `uk`
--
ALTER TABLE `uk`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type` (`type`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cases`
--
ALTER TABLE `cases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `delostati`
--
ALTER TABLE `delostati`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `uk`
--
ALTER TABLE `uk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `cases`
--
ALTER TABLE `cases`
  ADD CONSTRAINT `cases_ibfk_1` FOREIGN KEY (`idadvokat`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cases_ibfk_2` FOREIGN KEY (`idclient`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cases_ibfk_3` FOREIGN KEY (`idsudia`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `delostati`
--
ALTER TABLE `delostati`
  ADD CONSTRAINT `delostati_ibfk_1` FOREIGN KEY (`idstati`) REFERENCES `uk` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `delostati_ibfk_2` FOREIGN KEY (`id`) REFERENCES `cases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`type`) REFERENCES `types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
