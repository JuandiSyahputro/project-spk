/*
  Warnings:

  - You are about to drop the column `nilai_kriteria_etika` on the `penilaian_matrix` table. All the data in the column will be lost.
  - You are about to drop the column `nilai_kriteria_kedisiplinan` on the `penilaian_matrix` table. All the data in the column will be lost.
  - You are about to drop the column `nilai_kriteria_kinerja` on the `penilaian_matrix` table. All the data in the column will be lost.
  - You are about to drop the column `nilai_kriteria_komunikasi` on the `penilaian_matrix` table. All the data in the column will be lost.
  - You are about to drop the column `nilai_kriteria_kreativitas` on the `penilaian_matrix` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `penilaian_matrix` DROP COLUMN `nilai_kriteria_etika`,
    DROP COLUMN `nilai_kriteria_kedisiplinan`,
    DROP COLUMN `nilai_kriteria_kinerja`,
    DROP COLUMN `nilai_kriteria_komunikasi`,
    DROP COLUMN `nilai_kriteria_kreativitas`,
    ADD COLUMN `etika` DOUBLE NULL,
    ADD COLUMN `kedisiplinan` DOUBLE NULL,
    ADD COLUMN `kinerja` DOUBLE NULL,
    ADD COLUMN `komunikasi` DOUBLE NULL,
    ADD COLUMN `kreativitas` DOUBLE NULL;
