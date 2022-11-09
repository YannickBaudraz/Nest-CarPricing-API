import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthUserDto } from './auth-user.dto';
import { User } from '../users/user.entity';
import { InvalidCredentialsException } from './invalid-credentials.exception';
import { EntityNotFoundError } from 'typeorm';
import { PasswordHelper } from '../helper/password.helper';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(authDto: AuthUserDto): Promise<User> {
    await this.authorizeRegistration(authDto);
    authDto.password = await PasswordHelper.hash(authDto.password);
    return await this.usersService.create(authDto);
  }

  async authenticate(createUserDto: AuthUserDto): Promise<User> {
    let user: User;

    try {
      user = await this.usersService.findOneByEmail(createUserDto.email);
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        throw new InvalidCredentialsException();
      throw error;
    }

    await PasswordHelper.validate(createUserDto.password, user.password);

    return user;
  }

  private async authorizeRegistration(authDto: AuthUserDto) {
    if (await this.usersService.isEmailInUse(authDto.email))
      throw new ConflictException('Email already in use');
  }
}
