-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TRANSACTIONS_GIRO` (
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

    UNIQUE INDEX `TRANSACTIONS_GIRO_hash_key`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TRANSACTIONS_CREDITCARD` (
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

    UNIQUE INDEX `TRANSACTIONS_CREDITCARD_hash_key`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
