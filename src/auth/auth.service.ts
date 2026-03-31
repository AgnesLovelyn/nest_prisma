import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(nis: string, password: string) {
    const student = await this.prisma.student.findUnique({
      where: { nis },
    });

    if (!student) {
      throw new UnauthorizedException('NIS tidak ditemukan');
    }

    const passwordValid = await bcrypt.compare(password,student.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Password salah');
    }

    const payload = {
      sub: student.id,
      nis: student.nis,
      name: student.name,
      role: student.role,
    };

    return {
      message: 'Login berhasil',
      access_token: this.jwtService.sign(payload),
    };
  }
}
