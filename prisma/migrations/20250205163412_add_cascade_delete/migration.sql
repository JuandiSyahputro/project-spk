-- DropForeignKey
ALTER TABLE `detail_penilaian_matrix` DROP FOREIGN KEY `detail_penilaian_matrix_id_penilaian_matrix_fkey`;

-- DropIndex
DROP INDEX `detail_penilaian_matrix_id_penilaian_matrix_fkey` ON `detail_penilaian_matrix`;

-- AddForeignKey
ALTER TABLE `detail_penilaian_matrix` ADD CONSTRAINT `detail_penilaian_matrix_id_penilaian_matrix_fkey` FOREIGN KEY (`id_penilaian_matrix`) REFERENCES `penilaian_matrix`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
