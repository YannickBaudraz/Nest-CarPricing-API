import { UnsignedMaxMillion } from '../../../validation/decorators/unsigned-max-million.decorator';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(new Date().getFullYear())
  @Transform(({ value }) => parseInt(value))
  year: number;

  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  latitude: number;

  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  longitude: number;

  @UnsignedMaxMillion()
  @Transform(({ value }) => parseInt(value))
  mileage: number;
}
