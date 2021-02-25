CREATE TABLE `projects_managment`.`projects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `projectName` VARCHAR(250) NOT NULL,
  `clientFullName` VARCHAR(45) NOT NULL,
  `clientPhone` VARCHAR(45) NULL,
  `location` VARCHAR(45) NULL,
  `quotation` INT NULL DEFAULT 0,
  `paid` INT NULL DEFAULT 0,
  `unPaid` INT NULL DEFAULT 0,
  `haregem` INT NULL DEFAULT 0,
  `agreement` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));


