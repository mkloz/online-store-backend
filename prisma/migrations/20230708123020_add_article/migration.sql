-- CreateTable
CREATE TABLE `article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` FLOAT NOT NULL,
    `discription` VARCHAR(3000) NOT NULL,
    `name` CHAR(255)  NOT NULL UNIQUE,
    `rating` FLOAT NULL,
    `in_stock` BOOLEAN NULL,
    `count` INTEGER NOT NULL DEFAULT 1,
    `views` INTEGER NOT NULL DEFAULT 0,
    `characteristic` VARCHAR(3000) NOT NULL,
    `is_previously_used` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


CREATE TRIGGER update_in_stock_insert BEFORE INSERT ON article
FOR EACH ROW
BEGIN
  IF NEW.count = 0 THEN
    SET NEW.in_stock = FALSE;
  ELSE
    SET NEW.in_stock = TRUE;
  END IF;
END;

CREATE TRIGGER update_in_stock_update BEFORE UPDATE ON article
FOR EACH ROW
BEGIN
  IF NEW.count = 0 THEN
    SET NEW.in_stock = FALSE;
  ELSE
    SET NEW.in_stock = TRUE;
  END IF;
END;

ALTER TABLE `article` AUTO_INCREMENT=3000;
ALTER TABLE `article` RENAME INDEX `name` TO `article_name_key`;
