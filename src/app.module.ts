import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { BookModule } from './book/book.module';
import { PeminjamanBukuModule } from './peminjaman-buku/peminjaman-buku.module';
import { AuthModule } from './auth/auth.module';
import { PengembalianModule } from './pengembalian/pengembalian.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, StudentsModule, BookModule, PeminjamanBukuModule, AuthModule, PengembalianModule, ConfigModule.forRoot({
  isGlobal: true,
  envFilePath:
  process.env.NODE_ENV === 'production'
  ? '.env.production'
  : '.env',
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}33   
