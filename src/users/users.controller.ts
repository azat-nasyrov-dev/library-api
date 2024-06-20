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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get the current authenticated user' })
  @ApiResponse({ status: 200, description: 'The authenticated user' })
  @Get('me')
  @UseGuards(AuthGuard)
  public async mustBeAuthenticated(
    @UserDecorator() user: UserEntity,
  ): Promise<UserResponseInterface> {
    return this.usersService.buildUserResponse(user);
  }

  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully registered' })
  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async register(@Body() registerDto: RegisterDto): Promise<UserResponseInterface> {
    const user = await this.usersService.register(registerDto);
    return this.usersService.buildUserResponse(user);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully login' })
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(200)
  public async login(@Body() loginDto: LoginDto): Promise<TokenInterface> {
    return await this.usersService.login(loginDto);
  }

  @ApiOperation({ summary: 'Change the user role' })
  @ApiResponse({ status: 200, description: 'The user role has been successfully changed' })
  @Put(':id/role')
  @UseGuards(AuthGuard, RolesGuard)
  @RolesDecorator(UserRole.ADMIN)
  public async changeUserRole(@Param('id') id: string, @Body('role') role: number): Promise<UserEntity> {
    return await this.usersService.changeUserRole(id, role);
  }
}
