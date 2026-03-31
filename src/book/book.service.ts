import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBookDto) {
    return this.prisma.book.create({ 
      data: dto, });
  }

  async findAll() {
    return this.prisma.book.findMany();
  }

  async findOne(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.book.delete({
      where: { id },
    });
  }

  async searchByTitle(title: string) {
  return this.prisma.book.findMany({
    where: {
      title: {
        contains: title,
      },
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
}
