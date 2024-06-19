import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'Clean Code', description: 'Title' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'Robert Martin', description: 'Author' })
  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @ApiProperty({ example: '2024-07-20', description: 'Date of publication' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly publicationDate: Date;

  @ApiProperty({ example: 'Programmer library', description: 'Genre' })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly genres: string[];
}
