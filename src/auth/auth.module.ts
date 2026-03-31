import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
useFactory: () => ({
secret: process.env.JWT_SECRET,
signOptions: { expiresIn: '1h' },
}),
}),
    JwtModule.register({
  secret: 'secretKey', 
  signOptions: { expiresIn: '1h' },
})
  ],
  controllers: [AuthController], 
  providers: [AuthService, JwtStrategy], 
})
export class AuthModule {}