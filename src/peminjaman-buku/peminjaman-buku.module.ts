import { Module } from '@nestjs/common';
import { PeminjamanBukuService } from './peminjaman-buku.service';
import { PeminjamanBukuController } from './peminjaman-buku.controller';

@Module({
  providers: [PeminjamanBukuService],
  controllers: [PeminjamanBukuController]
})
export class PeminjamanBukuModule {}
