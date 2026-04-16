import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { PeminjamanBukuService } from './peminjaman-buku.service';
import { UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { CreatePeminjamanBukuDto } from './dto/create-PeminjamanBuku.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Peminjaman')
@ApiBearerAuth()
@Controller('peminjaman-buku')
export class PeminjamanBukuController {
  constructor(private readonly service: PeminjamanBukuService) {}

  // POST /peminjaman-buku (pakai NIS)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MEMBER)
  @Post()
  @ApiOperation({ summary: 'Menambahkan buku (ADMIN dan MEMBER)' })
  pinjamBuku(@Body() dto: CreatePeminjamanBukuDto) {
    return this.service.pinjamBuku(dto.nis, dto.Id_book);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PETUGAS')
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PETUGAS')
  @Put(':id')
  kembalikanBuku(@Param('id') id: string) {
    return this.service.kembalikanBuku(Number(id));
  }

  @Get('date/:date')
  getByDate(@Param('date') date: string) {
    return this.service.getByDate(date);
  }
  @UseGuards(JwtAuthGuard)
  @Get('status/:id')
  cekStatus(@Param('id') id: string) {
    return this.service.cekStatusBuku(Number(id));
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PETUGAS')
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getById(Number(id));
  }
}
