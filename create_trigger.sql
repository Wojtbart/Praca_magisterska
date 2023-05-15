
DELIMITER $$

CREATE TRIGGER after_user_create_save_user_empty_config
AFTER INSERT
ON users FOR EACH ROW
BEGIN
	DECLARE userId int;

   -- Find username of person performing the INSERT into table
    Select(SELECT id from users order by id desc limit 1) into userId;
	INSERT INTO user_configuration(olx, amazon, allegro, pepper, sms, discord, email, aktualna_oferta, godzina_maila, repeat_after_specified_time, user_id)
	VALUES( false, false,false,false,false, false, false, false, null, 0, userId);
END$$
DELIMITER ;