import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'james.bond@gmail.com', description: 'Email' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @ApiProperty({ example: 'James Bond', description: 'Username' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 'qwerty12345', description: 'Password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(24)
  readonly password: string;
}
