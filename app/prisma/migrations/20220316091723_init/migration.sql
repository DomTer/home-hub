/*
  Warnings:

  - You are about to alter the column `date` on the `transactions_creditcard` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `valuta` on the `transactions_creditcard` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `date` on the `transactions_giro` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `valuta` on the `transactions_giro` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `transactions_creditcard` MODIFY `date` DATETIME(3) NOT NULL,
    MODIFY `valuta` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `transactions_giro` MODIFY `date` DATETIME(3) NOT NULL,
    MODIFY `valuta` DATETIME(3) NOT NULL;
