/*
  Warnings:

  - Added the required column `password` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `student` ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('ADMIN', 'PETUGAS', 'MEMBER') NOT NULL DEFAULT 'MEMBER';

-- CreateTable
CREATE TABLE `Book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PeminjamanBuku` (
    `id_peminjaman` INTEGER NOT NULL AUTO_INCREMENT,
    `Id_student` INTEGER NOT NULL,
    `Id_book` INTEGER NOT NULL,
    `tanggalPinjam` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tanggalKembali` DATETIME(3) NULL,

    PRIMARY KEY (`id_peminjaman`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pengembalian` (
    `id_pengembalian` INTEGER NOT NULL AUTO_INCREMENT,
    `id_peminjaman` INTEGER NOT NULL,
    `tanggal_kembali` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `denda` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Pengembalian_id_peminjaman_key`(`id_peminjaman`),
    PRIMARY KEY (`id_pengembalian`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PeminjamanBuku` ADD CONSTRAINT `PeminjamanBuku_Id_student_fkey` FOREIGN KEY (`Id_student`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PeminjamanBuku` ADD CONSTRAINT `PeminjamanBuku_Id_book_fkey` FOREIGN KEY (`Id_book`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pengembalian` ADD CONSTRAINT `Pengembalian_id_peminjaman_fkey` FOREIGN KEY (`id_peminjaman`) REFERENCES `PeminjamanBuku`(`id_peminjaman`) ON DELETE RESTRICT ON UPDATE CASCADE;
