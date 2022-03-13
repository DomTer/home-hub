/*
  Warnings:

  - You are about to drop the `TRANSACTIONS_CREDITCARD` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TRANSACTIONS_GIRO` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `TRANSACTIONS_CREDITCARD`;

-- DropTable
DROP TABLE `TRANSACTIONS_GIRO`;

-- CreateTable
CREATE TABLE `transactions_giro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `info` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `valuta` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `oppositeIban` VARCHAR(191) NOT NULL,
    `oppositeName` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `income` INTEGER NOT NULL,
    `raw` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `transactions_giro_hash_key`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions_creditcard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `text2` VARCHAR(191) NOT NULL,
    `bookingRef` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `valuta` VARCHAR(191) NOT NULL,
    `exchangeRate` INTEGER NOT NULL,
    `value` DOUBLE NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `income` INTEGER NOT NULL,
    `raw` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `transactions_creditcard_hash_key`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
