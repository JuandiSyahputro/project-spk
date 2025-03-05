/*
  Warnings:

  - Made the column `isPenilaian` on table `karyawan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `karyawan` MODIFY `isPenilaian` BOOLEAN NOT NULL DEFAULT false;
