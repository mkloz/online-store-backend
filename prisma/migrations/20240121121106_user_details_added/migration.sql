-- AlterTable
ALTER TABLE `user` ADD COLUMN `address_id` INTEGER NULL,
    ADD COLUMN `phone_number` CHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
