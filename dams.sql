-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 29, 2024 at 03:02 PM
-- Server version: 11.3.0-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dams`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
CREATE TABLE IF NOT EXISTS `appointments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `app_type` varchar(50) NOT NULL,
  `doctor` varchar(4) NOT NULL,
  `app_comment` text DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `app_time` varchar(20) NOT NULL,
  `app_date` date NOT NULL,
  `assigned_to` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `email` (`email`),
  KEY `assigned_to` (`assigned_to`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `email`, `app_type`, `doctor`, `app_comment`, `video_url`, `app_time`, `app_date`, `assigned_to`, `created_at`) VALUES
(2, 'arun@gmail.com', 'Dentist', '13', '', '', '8:00 AM', '2024-03-29', NULL, '2024-03-28 16:37:21');

-- --------------------------------------------------------

--
-- Table structure for table `app_login`
--

DROP TABLE IF EXISTS `app_login`;
CREATE TABLE IF NOT EXISTS `app_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `app_login`
--

INSERT INTO `app_login` (`id`, `username`, `password`, `created_at`) VALUES
(2, 'admin', '$2b$10$ql/TexO2fyMyDleN/knexulM.QojGPIm4kaep3ANL3CYK8W6v6nbO', '2024-03-08 13:44:57');

-- --------------------------------------------------------

--
-- Table structure for table `specialist_info`
--

DROP TABLE IF EXISTS `specialist_info`;
CREATE TABLE IF NOT EXISTS `specialist_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(50) NOT NULL,
  `specialty` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_2` (`email`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `specialist_info`
--

INSERT INTO `specialist_info` (`id`, `firstname`, `lastname`, `dob`, `gender`, `specialty`, `email`, `created_at`) VALUES
(13, 'Arun', 'Arun', '2024-03-28', 'm', 'Dentist', 'arun@arun.com', '2024-03-28 16:00:05');

-- --------------------------------------------------------

--
-- Table structure for table `specialist_login`
--

DROP TABLE IF EXISTS `specialist_login`;
CREATE TABLE IF NOT EXISTS `specialist_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `specialist_login`
--

INSERT INTO `specialist_login` (`id`, `email`, `password`, `created_at`) VALUES
(10, 'arun@arun.com', '$2b$10$q.xg5jyFlA/VtwjhS6n1Z.NOsIr5dW4n4G0Sqh.wdaxcCNMDXBsRG', '2024-03-28 16:00:05');

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
CREATE TABLE IF NOT EXISTS `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`id`, `firstname`, `lastname`, `phone`, `email`, `created_at`) VALUES
(6, 'Arun', 'Chary', '6163458979', 'arun@gmail.com', '2023-12-27 09:39:05'),
(7, 'Sai', 'Sai', '6168900098', 'sai@gmail.com', '2024-03-28 21:54:21');

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

DROP TABLE IF EXISTS `user_login`;
CREATE TABLE IF NOT EXISTS `user_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`id`, `email`, `password`, `status`, `created_at`) VALUES
(2, 'arun@gmail.com', '$2b$10$EvbSI5VAmJPT4j9Ewm9Ep.ai0cS/Jwvf4myTNhWla5M78/MTRFStW', 1, '2023-12-27 09:39:05'),
(3, 'sai@gmail.com', '$2b$10$bQdq3WgqgeMXNepl1vmbDubM4oXb5oPEP89br.vEq9frnSm9v1Az2', 1, '2024-03-28 21:54:21');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `specialist_login`
--
ALTER TABLE `specialist_login`
  ADD CONSTRAINT `specialist_login_ibfk_1` FOREIGN KEY (`email`) REFERENCES `specialist_info` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_login`
--
ALTER TABLE `user_login`
  ADD CONSTRAINT `user_login_ibfk_1` FOREIGN KEY (`email`) REFERENCES `user_info` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
