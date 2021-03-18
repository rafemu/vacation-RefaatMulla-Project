CREATE SCHEMA `vacation-app` ;



CREATE TABLE `vacation-app`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NOT NULL,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `role` INT NOT NULL,
  PRIMARY KEY (`id`));



CREATE TABLE `vacation-app`.`vacation` (
  `id` INT NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `destination` VARCHAR(45) NOT NULL,
  `img` VARCHAR(45) NOT NULL,
  `startAt` DATETIME NOT NULL,
  `endAt` DATETIME NOT NULL,
  `price` INT NOT NULL,
  `role` ENUM('Admin', 'SuperUser') DEFAULT 'SuperUser', 

  PRIMARY KEY (`id`));


CREATE TABLE `vacation-app`.`followers` (
  `id` INT NOT NULL,
  `userId` INT NOT NULL,
  `vacationId` INT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `vacation-app`.`images` (
  `idimages` INT NOT NULL AUTO_INCREMENT,
  `imagePath` VARCHAR(250) NULL,
  `vacationId` VARCHAR(45) NULL,
  PRIMARY KEY (`idimages`));
