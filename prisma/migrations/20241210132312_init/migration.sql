-- AlterTable
ALTER TABLE `barberstore` ADD COLUMN `paymentType` ENUM('Cash', 'Card', 'both') NOT NULL DEFAULT 'Cash';

-- AlterTable
ALTER TABLE `booking` MODIFY `paymentType` ENUM('Cash', 'Card', 'both') NOT NULL DEFAULT 'Cash';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `ban` BOOLEAN NOT NULL DEFAULT false;
