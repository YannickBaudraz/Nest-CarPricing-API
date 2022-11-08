import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { UnsignedMaxMillion } from '../../validation/decorators/unsigned-max-million.decorator';

export class CreateReportDto {
  @UnsignedMaxMillion()
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(new Date().getFullYear())
  year: number;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;

  @UnsignedMaxMillion()
  mileage: number;
}
