import { IsEmail, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchUsersDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
