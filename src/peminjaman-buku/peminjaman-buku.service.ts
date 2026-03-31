 import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PeminjamanBukuService {
  constructor(private readonly prisma: PrismaService) {}

  async pinjamBuku(nis: string, Id_book: number) {
    // ===============================
    // Cek student
    // ===============================
    const student = await this.prisma.student.findUnique({
      where: { nis },
    });

    if (!student) {
      throw new NotFoundException({
        status: false,
        message: 'Student dengan NIS tersebut tidak ditemukan',
      });
    }

    // ===============================
    // Cek book
    // ===============================
    const book = await this.prisma.book.findUnique({
      where: { id: Id_book },
    });

    if (!book) {
      throw new NotFoundException({
        status: false,
        message: 'Book tidak ditemukan',
      });
    }

    // ===============================
    // CEK STATUS BUKU (INI YANG PENTING)
    // ===============================
    const masihDipinjam = await this.prisma.peminjamanBuku.findFirst({
      where: {
        Id_book,
        pengembalian: null, // belum dikembalikan
      },
    });

    if (masihDipinjam) {
      throw new BadRequestException({
        status: false,
        message: 'Buku masih dipinjam, tidak bisa dipinjam',
        data: {
          id_buku: book.id,
          title: book.title,
          status: 'sedang dipinjam',
        },
      });
    }

    // ===============================
    // Buat tanggal pinjam & kembali
    // ===============================
    const tanggalPinjam = new Date();
    const tanggalKembali = new Date(tanggalPinjam);
    tanggalKembali.setDate(tanggalPinjam.getDate() + 7);

    const peminjaman = await this.prisma.peminjamanBuku.create({
      data: {
        Id_student: student.id,
        Id_book,
        tanggalPinjam,
        tanggalKembali,
      },
      include: {
        student: true,
        book: true,
      },
    });

    // ===============================
    // RESPONSE RAPI
    // ===============================
    return {
      status: true,
      message: 'Buku berhasil dipinjam',
      data: {
        id_peminjaman: peminjaman.id_peminjaman,
        student: peminjaman.student.name,
        book: peminjaman.book.title,
        tanggal_pinjam: peminjaman.tanggalPinjam,
        tanggal_kembali: peminjaman.tanggalKembali,
        status_buku: 'sedang dipinjam',
      },
    };
  }
  async findAll() {
  return this.prisma.peminjamanBuku.findMany({
    include: {
      student: true,
      book: true,
    },
  });
}
async kembalikanBuku(id: number) {
  const peminjaman = await this.prisma.peminjamanBuku.findUnique({
    where: { id_peminjaman: id },
  });

  if (!peminjaman) {
    throw new NotFoundException('Data peminjaman tidak ditemukan');
  }

  return this.prisma.peminjamanBuku.update({
  where: { id_peminjaman: id },
  data: {
    pengembalian: {
      create: {
        tanggal_kembali: new Date(),
      },
    },
  },
});
}
async getByDate(date: string) {
  const targetDate = new Date(date);

  return this.prisma.peminjamanBuku.findMany({
    where: {
      tanggalPinjam: {
        gte: new Date(targetDate.setHours(0, 0, 0, 0)),
        lte: new Date(targetDate.setHours(23, 59, 59, 999)),
      },
    },
    include: {
      student: true,
      book: true,
    },
  });
}
async cekStatusBuku(Id_book: number) {
  const book = await this.prisma.book.findUnique({
    where: { id: Id_book },
  });

  if (!book) {
    throw new NotFoundException('Book tidak ditemukan');
  }

  const masihDipinjam = await this.prisma.peminjamanBuku.findFirst({
    where: {
      Id_book,
      pengembalian: null,
    },
  });

  return {
    id_buku: book.id,
    title: book.title,
    status: masihDipinjam ? 'sedang dipinjam' : 'tersedia',
  };
}
async getById(id: number) {
  const data = await this.prisma.peminjamanBuku.findUnique({
    where: { id_peminjaman: id },
    include: {
      student: true,
      book: true,
    },
  });

  if (!data) {
    throw new NotFoundException('Data peminjaman tidak ditemukan');
  }

  return data;
}
}