CREATE DATABASE `artykuly`;
USE `artykuly`;

CREATE TABLE `artykuly_allegro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) DEFAULT NULL,
  `image_link` varchar(255) DEFAULT NULL,
  `has_promotion` tinyint(1) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price_in_PLN` int DEFAULT NULL,
  `popularity` int DEFAULT NULL,
  `delivery_in_PLN` decimal(10,2) DEFAULT NULL,
  `seller_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `artykuly_amazon` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Tytul` varchar(255) DEFAULT NULL,
  `Link` varchar(1000) DEFAULT NULL,
  `Zdjecie` varchar(500) DEFAULT NULL,
  `Ocena` varchar(500) DEFAULT NULL,
  `Ocena_w_gwiazdkach` varchar(500) DEFAULT NULL,
  `Dostawa` varchar(500) DEFAULT NULL,
  `Czy_darmowa_dostawa` varchar(500) DEFAULT NULL,
  `Cena_oryginalna` varchar(500) DEFAULT NULL,
  `Cena_promocyjna` varchar(500) DEFAULT NULL,
  `cena_bez_zl` varchar(500) DEFAULT NULL,
  `Ilosc_komentarzy` varchar(500) DEFAULT NULL,
  `Ilosc_dostepnych` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `artykuly_olx` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Tytul` varchar(255) DEFAULT NULL,
  `Link` varchar(255) DEFAULT NULL,
  `Zdjecie` varchar(255) DEFAULT NULL,
  `Cena` varchar(255) DEFAULT NULL,
  `Stan` varchar(255) DEFAULT NULL,
  `Lokalizacja` varchar(255) DEFAULT NULL,
  `Obserwuj` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `login` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `artykuly_pepper` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Tytul` varchar(255) DEFAULT NULL,
  `Link` varchar(255) DEFAULT NULL,
  `Cena_oryginalna` varchar(255) DEFAULT NULL,
  `Obnizka_w_procentach` varchar(255) DEFAULT NULL,
  `Cena_promocyjna` varchar(255) DEFAULT NULL,
  `Dostawa` varchar(255) DEFAULT NULL,
  `Zdjecie` varchar(255) DEFAULT NULL,
  `Opis` varchar(255) DEFAULT NULL,
  `uzytkownik_wystawiajacy` varchar(255) DEFAULT NULL,
  `ilosc_komentarzy` varchar(255) DEFAULT NULL,
  `ilosc_glosow_za_produktem` varchar(255) DEFAULT NULL,
  `Czy_promocja_trwa` varchar(255) DEFAULT NULL,
  `Opublikowano` varchar(255) DEFAULT NULL,
  `Kupony_promocyjne` varchar(255) DEFAULT NULL,
  `Firma_sprzedajaca` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user_configuration` (
  `id` int NOT NULL AUTO_INCREMENT,
  `olx` tinyint(1) DEFAULT NULL,
  `amazon` tinyint(1) DEFAULT NULL,
  `allegro` tinyint(1) DEFAULT NULL,
  `pepper` tinyint(1) DEFAULT NULL,
  `sms` tinyint(1) DEFAULT NULL,
  `discord` tinyint(1) DEFAULT NULL,
  `email` tinyint(1) DEFAULT NULL,
  `aktualna_oferta` tinyint(1) DEFAULT NULL,
  `godzina_maila` varchar(100) DEFAULT NULL,
  `repeat_after_specified_time` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users` (`user_id`),
  CONSTRAINT `fk_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELIMITER $$

CREATE TRIGGER after_user_create_save_user_empty_config
AFTER INSERT
ON users FOR EACH ROW
BEGIN
	DECLARE userId int;

    Select(SELECT id from users order by id desc limit 1) into userId;
	
	INSERT INTO user_configuration(olx, amazon, allegro, pepper, sms, discord, email, aktualna_oferta, godzina_maila, repeat_after_specified_time, user_id)
	VALUES( false, false,false,false,false, false, false, false, null, 0, userId);
END$$
DELIMITER ;