import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { createMock } from '@golevelup/ts-jest';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  const userServiceMock = createMock<UsersService>();
  let userTest: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: userServiceMock }],
    }).compile();

    controller = module.get<UsersController>(UsersController);

    userTest = { id: 1, email: 'test@example.com', password: 'test' } as User;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('index', () => {
    it('should return an array of users', async () => {
      const usersTest = [userTest, userTest, userTest];
      userServiceMock.findAll.mockResolvedValue(usersTest);

      const users = await controller.index();

      expect(users).toEqual(usersTest);
      expect(userServiceMock.findAll).toHaveBeenCalledTimes(1);
    });

    it('should filter and return an array of users when search is provided', async () => {
      const usersTest = [userTest, userTest];
      const searchUsersDto = { email: 'test@example.com', limit: 2 };
      userServiceMock.findAllBy.mockResolvedValue(usersTest);

      const users = await controller.index(searchUsersDto);

      expect(users).toEqual(usersTest);
      expect(userServiceMock.findAllBy).toHaveBeenCalledTimes(1);
    });
  });

  describe('me', () => {
    it('should return the current user', async () => {
      const user = await controller.me(userTest);

      expect(user).toEqual(userTest);
    });
  });

  describe('show', () => {
    it('should return a user', async () => {
      userServiceMock.findOne.mockResolvedValue(userTest);

      const user = await controller.show(1);

      expect(user).toEqual(userTest);
      expect(userServiceMock.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return the updated user', async () => {
      userTest.email = 'new@example.com';
      userServiceMock.update.mockResolvedValue(userTest);

      const user = await controller.update(1, userTest);

      expect(user).toEqual(userTest);
      expect(userServiceMock.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('destroy', () => {
    it('should return the deleted user', async () => {
      userServiceMock.remove.mockResolvedValue(userTest);

      const user = await controller.destroy(1);

      expect(user).toEqual(userTest);
      expect(userServiceMock.remove).toHaveBeenCalledTimes(1);
    });
  });
});
