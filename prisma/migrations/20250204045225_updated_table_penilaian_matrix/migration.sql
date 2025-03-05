/*
  Warnings:

  - Added the required column `id_bobot` to the `penilaian_matrix` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `penilaian_matrix` ADD COLUMN `id_bobot` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `penilaian_matrix` ADD CONSTRAINT `penilaian_matrix_id_bobot_fkey` FOREIGN KEY (`id_bobot`) REFERENCES `bobot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
