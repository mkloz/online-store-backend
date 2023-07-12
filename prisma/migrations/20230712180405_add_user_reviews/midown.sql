-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_author_id_fkey`;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `author_id`;

-- CreateIndex
CREATE INDEX `file_article_id_fkey` ON `file`(`article_id` ASC);

-- CreateIndex
CREATE INDEX `review_article_id_fkey` ON `review`(`article_id` ASC);

