-- CreateTable
CREATE TABLE `sale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` VARCHAR(1000) NOT NULL,
    `old_prise` INTEGER NOT NULL,
    `new_prise` INTEGER NOT NULL,
    `active_till` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `article_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sale` ADD CONSTRAINT `sale_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
