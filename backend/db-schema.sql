-- Database schema for Online Bus Reservation backend
-- Tables generated from backend entity definitions.

CREATE DATABASE IF NOT EXISTS onlinebusbooking CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE onlinebusbooking;

CREATE TABLE IF NOT EXISTS `user` (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS bus (
  bus_id INT AUTO_INCREMENT PRIMARY KEY,
  bus_name VARCHAR(100) NOT NULL,
  bus_type VARCHAR(50) NOT NULL,
  total_seats INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS route (
  route_id VARCHAR(50) PRIMARY KEY,
  source VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  seats INT NOT NULL,
  price DOUBLE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS inventory (
  inventory_id VARCHAR(50) PRIMARY KEY,
  bus_id INT NOT NULL,
  available_seats INT NOT NULL,
  last_updated_date DATETIME NOT NULL,
  CONSTRAINT fk_inventory_bus FOREIGN KEY (bus_id) REFERENCES bus(bus_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS booking (
  booking_id VARCHAR(50) PRIMARY KEY,
  bus_id INT NOT NULL,
  date_of_booking DATETIME NOT NULL,
  source VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  no_of_seats INT NOT NULL,
  status VARCHAR(50) NOT NULL,
  CONSTRAINT fk_booking_bus FOREIGN KEY (bus_id) REFERENCES bus(bus_id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS passanger (
  pas_id VARCHAR(50) PRIMARY KEY,
  booking_id VARCHAR(50) NOT NULL,
  CONSTRAINT fk_passanger_booking FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS payment (
  pay_id VARCHAR(50) PRIMARY KEY,
  booking_id VARCHAR(50) NOT NULL,
  payment_date DATETIME NOT NULL,
  CONSTRAINT fk_payment_booking FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
