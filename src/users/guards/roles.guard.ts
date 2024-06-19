import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users.service';
import { UserRole } from '../entities/user.entity';
import { ExpressRequestInterface } from '../../types/express-request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<UserRole[]>('roles', ctx.getHandler());

    if (!roles) {
      return true;
    }

    const request = ctx.switchToHttp().getRequest<ExpressRequestInterface>();
    const user = request.user;

    return roles.some((role) => (user.roles & role) === role);
  }
}
