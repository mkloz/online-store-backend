-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_article_id_fkey`;

-- DropTable
DROP TABLE `review`;

-- CreateIndex
CREATE INDEX `file_article_id_fkey` ON `file`(`article_id` ASC);

