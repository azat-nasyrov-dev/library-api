import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly publicationDate: Date;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly genres: string[];
}
