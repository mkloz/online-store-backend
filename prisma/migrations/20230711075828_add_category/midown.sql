DROP INDEX `category_name_key` ON `category`;
-- DropForeignKey
ALTER TABLE `__article_category` DROP FOREIGN KEY `__article_category_A_fkey`;

-- DropForeignKey
ALTER TABLE `__article_category` DROP FOREIGN KEY `__article_category_B_fkey`;

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `__article_category`;

-- CreateIndex
CREATE INDEX `file_article_id_fkey` ON `file`(`article_id` ASC);

-- CreateIndex
CREATE INDEX `review_article_id_fkey` ON `review`(`article_id` ASC);

