/*
  Warnings:

  - Added the required column `nama_karyawan` to the `karyawan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `karyawan` ADD COLUMN `nama_karyawan` VARCHAR(191) NOT NULL;
