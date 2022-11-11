import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../models/users/users.service';
import { createMock } from '@golevelup/ts-jest';
import { AuthUserDto } from './auth-user.dto';
import { User } from '../models/users/user.entity';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { InvalidCredentialsException } from './invalid-credentials.exception';

describe('AuthService', () => {
  let authService: AuthService;
  const usersServiceMock = createMock<UsersService>();
  let dto: AuthUserDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);

    dto = { email: 'test@test.test', password: 'test' };
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should hash password with bcrypt', async () => {
      const password = dto.password;
      usersServiceMock.create.mockResolvedValue(Promise.resolve(dto as User));
      usersServiceMock.isEmailInUse.mockResolvedValue(false);

      const user: User = await authService.register(dto);

      const isHashFromPassword = bcrypt.compareSync(password, user.password);
      expect(isHashFromPassword).toBeTruthy();
    });

    it('should throw an error if the email is already in use', async () => {
      expect.hasAssertions();

      usersServiceMock.create.mockResolvedValue(Promise.resolve(dto as User));
      usersServiceMock.isEmailInUse.mockResolvedValue(true);

      await authService.register(dto).catch((error) => {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe('Email already in use');
      });
    });
  });

  describe('authenticate', () => {
    it('should return a user if credentials are valid', async () => {
      usersServiceMock.findOneByEmail.mockResolvedValue({
        ...dto,
        password: bcrypt.hashSync(dto.password, 10),
      } as User);

      const user: User = await authService.authenticate(dto);

      expect(user).toBeDefined();
      expect(user.email).toBe(dto.email);
    });

    it('should throw an error if the user is not found', async () => {
      expect.hasAssertions();

      const entityNotFoundError = new EntityNotFoundError('', {});
      usersServiceMock.findOneByEmail.mockRejectedValue(entityNotFoundError);

      await authService.authenticate(dto).catch((error) => {
        expect(error).toBeInstanceOf(InvalidCredentialsException);
      });
    });

    it('should throw an error if the password is invalid', async () => {
      expect.hasAssertions();

      usersServiceMock.findOneByEmail.mockResolvedValue({
        ...dto,
        password: dto.password + 'invalid',
      } as User);

      await authService.authenticate(dto).catch((error) => {
        expect(error).toBeInstanceOf(InvalidCredentialsException);
      });
    });
  });
});
