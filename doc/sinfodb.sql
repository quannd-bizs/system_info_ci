-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2017 at 05:38 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sinfo_db`
--
CREATE DATABASE IF NOT EXISTS `sinfo_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `sinfo_db`;

-- --------------------------------------------------------

--
-- Table structure for table `server`
--

CREATE TABLE `server` (
  `id` int(11) NOT NULL,
  `server_id` varchar(20) CHARACTER SET ascii NOT NULL,
  `account_id` varchar(20) CHARACTER SET ascii NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `host` varchar(45) DEFAULT NULL,
  `reporting` bit(1) DEFAULT NULL,
  `last_reported_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `server`
--

INSERT INTO `server` (`id`, `server_id`, `account_id`, `name`, `host`, `reporting`, `last_reported_at`, `update_date`) VALUES
(1, '48282183', '1625133', 'BIPVNServer03TestPHPApplication', 'BIPVNServer03TestPHPApplication', b'1', '2017-05-29 09:44:00', '2017-05-29 16:44:48'),
(2, '50911940', '1625133', 'ip-172-31-13-149', 'ip-172-31-13-149', b'1', '2017-05-29 09:44:37', '2017-05-29 16:44:48');

-- --------------------------------------------------------

--
-- Table structure for table `server_info`
--

CREATE TABLE `server_info` (
  `id` int(11) NOT NULL,
  `server_id` varchar(20) CHARACTER SET ascii NOT NULL,
  `cpu` decimal(8,2) DEFAULT NULL,
  `cpu_stolen` decimal(8,2) DEFAULT NULL,
  `disk_io` decimal(8,2) DEFAULT NULL,
  `memory` decimal(8,2) DEFAULT NULL,
  `memory_used` bigint(20) DEFAULT NULL,
  `memory_total` bigint(20) DEFAULT NULL,
  `fullest_disk` decimal(8,2) DEFAULT NULL,
  `fullest_disk_free` bigint(20) DEFAULT NULL,
  `health_status` varchar(20) DEFAULT NULL,
  `last_reported_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='Server detail Information realtime';

--
-- Dumping data for table `server_info`
--

INSERT INTO `server_info` (`id`, `server_id`, `cpu`, `cpu_stolen`, `disk_io`, `memory`, `memory_used`, `memory_total`, `fullest_disk`, `fullest_disk_free`, `health_status`, `last_reported_at`) VALUES
(1, '48282183', '0.55', '0.00', '0.24', '4.94', 407896064, 8251244544, '66.00', 2761000000, 'unknown', '2017-05-29 10:05:00'),
(2, '50911940', '0.44', '0.00', '0.01', '57.90', 602931200, 1041235968, '39.10', 4944000000, 'unknown', '2017-05-29 10:05:37'),
(3, '48282183', '0.53', '0.00', '0.26', '4.94', 407896064, 8251244544, '66.00', 2761000000, 'unknown', '2017-05-29 10:32:59'),
(4, '50911940', '0.46', '0.00', '0.04', '57.90', 602931200, 1041235968, '39.10', 4944000000, 'unknown', '2017-05-29 10:33:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `server`
--
ALTER TABLE `server`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `server_info`
--
ALTER TABLE `server_info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `server`
--
ALTER TABLE `server`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `server_info`
--
ALTER TABLE `server_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
