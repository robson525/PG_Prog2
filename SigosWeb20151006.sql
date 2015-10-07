CREATE DATABASE  IF NOT EXISTS `SigosWeb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `SigosWeb`;
-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: localhost    Database: SigosWeb
-- ------------------------------------------------------
-- Server version	5.6.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ESTUDANTE`
--

DROP TABLE IF EXISTS `ESTUDANTE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ESTUDANTE` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `MATRICULA` varchar(20) NOT NULL,
  `USUARIO` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `FK_ESTUDANTE_USUARIO_idx` (`USUARIO`),
  CONSTRAINT `FK_ESTUDANTE_USUARIO` FOREIGN KEY (`USUARIO`) REFERENCES `USUARIO` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ESTUDANTE`
--

LOCK TABLES `ESTUDANTE` WRITE;
/*!40000 ALTER TABLE `ESTUDANTE` DISABLE KEYS */;
INSERT INTO `ESTUDANTE` VALUES (1,'08080008701',1),(2,'08080008701',2),(3,'881881881',3),(4,'0800800802',8),(5,'008800121',10),(6,'11111111111',18);
/*!40000 ALTER TABLE `ESTUDANTE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FUNCIONARIO`
--

DROP TABLE IF EXISTS `FUNCIONARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FUNCIONARIO` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `SIAPE` varchar(20) NOT NULL,
  `USUARIO` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `FK_FUNCIONARIO_USUARIO_idx` (`USUARIO`),
  CONSTRAINT `FK_FUNCIONARIO_USUARIO` FOREIGN KEY (`USUARIO`) REFERENCES `USUARIO` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FUNCIONARIO`
--

