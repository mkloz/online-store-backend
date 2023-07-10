-- CreateTable
CREATE TABLE `article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` CHAR(40) NOT NULL,
    `price` INTEGER NOT NULL,
    `discription` VARCHAR(3000) NOT NULL,
    `name` CHAR(255)  NOT NULL UNIQUE,
    `count` INTEGER NOT NULL DEFAULT 1,
    `age_group` CHAR(100) NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,
    `gender` CHAR(40) NOT NULL,
    `is_previously_used` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `article` RENAME INDEX `name` TO `article_name_key`;
