/*
  Warnings:

  - You are about to alter the column `body` on the `Blog` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Blog` MODIFY `body` JSON NOT NULL;
