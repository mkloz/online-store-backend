-- DropForeignKey
ALTER TABLE `cart_item` DROP FOREIGN KEY `cart_item_article_id_fkey`;

-- DropForeignKey
ALTER TABLE `cart_item` DROP FOREIGN KEY `cart_item_user_id_fkey`;

-- DropTable
DROP TABLE `cart_item`;

-- CreateIndex
CREATE INDEX `file_article_id_fkey` ON `file`(`article_id` ASC);

-- CreateIndex
CREATE INDEX `review_article_id_fkey` ON `review`(`article_id` ASC);

-- CreateIndex
CREATE INDEX `review_author_id_fkey` ON `review`(`author_id` ASC);

