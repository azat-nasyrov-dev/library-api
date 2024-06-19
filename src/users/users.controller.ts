import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { UserEntity, UserRole } from './entities/user.entity';
import { TokenInterface } from './types/token.interface';
import { UserDecorator } from './decorators/user.decorator';
import { UserResponseInterface } from './types/user-response.interface';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { RolesDecorator } from './decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  public async mustBeAuthenticated(
    @UserDecorator() user: UserEntity,
  ): Promise<UserResponseInterface> {
    return this.usersService.buildUserResponse(user);
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async register(@Body() registerDto: RegisterDto): Promise<UserResponseInterface> {
    const user = await this.usersService.register(registerDto);
    return this.usersService.buildUserResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(200)
  public async login(@Body() loginDto: LoginDto): Promise<TokenInterface> {
    return await this.usersService.login(loginDto);
  }

  @Put(':id/role')
  @UseGuards(AuthGuard, RolesGuard)
  @RolesDecorator(UserRole.ADMIN)
  public async changeUserRole(@Param('id') id: string, @Body('role') role: number) {
    return await this.usersService.changeUserRole(id, role);
  }
}
