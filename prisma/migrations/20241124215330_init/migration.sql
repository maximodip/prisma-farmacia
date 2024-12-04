/*
  Warnings:

  - Made the column `distributor` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `distributor` VARCHAR(191) NOT NULL;
