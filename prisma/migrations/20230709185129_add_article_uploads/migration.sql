-- CreateTable
CREATE TABLE `article_photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` CHAR(255) NOT NULL,
    `url` CHAR(255) NOT NULL,
    `article_id` INTEGER  NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `article_photo` ADD CONSTRAINT `article_photo_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `article_photo` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
