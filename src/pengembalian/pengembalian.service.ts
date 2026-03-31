import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PengembalianService {
  constructor(private prisma: PrismaService) {}

  // ==============================
  // POST - Kembalikan Buku
  // ==============================
  async kembalikanBuku(id_peminjaman: number) {
    const peminjaman = await this.prisma.peminjamanBuku.findUnique({
      where: { id_peminjaman },
    });

    if (!peminjaman) {
      throw new NotFoundException('Data peminjaman tidak ditemukan');
    }

    const sudahDikembalikan = await this.prisma.pengembalian.findUnique({
      where: { id_peminjaman },
    });

    if (sudahDikembalikan) {
      throw new BadRequestException('Buku sudah dikembalikan');
    }

    const now = new Date();
    let denda = 0;

    if (peminjaman.tanggalKembali && now > peminjaman.tanggalKembali) {
      const selisih =
        now.getTime() - peminjaman.tanggalKembali.getTime();
      const hari = Math.ceil(selisih / (1000 * 60 * 60 * 24));
      denda = hari * 1000;
    }

    return this.prisma.pengembalian.create({
      data: {
        id_peminjaman,
        tanggal_kembali: now,
        denda,
      },
    });
  }

  // ==============================
  // GET ALL
  // ==============================
  async getAllPengembalian() {
    return this.prisma.pengembalian.findMany({
      include: {
        peminjamanBuku: true,
      },
    });
  }

  // ==============================
  // GET BY ID PEMINJAMAN
  // ==============================
  async getPengembalianById(id_peminjaman: number) {
    const data = await this.prisma.pengembalian.findUnique({
      where: { id_peminjaman },
      include: {
        peminjamanBuku: true,
      },
    });

    if (!data) {
      throw new NotFoundException('Data pengembalian tidak ditemukan');
    }

    return data;
  }
  // GET PENGEMBALIAN BY DATE
async getPengembalianByDate(tanggal: string) {
  const start = new Date(tanggal);
  start.setHours(0, 0, 0, 0);

  const end = new Date(tanggal);
  end.setHours(23, 59, 59, 999);

  return this.prisma.pengembalian.findMany({
    where: {
      tanggal_kembali: {
        gte: start,
        lte: end,
      },
    },
    include: {
      peminjamanBuku: true,
    },
  });
}
}
