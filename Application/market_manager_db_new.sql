-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 21 juin 2023 à 11:20
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `market_manager_db_nw`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

CREATE TABLE `articles` (
  `id_article` int(11) NOT NULL,
  `libele_article` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id_article`, `libele_article`, `description`) VALUES
(64, 'Sucre', 'Sucre'),
(65, 'Huile Mayor', 'Huile Mayor'),
(66, 'farine', 'farine'),
(67, 'Savon Azur', 'Savon Azur'),
(68, 'bonbon', 'bonbon');

-- --------------------------------------------------------

--
-- Structure de la table `articles_condmnt`
--

CREATE TABLE `articles_condmnt` (
  `article_id` int(11) NOT NULL,
  `condmnt_id` int(11) NOT NULL,
  `prix_vente` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `articles_condmnt`
--

INSERT INTO `articles_condmnt` (`article_id`, `condmnt_id`, `prix_vente`) VALUES
(64, 1, 350),
(64, 3, 800),
(64, 4, 25054),
(64, 5, 30000),
(65, 1, 35999),
(65, 2, 1601),
(66, 3, 5645),
(66, 4, 4),
(66, 5, 0),
(67, 3, 2),
(68, 1, 200);

-- --------------------------------------------------------

--
-- Structure de la table `bomcommandes`
--

CREATE TABLE `bomcommandes` (
  `id_boncmd` int(11) NOT NULL,
  `date_boncmd` date NOT NULL,
  `fournisseur_id` int(11) NOT NULL,
  `montant_boncmd` double NOT NULL,
  `solde_boncmd` double NOT NULL,
  `montant_regler` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `bomcommandes`
--

INSERT INTO `bomcommandes` (`id_boncmd`, `date_boncmd`, `fournisseur_id`, `montant_boncmd`, `solde_boncmd`, `montant_regler`) VALUES
(40, '2023-03-04', 1, 111000, 111000, 0),
(42, '2023-03-17', 1, 16, 16, 0),
(49, '2023-03-24', 1, 34, 34, 0),
(50, '2023-03-18', 1, 112, 112, 0),
(51, '2023-03-16', 1, 38, 38, 0),
(52, '0000-00-00', 1, 280000, 280000, 0),
(53, '2023-03-01', 1, 1249624, 1249624, 0),
(54, '2023-04-16', 1, 167394, 167394, 0);

-- --------------------------------------------------------

--
-- Structure de la table `boncmd_article`
--

CREATE TABLE `boncmd_article` (
  `boncmd_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `qteCmd` int(11) NOT NULL,
  `PU` double NOT NULL,
  `conditionnement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `boncmd_article`
--

INSERT INTO `boncmd_article` (`boncmd_id`, `article_id`, `qteCmd`, `PU`, `conditionnement_id`) VALUES
(53, 64, 20, 54126, 4),
(53, 65, 32, 5222, 2),
(54, 67, 22, 5727, 3),
(54, 68, 75, 552, 1);

-- --------------------------------------------------------

--
-- Structure de la table `bonreceptions`
--

CREATE TABLE `bonreceptions` (
  `id_bonreception` int(11) NOT NULL,
  `date_reception` date NOT NULL,
  `boncmd_id` int(11) NOT NULL,
  `entrepot_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `bonreceptions`
--

INSERT INTO `bonreceptions` (`id_bonreception`, `date_reception`, `boncmd_id`, `entrepot_id`) VALUES
(1, '2023-03-05', 40, 21),
(2, '2023-03-22', 40, 21);

-- --------------------------------------------------------

--
-- Structure de la table `bonreception_article`
--

CREATE TABLE `bonreception_article` (
  `bonreception_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `qteReçu` int(11) NOT NULL,
  `conditionnement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `bonsortie`
--

CREATE TABLE `bonsortie` (
  `id_bonsortie` int(11) NOT NULL,
  `date_bonsortie` date NOT NULL,
  `provenance` int(11) NOT NULL,
  `destination` int(11) DEFAULT NULL,
  `nom_client` varchar(50) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `bonsortie`
--

INSERT INTO `bonsortie` (`id_bonsortie`, `date_bonsortie`, `provenance`, `destination`, `nom_client`, `client_id`, `status`) VALUES
(162, '2023-04-16', 21, 2, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `bonsortie_article`
--

CREATE TABLE `bonsortie_article` (
  `bonsortie_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `qteSortie` int(11) NOT NULL,
  `conditionnement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `bonsortie_article`
--

INSERT INTO `bonsortie_article` (`bonsortie_id`, `article_id`, `qteSortie`, `conditionnement_id`) VALUES
(162, 68, 50, 1);

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `id_client` int(11) NOT NULL,
  `nom_client` varchar(100) NOT NULL,
  `telephone_client` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id_client`, `nom_client`, `telephone_client`) VALUES
(1, 'Awoulka', '699159841');

-- --------------------------------------------------------

--
-- Structure de la table `comptes`
--

CREATE TABLE `comptes` (
  `id_compte` int(11) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `personnel_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comptes`
--

INSERT INTO `comptes` (`id_compte`, `login`, `password`, `personnel_id`) VALUES
(1, 'ousman', '1234', 4),
(2, 'sali', '88888', 2);

-- --------------------------------------------------------

--
-- Structure de la table `compte_client`
--

CREATE TABLE `compte_client` (
  `id_compteC` int(11) NOT NULL,
  `montant_a_payer` double NOT NULL,
  `montant_regler` double NOT NULL,
  `solde` double NOT NULL,
  `client_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `compte_client`
--

INSERT INTO `compte_client` (`id_compteC`, `montant_a_payer`, `montant_regler`, `solde`, `client_id`) VALUES
(1, 35000, 33048, 1952, 1);

-- --------------------------------------------------------

--
-- Structure de la table `conditionnements`
--

CREATE TABLE `conditionnements` (
  `id_condmnt` int(11) NOT NULL,
  `libele_condmnt` varchar(50) NOT NULL,
  `abreviation_condmnt` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `conditionnements`
--

INSERT INTO `conditionnements` (`id_condmnt`, `libele_condmnt`, `abreviation_condmnt`) VALUES
(1, 'Carton', 'Carton'),
(2, 'Bouteeille', 'Bouteille'),
(3, 'Kilogramme', 'Kg'),
(4, 'Sac 25 Kg', 'Sac 25 Kg'),
(5, 'Sac 50 Kg', 'Sac 50 Kg');

-- --------------------------------------------------------

--
-- Structure de la table `entrepots`
--

CREATE TABLE `entrepots` (
  `id_entrepot` int(11) NOT NULL,
  `libele_entrepot` varchar(100) NOT NULL,
  `localisation_entrepot` varchar(60) NOT NULL,
  `magazinier` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `entrepots`
--

INSERT INTO `entrepots` (`id_entrepot`, `libele_entrepot`, `localisation_entrepot`, `magazinier`) VALUES
(2, 'Boutique ', 'petit marché ', 1),
(21, 'ENTREPOT 1', 'Grand Marché', 1),
(22, 'ENTREPOT 2', 'Petit marche', 1);

-- --------------------------------------------------------

--
-- Structure de la table `entrepot_article`
--

CREATE TABLE `entrepot_article` (
  `entrepot_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `condmnt_id` int(11) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `entrepot_article`
--

INSERT INTO `entrepot_article` (`entrepot_id`, `article_id`, `condmnt_id`, `stock`) VALUES
(2, 64, 3, 19),
(2, 64, 1, 64),
(2, 64, 5, 102),
(2, 64, 4, 12),
(2, 65, 1, -4425),
(2, 65, 2, 2340),
(22, 65, 1, 0),
(22, 65, 2, 0),
(22, 64, 1, 0),
(22, 64, 3, 0),
(22, 64, 4, 0),
(22, 64, 5, 0),
(2, 66, 3, 234),
(2, 66, 4, 2524),
(2, 66, 5, 0),
(2, 67, 3, 20),
(2, 68, 1, 100),
(21, 68, 1, 100),
(22, 68, 1, 100);

-- --------------------------------------------------------

--
-- Structure de la table `factures`
--

CREATE TABLE `factures` (
  `id_facture` int(11) NOT NULL,
  `date_facture` date NOT NULL,
  `montant__facture` double NOT NULL,
  `reglement_facture` varchar(15) NOT NULL,
  `nom_client` varchar(60) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `vendeur_id` int(11) NOT NULL,
  `caissier_id` int(11) NOT NULL,
  `reduction` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `factures`
--

INSERT INTO `factures` (`id_facture`, `date_facture`, `montant__facture`, `reglement_facture`, `nom_client`, `client_id`, `vendeur_id`, `caissier_id`, `reduction`) VALUES
(94, '2023-04-07', 0, 'Comptant', '', NULL, 1, 2, 0),
(95, '2023-04-08', 0, 'Comptant', '', NULL, 1, 2, 0),
(96, '2023-04-08', 0, 'Comptant', '', NULL, 1, 2, 0),
(97, '2023-04-08', 0, 'Comptant', '', NULL, 1, 2, 0),
(98, '2023-04-08', 0, 'Comptant', '', NULL, 1, 2, 0),
(99, '2023-04-08', 0, 'Comptant', '', NULL, 1, 2, 0),
(100, '2023-04-08', 0, 'Comptant', 'Jo', NULL, 1, 2, 0),
(101, '2023-04-08', 0, 'Comptant', '', NULL, 1, 2, 0),
(102, '2023-04-08', 0, 'Comptant', '', NULL, 1, 2, 0),
(103, '2023-04-08', 0, 'Comptant', '', NULL, 1, 2, 0),
(104, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(105, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(106, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(107, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(108, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(109, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(110, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(111, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(112, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(113, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(114, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(115, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(116, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(117, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(118, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(119, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(120, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(121, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(122, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(123, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(124, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(125, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(126, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(127, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(128, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(129, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(130, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(131, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(132, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(133, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(134, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(135, '2023-04-09', 280, 'Comptant', '', NULL, 1, 2, 0),
(136, '2023-04-09', 280, 'Comptant', '', NULL, 1, 2, 0),
(137, '2023-04-09', 35480, 'Comptant', '', NULL, 1, 2, 0),
(138, '2023-04-09', 1080, 'Comptant', '', NULL, 1, 2, 0),
(139, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(140, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(141, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(142, '2023-04-09', 0, 'Comptant', '', NULL, 1, 2, 0),
(143, '2023-04-10', 0, 'Comptant', '', NULL, 1, 2, 0),
(144, '2023-04-10', 0, 'Comptant', 'herg', NULL, 1, 2, 0),
(145, '2023-04-10', 0, 'Comptant', '', NULL, 1, 2, 0),
(146, '2023-04-10', 0, 'Comptant', '', NULL, 1, 2, 0),
(147, '2023-04-10', 0, 'Comptant', '', NULL, 1, 2, 0),
(148, '2023-04-10', 0, 'Comptant', '', NULL, 1, 2, 0),
(149, '2023-04-10', 0, 'Comptant', '', NULL, 1, 2, 0),
(150, '2023-04-10', 0, 'Comptant', '', NULL, 1, 2, 0),
(151, '2023-04-10', 0, 'Comptant', '', NULL, 1, 2, 0),
(152, '2023-04-10', 0, 'Comptant', '', NULL, 1, 2, 0),
(153, '2023-04-10', 0, 'Comptant', '', NULL, 1, 2, 0),
(154, '2023-04-11', 0, 'Comptant', '', NULL, 1, 2, 0),
(155, '2023-04-13', 0, 'Comptant', '', NULL, 1, 2, 0),
(156, '2023-04-13', 0, 'Comptant', '', NULL, 1, 2, 0),
(157, '2023-04-13', 0, 'Comptant', '', NULL, 1, 2, 0),
(158, '2023-04-15', 162864847, 'Comptant', '', NULL, 1, 2, 5353);

-- --------------------------------------------------------

--
-- Structure de la table `facture_article`
--

CREATE TABLE `facture_article` (
  `facture_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `qte` int(11) NOT NULL,
  `conditionnement_id` int(11) NOT NULL,
  `entrepot_id` int(11) NOT NULL,
  `PU` double NOT NULL,
  `reduction` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `facture_article`
--

INSERT INTO `facture_article` (`facture_id`, `article_id`, `qte`, `conditionnement_id`, `entrepot_id`, `PU`, `reduction`) VALUES
(94, 65, 0, 1, 0, 36000, 0),
(95, 65, 0, 1, 0, 36000, 0),
(97, 65, 0, 1, 0, 36000, 0),
(97, 65, 0, 1, 0, 36000, 0),
(97, 65, 0, 1, 0, 36000, 0),
(97, 65, 0, 1, 0, 36000, 0),
(97, 65, 0, 1, 0, 36000, 0),
(97, 65, 0, 1, 0, 36000, 0),
(97, 65, 0, 1, 0, 36000, 0),
(97, 65, 0, 1, 0, 36000, 0),
(97, 65, 0, 1, 0, 36000, 0),
(98, 65, 0, 1, 0, 36000, 0),
(99, 65, 0, 1, 0, 36000, 0),
(99, 65, 0, 1, 0, 36000, 0),
(99, 65, 0, 1, 0, 36000, 0),
(99, 65, 0, 1, 0, 36000, 0),
(100, 65, 0, 1, 0, 36000, 0),
(100, 65, 0, 1, 0, 36000, 0),
(100, 65, 0, 1, 0, 36000, 0),
(100, 65, 0, 1, 0, 36000, 0),
(101, 65, 0, 1, 0, 36000, 0),
(101, 65, 0, 1, 0, 36000, 0),
(101, 65, 0, 1, 0, 36000, 0),
(102, 65, 0, 1, 0, 36000, 0),
(103, 65, 0, 1, 0, 36000, 0),
(104, 65, 0, 1, 0, 36000, 0),
(105, 65, 0, 1, 0, 36000, 0),
(106, 65, 0, 1, 0, 36000, 0),
(107, 65, 0, 1, 0, 36000, 0),
(108, 65, 0, 1, 0, 36000, 0),
(109, 65, 0, 1, 0, 36000, 0),
(110, 65, 0, 1, 0, 36000, 0),
(111, 65, 0, 1, 0, 36000, 0),
(112, 65, 0, 1, 0, 36000, 0),
(113, 65, 0, 1, 0, 36000, 0),
(114, 65, 0, 1, 0, 36000, 0),
(115, 65, 0, 1, 0, 36000, 0),
(116, 65, 0, 1, 0, 36000, 0),
(117, 65, 0, 1, 0, 36000, 0),
(118, 65, 0, 1, 0, 36000, 0),
(119, 65, 0, 1, 0, 36000, 0),
(120, 65, 0, 1, 0, 36000, 0),
(121, 65, 0, 1, 0, 36000, 0),
(122, 65, 0, 1, 0, 36000, 0),
(123, 65, 0, 1, 0, 36000, 0),
(124, 65, 0, 1, 0, 36000, 0),
(125, 65, 0, 1, 0, 36000, 0),
(126, 65, 0, 1, 0, 36000, 0),
(127, 65, 0, 1, 0, 36000, 0),
(128, 65, 0, 1, 0, 36000, 0),
(129, 65, 0, 1, 0, 36000, 0),
(130, 65, 0, 1, 0, 36000, 0),
(131, 65, 0, 1, 0, 36000, 0),
(132, 65, 0, 1, 0, 36000, 0),
(133, 65, 0, 1, 0, 36000, 0),
(134, 65, 0, 1, 0, 36000, 0),
(135, 64, 1, 3, 0, 800, 520),
(136, 64, 1, 3, 0, 800, 520),
(137, 65, 1, 2, 0, 1600, 520),
(138, 65, 1, 1, 0, 36000, 520),
(139, 65, 0, 1, 0, 36000, 0),
(140, 65, 0, 1, 0, 36000, 0),
(141, 65, 0, 1, 0, 36000, 0),
(142, 65, 0, 1, 0, 36000, 0),
(142, 65, 0, 2, 0, 1600, 0),
(143, 65, 0, 1, 0, 0, 0),
(144, 65, 0, 1, 0, 36000, 0),
(144, 65, 0, 1, 0, 36000, 0),
(145, 65, 0, 1, 0, 36000, 0),
(146, 65, 0, 1, 0, 36000, 0),
(147, 65, 0, 1, 0, 36000, 0),
(148, 65, 0, 1, 0, 36000, 0),
(149, 65, 0, 1, 0, 36000, 0),
(150, 65, 0, 1, 0, 36000, 0),
(151, 65, 0, 1, 0, 36000, 0),
(152, 65, 0, 1, 0, 36000, 0),
(152, 65, 0, 1, 0, 36000, 0),
(152, 65, 0, 1, 0, 36000, 0),
(152, 65, 0, 1, 0, 36000, 0),
(152, 65, 0, 1, 0, 36000, 0),
(152, 65, 0, 1, 0, 36000, 0),
(152, 65, 0, 1, 0, 36000, 0),
(152, 65, 0, 1, 0, 36000, 0),
(152, 65, 0, 1, 0, 36000, 0),
(153, 65, 0, 1, 0, 36000, 0),
(153, 65, 0, 1, 0, 36000, 0),
(153, 65, 0, 1, 0, 36000, 0),
(153, 65, 0, 1, 0, 36000, 0),
(153, 65, 0, 1, 0, 36000, 0),
(153, 65, 0, 1, 0, 36000, 0),
(153, 65, 0, 1, 0, 36000, 0),
(153, 65, 0, 1, 0, 36000, 0),
(153, 65, 0, 1, 0, 36000, 0),
(154, 65, 0, 1, 0, 36000, 0),
(154, 66, 0, 3, 0, 0, 0),
(155, 65, 0, 1, 0, 36000, 0),
(156, 66, 0, 3, 0, 5645, 0),
(157, 66, 0, 3, 0, 5645, 0),
(157, 65, 0, 1, 0, 36000, 0),
(158, 65, 4525, 1, 0, 35999, 25275);

-- --------------------------------------------------------

--
-- Structure de la table `fonction`
--

CREATE TABLE `fonction` (
  `id_fonction` int(11) NOT NULL,
  `libele_fonction` varchar(50) NOT NULL,
  `abreviation_fonction` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `fonction`
--

INSERT INTO `fonction` (`id_fonction`, `libele_fonction`, `abreviation_fonction`) VALUES
(1, 'caissier', 'caisse'),
(2, 'vendeur', 'vendeur'),
(3, 'administrateur', 'Admin');

-- --------------------------------------------------------

--
-- Structure de la table `fournisseur`
--

CREATE TABLE `fournisseur` (
  `id_fournisseur` int(11) NOT NULL,
  `nom_fournisseur` varchar(60) NOT NULL,
  `telephone_fournisseur` varchar(15) NOT NULL,
  `adresse_fournisseur` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `fournisseur`
--

INSERT INTO `fournisseur` (`id_fournisseur`, `nom_fournisseur`, `telephone_fournisseur`, `adresse_fournisseur`) VALUES
(1, 'ETABLISSEMENT FOKOU', '699159841', 'Petit Marché'),
(12, 'QUIFEROU', '690786195', 'Grand Marché'),
(13, 'TOTAL', '694959355', 'Ngaoundéré');

-- --------------------------------------------------------

--
-- Structure de la table `personnels`
--

CREATE TABLE `personnels` (
  `id_personnel` int(11) NOT NULL,
  `nom_personnel` varchar(60) NOT NULL,
  `telephone_personnel` varchar(60) NOT NULL,
  `date_recrutement` date DEFAULT current_timestamp(),
  `date_naiss_personnel` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `personnels`
--

INSERT INTO `personnels` (`id_personnel`, `nom_personnel`, `telephone_personnel`, `date_recrutement`, `date_naiss_personnel`) VALUES
(1, 'Moussa', '699159841', '2023-02-02', '2023-02-03'),
(2, 'Saliou', '690786195', '2023-03-08', '2023-03-23'),
(4, 'Ousman', '695235462', '2023-04-16', '2023-04-16');

-- --------------------------------------------------------

--
-- Structure de la table `personnel_fonction`
--

CREATE TABLE `personnel_fonction` (
  `personnel_id` int(11) NOT NULL,
  `fonction_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `personnel_fonction`
--

INSERT INTO `personnel_fonction` (`personnel_id`, `fonction_id`) VALUES
(1, 1),
(2, 2),
(4, 3);

-- --------------------------------------------------------

--
-- Structure de la table `reception`
--

CREATE TABLE `reception` (
  `id_reception` int(11) NOT NULL,
  `date_reception` date NOT NULL,
  `bonsortie_id` int(11) NOT NULL,
  `entrepot_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `reception_article`
--

CREATE TABLE `reception_article` (
  `reception_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `qteR` int(11) NOT NULL,
  `conditionnement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `reglement_fseur`
--

CREATE TABLE `reglement_fseur` (
  `id_reglement` int(11) NOT NULL,
  `date_reglement` date NOT NULL,
  `montant` double NOT NULL,
  `boncmd_id` int(11) DEFAULT NULL,
  `fourniseur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `reçues`
--

CREATE TABLE `reçues` (
  `id_reçue` int(11) NOT NULL,
  `date` date NOT NULL,
  `montant` double NOT NULL,
  `compteC_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id_article`);

--
-- Index pour la table `articles_condmnt`
--
ALTER TABLE `articles_condmnt`
  ADD KEY `id_article` (`article_id`,`condmnt_id`),
  ADD KEY `id_condmnt` (`condmnt_id`);

--
-- Index pour la table `bomcommandes`
--
ALTER TABLE `bomcommandes`
  ADD PRIMARY KEY (`id_boncmd`),
  ADD KEY `id_fourniseur` (`fournisseur_id`);

--
-- Index pour la table `boncmd_article`
--
ALTER TABLE `boncmd_article`
  ADD KEY `iboncmd_id` (`boncmd_id`,`article_id`,`conditionnement_id`),
  ADD KEY `article_id` (`article_id`),
  ADD KEY `conditionnement_id` (`conditionnement_id`);

--
-- Index pour la table `bonreceptions`
--
ALTER TABLE `bonreceptions`
  ADD PRIMARY KEY (`id_bonreception`),
  ADD KEY `boncmd_id` (`boncmd_id`,`entrepot_id`),
  ADD KEY `entrepot_id` (`entrepot_id`);

--
-- Index pour la table `bonreception_article`
--
ALTER TABLE `bonreception_article`
  ADD KEY `bonreception_id` (`bonreception_id`,`article_id`),
  ADD KEY `article_id` (`article_id`),
  ADD KEY `conditionnement_id` (`conditionnement_id`);

--
-- Index pour la table `bonsortie`
--
ALTER TABLE `bonsortie`
  ADD PRIMARY KEY (`id_bonsortie`),
  ADD KEY `provenance` (`provenance`,`destination`,`nom_client`),
  ADD KEY `destination` (`destination`),
  ADD KEY `client_id` (`client_id`);

--
-- Index pour la table `bonsortie_article`
--
ALTER TABLE `bonsortie_article`
  ADD KEY `bonsortie_id` (`bonsortie_id`,`article_id`,`conditionnement_id`),
  ADD KEY `article_id` (`article_id`),
  ADD KEY `conditionnement_id` (`conditionnement_id`);

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id_client`);

--
-- Index pour la table `comptes`
--
ALTER TABLE `comptes`
  ADD PRIMARY KEY (`id_compte`),
  ADD KEY `personnel_id` (`personnel_id`);

--
-- Index pour la table `compte_client`
--
ALTER TABLE `compte_client`
  ADD PRIMARY KEY (`id_compteC`),
  ADD KEY `client_id` (`client_id`);

--
-- Index pour la table `conditionnements`
--
ALTER TABLE `conditionnements`
  ADD PRIMARY KEY (`id_condmnt`);

--
-- Index pour la table `entrepots`
--
ALTER TABLE `entrepots`
  ADD PRIMARY KEY (`id_entrepot`),
  ADD KEY `magazinier` (`magazinier`);

--
-- Index pour la table `entrepot_article`
--
ALTER TABLE `entrepot_article`
  ADD KEY `entrepot_id` (`entrepot_id`,`article_id`),
  ADD KEY `article_id` (`article_id`),
  ADD KEY `condmnt_id` (`condmnt_id`);

--
-- Index pour la table `factures`
--
ALTER TABLE `factures`
  ADD PRIMARY KEY (`id_facture`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `personnel_id` (`vendeur_id`),
  ADD KEY `vendeur_id` (`vendeur_id`,`caissier_id`),
  ADD KEY `caissier_id` (`caissier_id`);

--
-- Index pour la table `facture_article`
--
ALTER TABLE `facture_article`
  ADD KEY `facture_id` (`facture_id`,`article_id`,`conditionnement_id`),
  ADD KEY `article_id` (`article_id`),
  ADD KEY `conditionnement_id` (`conditionnement_id`),
  ADD KEY `entrepot_id` (`entrepot_id`);

--
-- Index pour la table `fonction`
--
ALTER TABLE `fonction`
  ADD PRIMARY KEY (`id_fonction`);

--
-- Index pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  ADD PRIMARY KEY (`id_fournisseur`);

--
-- Index pour la table `personnels`
--
ALTER TABLE `personnels`
  ADD PRIMARY KEY (`id_personnel`);

--
-- Index pour la table `personnel_fonction`
--
ALTER TABLE `personnel_fonction`
  ADD KEY `personnel_id` (`personnel_id`,`fonction_id`),
  ADD KEY `fonction_id` (`fonction_id`);

--
-- Index pour la table `reception`
--
ALTER TABLE `reception`
  ADD PRIMARY KEY (`id_reception`),
  ADD KEY `bonsortie_id` (`bonsortie_id`),
  ADD KEY `entrepot_id` (`entrepot_id`);

--
-- Index pour la table `reception_article`
--
ALTER TABLE `reception_article`
  ADD KEY `reception_id` (`reception_id`,`article_id`,`conditionnement_id`),
  ADD KEY `article_id` (`article_id`),
  ADD KEY `conditionnement_id` (`conditionnement_id`);

--
-- Index pour la table `reglement_fseur`
--
ALTER TABLE `reglement_fseur`
  ADD PRIMARY KEY (`id_reglement`),
  ADD KEY `boncmd_id` (`boncmd_id`),
  ADD KEY `fourniseur_id` (`fourniseur_id`);

--
-- Index pour la table `reçues`
--
ALTER TABLE `reçues`
  ADD PRIMARY KEY (`id_reçue`),
  ADD KEY `compteC_id` (`compteC_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `articles`
--
ALTER TABLE `articles`
  MODIFY `id_article` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT pour la table `bomcommandes`
--
ALTER TABLE `bomcommandes`
  MODIFY `id_boncmd` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT pour la table `bonreceptions`
--
ALTER TABLE `bonreceptions`
  MODIFY `id_bonreception` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `bonsortie`
--
ALTER TABLE `bonsortie`
  MODIFY `id_bonsortie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT pour la table `clients`
--
ALTER TABLE `clients`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `comptes`
--
ALTER TABLE `comptes`
  MODIFY `id_compte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `compte_client`
--
ALTER TABLE `compte_client`
  MODIFY `id_compteC` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `conditionnements`
--
ALTER TABLE `conditionnements`
  MODIFY `id_condmnt` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `entrepots`
--
ALTER TABLE `entrepots`
  MODIFY `id_entrepot` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `factures`
--
ALTER TABLE `factures`
  MODIFY `id_facture` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT pour la table `fonction`
--
ALTER TABLE `fonction`
  MODIFY `id_fonction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  MODIFY `id_fournisseur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `personnels`
--
ALTER TABLE `personnels`
  MODIFY `id_personnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `reception`
--
ALTER TABLE `reception`
  MODIFY `id_reception` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `reglement_fseur`
--
ALTER TABLE `reglement_fseur`
  MODIFY `id_reglement` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `reçues`
--
ALTER TABLE `reçues`
  MODIFY `id_reçue` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `articles_condmnt`
--
ALTER TABLE `articles_condmnt`
  ADD CONSTRAINT `Articles_Condmnt_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id_article`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Articles_Condmnt_ibfk_2` FOREIGN KEY (`condmnt_id`) REFERENCES `conditionnements` (`id_condmnt`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `bomcommandes`
--
ALTER TABLE `bomcommandes`
  ADD CONSTRAINT `BomCommandes_ibfk_1` FOREIGN KEY (`fournisseur_id`) REFERENCES `fournisseur` (`id_fournisseur`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `boncmd_article`
--
ALTER TABLE `boncmd_article`
  ADD CONSTRAINT `BonCmd_Article_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id_article`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `BonCmd_Article_ibfk_2` FOREIGN KEY (`conditionnement_id`) REFERENCES `conditionnements` (`id_condmnt`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `BonCmd_Article_ibfk_3` FOREIGN KEY (`boncmd_id`) REFERENCES `bomcommandes` (`id_boncmd`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `bonreceptions`
--
ALTER TABLE `bonreceptions`
  ADD CONSTRAINT `BonReceptions_ibfk_1` FOREIGN KEY (`boncmd_id`) REFERENCES `bomcommandes` (`id_boncmd`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `BonReceptions_ibfk_2` FOREIGN KEY (`entrepot_id`) REFERENCES `entrepots` (`id_entrepot`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `bonreception_article`
--
ALTER TABLE `bonreception_article`
  ADD CONSTRAINT `BonReception_Article_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id_article`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `BonReception_Article_ibfk_2` FOREIGN KEY (`bonreception_id`) REFERENCES `bonreceptions` (`id_bonreception`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `BonReception_Article_ibfk_3` FOREIGN KEY (`conditionnement_id`) REFERENCES `conditionnements` (`id_condmnt`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `bonsortie`
--
ALTER TABLE `bonsortie`
  ADD CONSTRAINT `BonSortie_ibfk_1` FOREIGN KEY (`destination`) REFERENCES `entrepots` (`id_entrepot`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `BonSortie_ibfk_2` FOREIGN KEY (`provenance`) REFERENCES `entrepots` (`id_entrepot`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `BonSortie_ibfk_3` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id_client`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `bonsortie_article`
--
ALTER TABLE `bonsortie_article`
  ADD CONSTRAINT `BonSortie_Article_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id_article`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `BonSortie_Article_ibfk_2` FOREIGN KEY (`bonsortie_id`) REFERENCES `bonsortie` (`id_bonsortie`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `BonSortie_Article_ibfk_3` FOREIGN KEY (`conditionnement_id`) REFERENCES `conditionnements` (`id_condmnt`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `comptes`
--
ALTER TABLE `comptes`
  ADD CONSTRAINT `Comptes_ibfk_1` FOREIGN KEY (`personnel_id`) REFERENCES `personnels` (`id_personnel`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `compte_client`
--
ALTER TABLE `compte_client`
  ADD CONSTRAINT `Compte_client_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id_client`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `entrepots`
--
ALTER TABLE `entrepots`
  ADD CONSTRAINT `Entrepots_ibfk_1` FOREIGN KEY (`magazinier`) REFERENCES `personnels` (`id_personnel`);

--
-- Contraintes pour la table `entrepot_article`
--
ALTER TABLE `entrepot_article`
  ADD CONSTRAINT `Entrepot_Article_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id_article`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Entrepot_Article_ibfk_2` FOREIGN KEY (`entrepot_id`) REFERENCES `entrepots` (`id_entrepot`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Entrepot_Article_ibfk_3` FOREIGN KEY (`condmnt_id`) REFERENCES `conditionnements` (`id_condmnt`);

--
-- Contraintes pour la table `factures`
--
ALTER TABLE `factures`
  ADD CONSTRAINT `Factures_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id_client`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `Factures_ibfk_2` FOREIGN KEY (`vendeur_id`) REFERENCES `personnels` (`id_personnel`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `Factures_ibfk_3` FOREIGN KEY (`caissier_id`) REFERENCES `personnels` (`id_personnel`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `facture_article`
--
ALTER TABLE `facture_article`
  ADD CONSTRAINT `Facture_Article_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id_article`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Facture_Article_ibfk_2` FOREIGN KEY (`conditionnement_id`) REFERENCES `conditionnements` (`id_condmnt`),
  ADD CONSTRAINT `Facture_Article_ibfk_3` FOREIGN KEY (`facture_id`) REFERENCES `factures` (`id_facture`);

--
-- Contraintes pour la table `personnel_fonction`
--
ALTER TABLE `personnel_fonction`
  ADD CONSTRAINT `Personnel_Fonction_ibfk_1` FOREIGN KEY (`fonction_id`) REFERENCES `fonction` (`id_fonction`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Personnel_Fonction_ibfk_2` FOREIGN KEY (`personnel_id`) REFERENCES `personnels` (`id_personnel`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `reception`
--
ALTER TABLE `reception`
  ADD CONSTRAINT `Reception_ibfk_1` FOREIGN KEY (`bonsortie_id`) REFERENCES `bonsortie` (`id_bonsortie`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Reception_ibfk_2` FOREIGN KEY (`entrepot_id`) REFERENCES `entrepots` (`id_entrepot`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `reception_article`
--
ALTER TABLE `reception_article`
  ADD CONSTRAINT `Reception_Article_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id_article`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Reception_Article_ibfk_2` FOREIGN KEY (`conditionnement_id`) REFERENCES `conditionnements` (`id_condmnt`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Reception_Article_ibfk_3` FOREIGN KEY (`reception_id`) REFERENCES `reception` (`id_reception`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `reglement_fseur`
--
ALTER TABLE `reglement_fseur`
  ADD CONSTRAINT `Reglement_Fseur_ibfk_1` FOREIGN KEY (`boncmd_id`) REFERENCES `bomcommandes` (`id_boncmd`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Reglement_Fseur_ibfk_2` FOREIGN KEY (`fourniseur_id`) REFERENCES `fournisseur` (`id_fournisseur`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `reçues`
--
ALTER TABLE `reçues`
  ADD CONSTRAINT `Reçues_ibfk_1` FOREIGN KEY (`compteC_id`) REFERENCES `compte_client` (`id_compteC`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
