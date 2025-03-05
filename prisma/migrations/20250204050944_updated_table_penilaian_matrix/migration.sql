/*
  Warnings:

  - You are about to drop the column `id_bobot` on the `penilaian_matrix` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `penilaian_matrix` DROP FOREIGN KEY `penilaian_matrix_id_bobot_fkey`;

-- DropIndex
DROP INDEX `penilaian_matrix_id_bobot_fkey` ON `penilaian_matrix`;

-- AlterTable
ALTER TABLE `penilaian_matrix` DROP COLUMN `id_bobot`;

-- CreateTable
CREATE TABLE `detail_penilaian_matrix` (
    `id` VARCHAR(191) NOT NULL,
    `id_bobot` VARCHAR(191) NOT NULL,
    `id_penilaian_matrix` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detail_penilaian_matrix` ADD CONSTRAINT `detail_penilaian_matrix_id_bobot_fkey` FOREIGN KEY (`id_bobot`) REFERENCES `bobot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_penilaian_matrix` ADD CONSTRAINT `detail_penilaian_matrix_id_penilaian_matrix_fkey` FOREIGN KEY (`id_penilaian_matrix`) REFERENCES `penilaian_matrix`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
