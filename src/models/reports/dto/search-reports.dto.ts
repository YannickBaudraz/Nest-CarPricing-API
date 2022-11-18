import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchReportsDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  userId?: number;
}
