import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-students.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateStudentDto) {
    return this.prisma.student.create({
      data: {
        nis: dto.nis,
        name: dto.name,
        email: dto.email,
        kelas: dto.kelas,
        jurusan: dto.jurusan,
      },
    });
  }

  async findAll() {
    return this.prisma.student.findMany();
  }

  async findOne(id: number) {
    return this.prisma.student.findUnique({
      where: { id },
    });
  }

  async findByNis(nis: string) {
    const student = await this.prisma.student.findUnique({ where: { nis } });
    if (!student) {
      throw new NotFoundException('nis student not found');
    }
    return student;
  }

  async findByName(name: string) {
    return this.prisma.student.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async update(id: number, dto: UpdateStudentDto) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) {
      throw new NotFoundException('student not found');
    }

    return this.prisma.student.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.student.delete({
      where: { id },
    });
  }
}