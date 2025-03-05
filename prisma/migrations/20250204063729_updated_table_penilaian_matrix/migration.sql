/*
  Warnings:

  - Added the required column `id_kriteria` to the `detail_penilaian_matrix` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detail_penilaian_matrix` ADD COLUMN `id_kriteria` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `detail_penilaian_matrix` ADD CONSTRAINT `detail_penilaian_matrix_id_kriteria_fkey` FOREIGN KEY (`id_kriteria`) REFERENCES `kriteria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
