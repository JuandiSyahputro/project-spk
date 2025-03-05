/*
  Warnings:

  - You are about to drop the `detail_penilaian` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `penilaian` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `detail_penilaian` DROP FOREIGN KEY `detail_penilaian_id_kriteria_fkey`;

-- DropForeignKey
ALTER TABLE `detail_penilaian` DROP FOREIGN KEY `detail_penilaian_id_penilaian_fkey`;

-- DropForeignKey
ALTER TABLE `penilaian` DROP FOREIGN KEY `penilaian_id_bobot_fkey`;

-- DropForeignKey
ALTER TABLE `penilaian` DROP FOREIGN KEY `penilaian_id_karyawan_fkey`;

-- DropForeignKey
ALTER TABLE `penilaian` DROP FOREIGN KEY `penilaian_user_id_fkey`;

-- DropTable
DROP TABLE `detail_penilaian`;

-- DropTable
DROP TABLE `penilaian`;

-- CreateTable
CREATE TABLE `penilaian_matrix` (
    `id` VARCHAR(191) NOT NULL,
    `id_karyawan` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `id_bobot` VARCHAR(191) NOT NULL,
    `nilai_kriteria_komunikasi` DOUBLE NULL,
    `nilai_kriteria_etika` DOUBLE NULL,
    `nilai_kriteria_kinerja` DOUBLE NULL,
    `nilai_kriteria_kreativitas` DOUBLE NULL,
    `nilai_kriteria_kedisiplinan` DOUBLE NULL,
    `nilai_penilaian_matrix` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `penilaian_matrix` ADD CONSTRAINT `penilaian_matrix_id_karyawan_fkey` FOREIGN KEY (`id_karyawan`) REFERENCES `karyawan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penilaian_matrix` ADD CONSTRAINT `penilaian_matrix_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penilaian_matrix` ADD CONSTRAINT `penilaian_matrix_id_bobot_fkey` FOREIGN KEY (`id_bobot`) REFERENCES `bobot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
