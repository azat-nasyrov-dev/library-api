import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
