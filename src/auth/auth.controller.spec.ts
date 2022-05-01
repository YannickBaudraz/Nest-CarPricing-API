import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { createMock } from '@golevelup/ts-jest';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { AuthUserDto } from './auth-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  const authServiceMock = createMock<AuthService>();
  let userTest: User;
  let dto: AuthUserDto;
  let session;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);

    userTest = { id: 1, email: 'test@example.com', password: 'test' } as User;
    dto = { email: 'test@test.test', password: 'test' };
    session = {};
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should update the session and return the authenticated user', async () => {
      authServiceMock.register.mockResolvedValue(userTest);

      const user = await controller.register(dto, session);

      expect(user).toEqual(userTest);
      expect(session.userId).toEqual(user.id);
      expect(authServiceMock.register).toBeCalledWith(dto);
    });
  });

  describe('login', () => {
    it('should update the session and return the authenticated user', async () => {
      authServiceMock.authenticate.mockResolvedValue(userTest);

      const user = await controller.login(dto, session);

      expect(user).toEqual(userTest);
      expect(session.userId).toEqual(user.id);
      expect(authServiceMock.authenticate).toBeCalledWith(dto);
    });
  });

  describe('logout', () => {
    it('should remove the user id from the session', async () => {
      session.userId = userTest.id;

      await controller.logout(session);

      expect(session.userId).toBeUndefined();
    });
  });
});
