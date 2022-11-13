import { Expose } from 'class-transformer';

export class EstimateDto {
  @Expose()
  price: number;
}
