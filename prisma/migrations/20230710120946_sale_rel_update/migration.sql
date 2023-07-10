/*
  Warnings:

  - A unique constraint covering the columns `[article_id]` on the table `sale` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `sale_article_id_key` ON `sale`(`article_id`);
