-- DropForeignKey
ALTER TABLE `sale` DROP FOREIGN KEY `sale_article_id_fkey`;

-- DropTable
DROP TABLE `sale`;

-- CreateIndex
CREATE INDEX `file_article_id_fkey` ON `file`(`article_id` ASC);

