/*
  Warnings:

  - Added the required column `id_kriteria` to the `penilaian_matrix` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `penilaian_matrix` ADD COLUMN `id_kriteria` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `penilaian_matrix` ADD CONSTRAINT `penilaian_matrix_id_kriteria_fkey` FOREIGN KEY (`id_kriteria`) REFERENCES `kriteria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
