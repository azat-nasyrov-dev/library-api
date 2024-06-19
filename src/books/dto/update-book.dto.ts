import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly author?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly publicationDate?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly genres?: string[];
}
