import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { sign } from 'jsonwebtoken';
import { TokenInterface } from './types/token.interface';
import { UserResponseInterface } from './types/user-response.interface';
import { MailService } from './mail.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  public async register(registerDto: RegisterDto): Promise<UserEntity> {
    try {
      const users = await this.userRepository.find({ where: { email: registerDto.email } });

      if (users.length) {
        throw new HttpException('This user has already been registered', HttpStatus.BAD_REQUEST);
      }

      const salt = await genSalt(Number(this.configService.get<number>('SALT_ROUNDS')));
      const passwordHash = await hash(registerDto.password, salt);

      const newUser = this.userRepository.create({
        email: registerDto.email,
        username: registerDto.username,
        passwordHash,
        roles: UserRole.ADMIN,
      });

      await this.userRepository.save(newUser);

      await this.mailService.sendMail({
        to: newUser.email,
        subject: 'Confirm your email',
      });

      return newUser;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async login(loginDto: LoginDto): Promise<TokenInterface> {
    const user = await this.validateUser(loginDto);
    const token = this.generateJwt(user);

    return { accessToken: token };
  }

  public async validateUser(loginDto: LoginDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: { username: loginDto.username },
        select: ['id', 'email', 'username', 'passwordHash', 'roles'],
      });

      if (!user) {
        throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
      }

      const isValidPassword = await compare(loginDto.password, user.passwordHash);

      if (!isValidPassword) {
        throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
      }

      delete user.passwordHash;
      return user;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException('Credentials are not valid', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  public findUserById(id: string): Promise<UserEntity> {
    // TODO: THIS IS A HELPER METHOD IT IS USED IN THE MIDDLEWARE
    try {
      return this.userRepository.findOne({ where: { id } });
    } catch (err) {
      this.logger.error(err);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  public async changeUserRole(id: string, newRole: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.roles = newRole;
    return await this.userRepository.save(user);
  }

  public async hasRole(user: UserEntity, role: number): Promise<boolean> {
    return (user.roles & role) === role;
  }

  private generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        roles: user.roles,
      },
      this.configService.get<string>('JWT_SECRET'),
    );
  }

  public buildUserResponse(user: UserEntity): UserResponseInterface {
    const { id, email, username, roles, books } = user;
    return {
      user: {
        id,
        email,
        username,
        roles,
        books,
        token: this.generateJwt(user),
      },
    };
  }
}
