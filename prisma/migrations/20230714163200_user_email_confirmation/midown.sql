-- AlterTable
ALTER TABLE `User` DROP COLUMN `is_email_confirmed`;

-- CreateIndex
CREATE INDEX `file_article_id_fkey` ON `file`(`article_id` ASC);

-- CreateIndex
CREATE INDEX `review_article_id_fkey` ON `review`(`article_id` ASC);

-- CreateIndex
CREATE INDEX `review_author_id_fkey` ON `review`(`author_id` ASC);

-- CreateIndex
CREATE INDEX `cart_item_article_id_fkey` ON `cart_item`(`article_id` ASC);

-- CreateIndex
CREATE INDEX `cart_item_user_id_fkey` ON `cart_item`(`user_id` ASC);

