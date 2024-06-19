import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({ example: 'Clean Code', description: 'Title' })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({ example: 'Robert Martin', description: 'Author' })
  @IsOptional()
  @IsString()
  readonly author?: string;

  @ApiProperty({ example: '2024-07-20', description: 'Date of publication' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly publicationDate?: Date;

  @ApiProperty({ example: 'Programmer library', description: 'Genre' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly genres?: string[];
}
