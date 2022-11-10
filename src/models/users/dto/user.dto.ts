import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  isAdmin: boolean;

  @Expose()
  email: string;
}
