import { UserRole } from '../entities/user.entity';
import { SetMetadata } from '@nestjs/common';

export const RolesDecorator = (...roles: UserRole[]) => SetMetadata('roles', roles);
