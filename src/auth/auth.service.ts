import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthUserDto } from './auth-user.dto';
import * as Bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { InvalidCredentialsException } from './invalid-credentials.exception';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  private static hashPassword(password: string): Promise<string> {
    const rounds = 10;
    return Bcrypt.hash(password, rounds);
  }

  private static async validatePassword(password: string, hash: string) {
    if (!(await AuthService.isValidPassword(password, hash)))
      throw new InvalidCredentialsException();
  }

  private static async isValidPassword(password: string, hash: string) {
    return await Bcrypt.compare(password, hash);
  }

  async register(authDto: AuthUserDto): Promise<any> {
    await this.authorizeRegistration(authDto);
    authDto.password = await AuthService.hashPassword(authDto.password);
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

    await AuthService.validatePassword(createUserDto.password, user.password);

    return user;
  }

  private async authorizeRegistration(authDto: AuthUserDto) {
    if (await this.usersService.isEmailInUse(authDto.email))
      throw new BadRequestException('Email already in use');
  }
}
