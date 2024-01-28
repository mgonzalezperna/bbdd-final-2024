SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema BBDD
-- -----------------------------------------------------
-- DROP SCHEMA IF EXISTS `BBDD` ;

-- -----------------------------------------------------
-- Schema BBDD
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `BBDD` DEFAULT CHARACTER SET utf8 ;
USE `BBDD` ;

-- -----------------------------------------------------
-- Table `BBDD`.`Transaction`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BBDD`.`Transaction` ;

CREATE TABLE IF NOT EXISTS `BBDD`.`Transaction` (
  `idTransaction` INT NOT NULL AUTO_INCREMENT,
  `start_datetime` DATE NOT NULL,
  `duration_secs` INT NOT NULL,
  `idLog` INT NULL,
  PRIMARY KEY (`idTransaction`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BBDD`.`V2G`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BBDD`.`V2G` ;

CREATE TABLE IF NOT EXISTS `BBDD`.`V2G` (
  `idTransaction` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idTransaction`),
  CONSTRAINT `fk_V2G_Transaction`
    FOREIGN KEY (`idTransaction`)
    REFERENCES `BBDD`.`Transaction` (`idTransaction`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BBDD`.`Single`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BBDD`.`Single` ;

CREATE TABLE IF NOT EXISTS `BBDD`.`Single` (
  `idTransaction` INT NOT NULL,
  PRIMARY KEY (`idTransaction`),
  CONSTRAINT `fk_Single_Transaction1`
    FOREIGN KEY (`idTransaction`)
    REFERENCES `BBDD`.`Transaction` (`idTransaction`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BBDD`.`Payment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BBDD`.`Payment` ;

CREATE TABLE IF NOT EXISTS `BBDD`.`Payment` (
  `idPayment` INT NOT NULL AUTO_INCREMENT,
  `datetime` DATETIME NULL,
  `paymentMethod` VARCHAR(45) NULL,
  `powerTransferedKW` INT NULL,
  `idTransaction` INT NOT NULL,
  PRIMARY KEY (`idPayment`),
  INDEX `fk_Payment_Single1_idx` (`idTransaction` ASC),
  CONSTRAINT `fk_Payment_Single1`
    FOREIGN KEY (`idTransaction`)
    REFERENCES `BBDD`.`Single` (`idTransaction`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BBDD`.`EV_Owner`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BBDD`.`EV_Owner` ;

CREATE TABLE IF NOT EXISTS `BBDD`.`EV_Owner` (
  `idEV_Owner` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `energy_provider_customer_id` VARCHAR(45) NULL,
  PRIMARY KEY (`idEV_Owner`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BBDD`.`Invoice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BBDD`.`Invoice` ;

CREATE TABLE IF NOT EXISTS `BBDD`.`Invoice` (
  `idInvoice` INT NOT NULL AUTO_INCREMENT,
  `powerTransferedKW` INT NULL,
  `paymentMethod` VARCHAR(45) NULL,
  `idTransaction` INT NULL,
  `idEV_Owner` INT NOT NULL,
  PRIMARY KEY (`idInvoice`),
  INDEX `fk_Invoice_V2G1_idx` (`idTransaction` ASC),
  INDEX `fk_Invoice_EV_Owner1_idx` (`idEV_Owner` ASC),
  CONSTRAINT `fk_Invoice_V2G1`
    FOREIGN KEY (`idTransaction`)
    REFERENCES `BBDD`.`V2G` (`idTransaction`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Invoice_EV_Owner1`
    FOREIGN KEY (`idEV_Owner`)
    REFERENCES `BBDD`.`EV_Owner` (`idEV_Owner`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BBDD`.`Survey`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BBDD`.`Survey` ;

CREATE TABLE IF NOT EXISTS `BBDD`.`Survey` (
  `idSurvey` INT NOT NULL AUTO_INCREMENT,
  `experience_score` INT(10) NULL,
  `comments` VARCHAR(255) NULL,
  `idInvoice` INT NULL,
  PRIMARY KEY (`idSurvey`),
  INDEX `fk_Survey_Invoice1_idx` (`idInvoice` ASC),
  CONSTRAINT `fk_Survey_Invoice1`
    FOREIGN KEY (`idInvoice`)
    REFERENCES `BBDD`.`Invoice` (`idInvoice`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BBDD`.`EVSE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BBDD`.`EVSE` ;

CREATE TABLE IF NOT EXISTS `BBDD`.`EVSE` (
  `idEVSE` INT NOT NULL AUTO_INCREMENT,
  `location` VARCHAR(45) NULL,
  `brand` VARCHAR(45) NULL COMMENT '		',
  `model` VARCHAR(45) NULL COMMENT '		',
  `visible` BOOLEAN DEFAULT True,
  PRIMARY KEY (`idEVSE`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BBDD`.`Log`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BBDD`.`Log` ;

CREATE TABLE IF NOT EXISTS `BBDD`.`Log` (
  `idLog` INT NOT NULL AUTO_INCREMENT,
  `idTransaction` INT NULL,
  PRIMARY KEY (`idLog`),
  INDEX `fk_Log_Transaction1_idx` (`idTransaction` ASC),
  CONSTRAINT `fk_Log_Transaction1`
    FOREIGN KEY (`idTransaction`)
    REFERENCES `BBDD`.`Transaction` (`idTransaction`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BBDD`.`Log_entry`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BBDD`.`Log_entry` ;

CREATE TABLE IF NOT EXISTS `BBDD`.`Log_entry` (
  `idLog_entry` INT NOT NULL AUTO_INCREMENT,
  `trace_message` VARCHAR(255) NULL,
  `idLog` INT NULL,
  `idLog_entry_previous` INT NULL,
  PRIMARY KEY (`idLog_entry`),
  INDEX `fk_Log_entry_Log1_idx` (`idLog` ASC),
  INDEX `fk_Log_entry_Log_entry1_idx` (`idLog_entry_previous` ASC),
  CONSTRAINT `fk_Log_entry_Log1`
    FOREIGN KEY (`idLog`)
    REFERENCES `BBDD`.`Log` (`idLog`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Log_entry_Log_entry1`
    FOREIGN KEY (`idLog_entry_previous`)
    REFERENCES `BBDD`.`Log_entry` (`idLog_entry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `BBDD`.`belongs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BBDD`.`belongs` ;

CREATE TABLE IF NOT EXISTS `BBDD`.`belongs` (
  `idTransaction` INT NOT NULL,
  `idEVSE` INT NOT NULL,
  PRIMARY KEY (`idTransaction`, `idEVSE`),
  INDEX `fk_Transaction_has_EVSE_EVSE1_idx` (`idEVSE` ASC),
  INDEX `fk_Transaction_has_EVSE_Transaction1_idx` (`idTransaction` ASC),
  CONSTRAINT `fk_Transaction_has_EVSE_Transaction1`
    FOREIGN KEY (`idTransaction`)
    REFERENCES `BBDD`.`Transaction` (`idTransaction`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Transaction_has_EVSE_EVSE1`
    FOREIGN KEY (`idEVSE`)
    REFERENCES `BBDD`.`EVSE` (`idEVSE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;