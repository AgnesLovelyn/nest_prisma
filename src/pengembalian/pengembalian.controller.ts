
import { Controller, Post, Param, Get, UseGuards } from '@nestjs/common';
import { PengembalianService } from './pengembalian.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
@Controller('pengembalian')
export class PengembalianController {
  constructor(private readonly service: PengembalianService) {}

  // GET BY DATE (HARUS DI ATAS)
  @Get('by-date/:tanggal')
  getByDate(@Param('tanggal') tanggal: string) {
    return this.service.getPengembalianByDate(tanggal);
  }

  // GET ALL
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PETUGAS')
  @Get()
  findAll() {
    return this.service.getAllPengembalian();
  }

  // GET BY ID
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PETUGAS')
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getPengembalianById(Number(id));
  }

  // POST
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PETUGAS')
  @Post(':id')
  kembalikan(@Param('id') id: string) {
    return this.service.kembalikanBuku(Number(id));
  }
}