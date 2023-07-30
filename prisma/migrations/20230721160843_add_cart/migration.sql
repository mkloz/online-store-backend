/*
  Warnings:

  - You are about to drop the column `user_id` on the `cart_item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cart_item` DROP FOREIGN KEY `cart_item_user_id_fkey`;

-- AlterTable
ALTER TABLE `cart_item` DROP COLUMN `user_id`,
    ADD COLUMN `cart_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `cart_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cart_item` ADD CONSTRAINT `cart_item_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- CREATE FUNCTION calculate_subtotal_price(articleId INT, quantity INT)
-- RETURNS FLOAT
-- DETERMINISTIC
-- BEGIN
--   RETURN ((SELECT price FROM article WHERE id = articleId) * quantity);
-- END;

-- CREATE FUNCTION calculate_total_price(cartId INT)
-- RETURNS FLOAT
-- DETERMINISTIC
-- BEGIN
--   RETURN (SELECT SUM(subtotal_price) FROM cart_item WHERE cart_id = cartId);
-- END;


-- CREATE TRIGGER update_cart_item_subtotal_price_after_article_update
-- AFTER UPDATE ON article
-- FOR EACH ROW
-- BEGIN
--   UPDATE cart_item
--   SET subtotal_price = calculate_subtotal_price(NEW.id, quantity)
--   WHERE article_id = NEW.id;
-- END;

-- CREATE TRIGGER update_cart_total_price_before_item_insert
-- BEFORE INSERT ON cart_item
-- FOR EACH ROW
--   SET NEW.subtotal_price = calculate_subtotal_price(NEW.article_id, NEW.quantity);

-- CREATE TRIGGER update_cart_total_price_after_item_insert
-- AFTER INSERT ON cart_item
-- FOR EACH ROW
-- BEGIN
--   UPDATE cart
--   SET total_price = calculate_total_price(NEW.cart_id)
--   WHERE id = NEW.cart_id;
-- END;

-- CREATE TRIGGER update_cart_item_quantity_before_update
-- BEFORE UPDATE ON cart_item
-- FOR EACH ROW
--   SET NEW.subtotal_price = calculate_subtotal_price(NEW.article_id, NEW.quantity);

-- CREATE TRIGGER update_cart_item_quantity_after_update
-- AFTER UPDATE ON cart_item
-- FOR EACH ROW
-- BEGIN
--   -- Update total_price of the Cart
--   UPDATE cart
--   SET total_price = calculate_total_price(NEW.cart_id)
--   WHERE id = NEW.cart_id;
-- END;

-- CREATE TRIGGER update_total_price_after_delete
-- AFTER DELETE ON cart_item
-- FOR EACH ROW
-- BEGIN
--   UPDATE cart
--   SET total_price = calculate_total_price(OLD.cart_id)
--   WHERE id = OLD.cart_id;
-- END;
