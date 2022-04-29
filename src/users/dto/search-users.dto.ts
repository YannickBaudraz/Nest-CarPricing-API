import { IsEmail, IsNumber, IsOptional } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class SearchUsersDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Expose({ name: 'take', toPlainOnly: true })
  limit?: number;
}
