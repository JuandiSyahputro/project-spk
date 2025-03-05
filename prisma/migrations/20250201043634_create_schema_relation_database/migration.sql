-- CreateTable
CREATE TABLE `kriteria` (
    `id` VARCHAR(191) NOT NULL,
    `nama_kriteria` VARCHAR(191) NOT NULL,
    `type` ENUM('BENEFIT', 'COST') NOT NULL DEFAULT 'BENEFIT',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bobot` (
    `id` VARCHAR(191) NOT NULL,
    `nilai_bobot` DOUBLE NOT NULL,
    `id_kriteria` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `karyawan` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `no_telp` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penilaian` (
    `id` VARCHAR(191) NOT NULL,
    `id_karyawan` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `id_bobot` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_penilaian` (
    `id` VARCHAR(191) NOT NULL,
    `id_penilaian` VARCHAR(191) NOT NULL,
    `id_kriteria` VARCHAR(191) NOT NULL,
    `nilai` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bobot` ADD CONSTRAINT `bobot_id_kriteria_fkey` FOREIGN KEY (`id_kriteria`) REFERENCES `kriteria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `karyawan` ADD CONSTRAINT `karyawan_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penilaian` ADD CONSTRAINT `penilaian_id_karyawan_fkey` FOREIGN KEY (`id_karyawan`) REFERENCES `karyawan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penilaian` ADD CONSTRAINT `penilaian_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `penilaian` ADD CONSTRAINT `penilaian_id_bobot_fkey` FOREIGN KEY (`id_bobot`) REFERENCES `bobot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_penilaian` ADD CONSTRAINT `detail_penilaian_id_penilaian_fkey` FOREIGN KEY (`id_penilaian`) REFERENCES `penilaian`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_penilaian` ADD CONSTRAINT `detail_penilaian_id_kriteria_fkey` FOREIGN KEY (`id_kriteria`) REFERENCES `kriteria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
