/*
  Warnings:

  - You are about to drop the column `id_bobot` on the `penilaian_matrix` table. All the data in the column will be lost.
  - You are about to drop the column `id_kriteria` on the `penilaian_matrix` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `penilaian_matrix` DROP FOREIGN KEY `penilaian_matrix_id_bobot_fkey`;

-- DropForeignKey
ALTER TABLE `penilaian_matrix` DROP FOREIGN KEY `penilaian_matrix_id_kriteria_fkey`;

-- DropIndex
DROP INDEX `penilaian_matrix_id_bobot_fkey` ON `penilaian_matrix`;

-- DropIndex
DROP INDEX `penilaian_matrix_id_kriteria_fkey` ON `penilaian_matrix`;

-- AlterTable
ALTER TABLE `penilaian_matrix` DROP COLUMN `id_bobot`,
    DROP COLUMN `id_kriteria`;
