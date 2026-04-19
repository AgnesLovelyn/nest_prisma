import { CanActivate, ExecutionContext, Injectable,ForbiddenException } from
'@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
constructor(private reflector: Reflector) {}

canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

console.log('Required roles:', requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

console.log('User from token:', user);

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        'Ups! kamu tidak bisa mengakses halaman ini',
      );
    }

    return true;
  }
}