import { applyDecorators } from '@nestjs/common';
import { IsNumber, Max, Min } from 'class-validator';

export function UnsignedMaxMillion() {
  return applyDecorators(IsNumber(), Min(0), Max(1_000_000));
}