LOCK TABLES `FUNCIONARIO` WRITE;
/*!40000 ALTER TABLE `FUNCIONARIO` DISABLE KEYS */;
INSERT INTO `FUNCIONARIO` VALUES (1,'0808000',4),(2,'090009999',7),(3,'991837746',9),(4,'7777777777',16),(5,'7777777777',17);
/*!40000 ALTER TABLE `FUNCIONARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OCORRENCIA`
--

DROP TABLE IF EXISTS `OCORRENCIA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OCORRENCIA` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `DESCRICAO` text NOT NULL,
  `LOCAL` varchar(200) DEFAULT NULL,
  `PAPEL` int(11) NOT NULL,
  `TIPO_OCORRENCIA` int(11) DEFAULT NULL,
  `SETOR` int(11) DEFAULT NULL,
  `USUARIO` int(11) DEFAULT NULL,
  `DATA` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`),
  KEY `FK_OCORRENCIA_TIPO_OCORRENCIA_idx` (`TIPO_OCORRENCIA`),
  KEY `FK_OCORRENCIA_SETOR_idx` (`SETOR`),
  KEY `FK_OCORRENCIA_USUARIO_idx` (`USUARIO`),
  KEY `FK_OCORRENCIA_PAPEL_idx` (`PAPEL`),
  CONSTRAINT `FK_OCORRENCIA_PAPEL` FOREIGN KEY (`PAPEL`) REFERENCES `PAPEL` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_OCORRENCIA_SETOR` FOREIGN KEY (`SETOR`) REFERENCES `SETOR` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_OCORRENCIA_TIPO_OCORRENCIA` FOREIGN KEY (`TIPO_OCORRENCIA`) REFERENCES `OCORRENCIA_TIPO` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_OCORRENCIA_USUARIO` FOREIGN KEY (`USUARIO`) REFERENCES `USUARIO` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OCORRENCIA`
--

LOCK TABLES `OCORRENCIA` WRITE;
/*!40000 ALTER TABLE `OCORRENCIA` DISABLE KEYS */;
INSERT INTO `OCORRENCIA` VALUES (1,'A','Sala2',1,1,1,1,'2015-10-04 20:31:45'),(2,'Primeiro Andar','Secretaria',1,2,1,2,'2015-10-04 20:31:45'),(3,'Segundo Andar','Secretaria',1,3,2,3,'2015-10-04 20:31:45'),(4,'Assalto a mão armada','Segunda Entrada',1,1,3,4,'2015-10-04 20:31:45'),(5,'Teste','Porta',2,3,5,5,'2015-10-04 20:31:45'),(6,'Segundo andar','Segundo andar',1,4,4,7,'2015-10-04 20:31:45'),(7,'llskjj ','Sala 02',1,2,1,8,'2015-10-04 20:31:45'),(8,'ass','Portão Principal',2,5,6,9,'2015-10-04 20:31:45'),(9,'X','Segundo andar',2,2,3,10,'2015-10-04 20:31:45'),(10,'a','a',2,5,5,11,'2015-10-04 20:31:45'),(11,'Janela','Janela Segudo Andar',2,3,5,14,'2015-10-04 21:13:12'),(12,'TesteTempoReal2','Janela Segudo Andar',2,3,6,15,'2015-10-04 21:16:18'),(13,'Teste 3','Teste 3',2,2,5,16,'2015-10-04 21:26:53'),(14,'Teste 4','Teste 4',2,2,3,17,'2015-10-04 21:28:45'),(15,'Teste 5','Teste 5',1,2,1,18,'2015-10-04 21:30:30');
/*!40000 ALTER TABLE `OCORRENCIA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OCORRENCIA_TIPO`
--

DROP TABLE IF EXISTS `OCORRENCIA_TIPO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OCORRENCIA_TIPO` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(50) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OCORRENCIA_TIPO`
--

LOCK TABLES `OCORRENCIA_TIPO` WRITE;
/*!40000 ALTER TABLE `OCORRENCIA_TIPO` DISABLE KEYS */;
INSERT INTO `OCORRENCIA_TIPO` VALUES (1,'Assalto'),(2,'Furto'),(3,'Depredação'),(4,'Invasão'),(5,'Pessoa Estranha');
/*!40000 ALTER TABLE `OCORRENCIA_TIPO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OUTRO`
--

DROP TABLE IF EXISTS `OUTRO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OUTRO` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `CPF` varchar(11) NOT NULL,
  `USUARIO` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `FK_OUTRO_USUARIO_idx` (`USUARIO`),
  CONSTRAINT `FK_OUTRO_USUARIO` FOREIGN KEY (`USUARIO`) REFERENCES `USUARIO` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OUTRO`
--

LOCK TABLES `OUTRO` WRITE;
/*!40000 ALTER TABLE `OUTRO` DISABLE KEYS */;
INSERT INTO `OUTRO` VALUES (1,'0088001',5),(2,'0000000000',11),(5,'11111111111',14),(6,'11111111111',15);
/*!40000 ALTER TABLE `OUTRO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PAPEL`
--

DROP TABLE IF EXISTS `PAPEL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PAPEL` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(50) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PAPEL`
--

LOCK TABLES `PAPEL` WRITE;
/*!40000 ALTER TABLE `PAPEL` DISABLE KEYS */;
INSERT INTO `PAPEL` VALUES (1,'Vítima'),(2,'Testemunha');
/*!40000 ALTER TABLE `PAPEL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SETOR`
--

DROP TABLE IF EXISTS `SETOR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SETOR` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(100) NOT NULL,
  `UNIDADE` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `FK_SETOR_UNIDADE_idx` (`UNIDADE`),
  CONSTRAINT `FK_SETOR_UNIDADE` FOREIGN KEY (`UNIDADE`) REFERENCES `UNIDADE` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SETOR`
--

LOCK TABLES `SETOR` WRITE;
/*!40000 ALTER TABLE `SETOR` DISABLE KEYS */;
INSERT INTO `SETOR` VALUES (1,'ICB',1),(2,'ITEC',1),(3,'Ginasio',1),(4,'Biblioteca',1),(5,'Biblioteca',2),(6,'Bloco A',2);
/*!40000 ALTER TABLE `SETOR` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UNIDADE`
--

DROP TABLE IF EXISTS `UNIDADE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UNIDADE` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(100) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UNIDADE`
--

LOCK TABLES `UNIDADE` WRITE;
/*!40000 ALTER TABLE `UNIDADE` DISABLE KEYS */;
INSERT INTO `UNIDADE` VALUES (1,'Guama'),(2,'Altamira');
/*!40000 ALTER TABLE `UNIDADE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USUARIO`
--

DROP TABLE IF EXISTS `USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USUARIO` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(200) NOT NULL,
  `TELEFONE` varchar(14) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `SETOR` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `FK_USUARIO_SETOR_idx` (`SETOR`),
  CONSTRAINT `FK_USUARIO_SETOR` FOREIGN KEY (`SETOR`) REFERENCES `SETOR` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIO`
--

LOCK TABLES `USUARIO` WRITE;
/*!40000 ALTER TABLE `USUARIO` DISABLE KEYS */;
INSERT INTO `USUARIO` VALUES (1,'Robson Claudio','991','rob.engcomp@gmail.com',NULL),(2,'Marina','(91)88888-8888','marina@gmail.com',NULL),(3,'Felipe','(91)77777-7777','felipe@gmail.com',NULL),(4,'Amanda','(91)66666-6666','amanda@gmail.com',NULL),(5,'Romario','(91)55555-5555','romario@gmail.com',NULL),(7,'Maria','(91)11111-1111','maria@gmail.com',NULL),(8,'Roberto','(91)33333-3333','roberto@gmail.com',NULL),(9,'Telma','(91)55555-5555','telma@gmail.com',NULL),(10,'Roberta','(91)77777-7777','roberta@gmail.com',NULL),(11,'Robson','(11)11111-1111','rrrr@gmai.com',NULL),(14,'TesteTempoReal','(91)11111-1111','TesteTempoReal@gmai.com',NULL),(15,'TesteTempoReal2','(91)11111-1111','TesteTempoReal@gmai.com',NULL),(16,'TesteTempoReal3','(91)66666-6666','TesteTempoReal@gmai.com',NULL),(17,'TesteTempoReal4','(91)66666-6666','TesteTempoReal@gmai.com',NULL),(18,'Test 5','(91)88888-8888','TesteTempoReal@gmai.com',NULL);
/*!40000 ALTER TABLE `USUARIO` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-10-06 23:56:28
