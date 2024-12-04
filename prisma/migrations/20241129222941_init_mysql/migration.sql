/*
  Warnings:

  - You are about to alter the column `total` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `priceAtPurchase` on the `AccountItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `subtotal` on the `AccountItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Account` MODIFY `total` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `AccountItem` MODIFY `priceAtPurchase` DOUBLE NOT NULL,
    MODIFY `subtotal` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `price` DOUBLE NOT NULL;
