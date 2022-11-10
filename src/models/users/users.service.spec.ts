import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { createMock } from '@golevelup/ts-jest';
import { SearchUsersDto } from './dto/search-users.dto';
import { AuthUserDto } from '../auth/auth-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  const repositoryMock = createMock<Repository<User>>();
  let userTest: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repositoryMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    userTest = { id: 1, email: 'test@gmail.com', password: 'test' } as User;
  });

  it('should find all users', async () => {
    const users = [userTest, userTest, userTest];
    repositoryMock.find.mockResolvedValue(users);

    const result = await service.findAll();

    expect(result).toEqual(users);
    expect(repositoryMock.find).toHaveBeenCalledTimes(1);
  });

  it('should find all users by search', async () => {
    const users = [userTest, userTest];
    const search: SearchUsersDto = {
      email: 'test@mail.com',
      limit: 2,
    };
    repositoryMock.find.mockResolvedValue(users);

    const result = await service.findAllBy(search);

    expect(result).toEqual(users);
    expect(repositoryMock.find).toHaveBeenCalledTimes(1);
  });

  it('should find a user by id', async () => {
    const user = userTest;
    repositoryMock.findOneOrFail.mockResolvedValue(user);

    const result = await service.findOne(1);

    expect(result).toEqual(user);
    expect(repositoryMock.findOneOrFail).toHaveBeenCalledTimes(1);
  });

  it('should fail to find a user by id', async () => {
    repositoryMock.findOneOrFail.mockRejectedValue(new Error('Not found'));

    await expect(service.findOne(1)).rejects.toThrow('Not found');
    expect(repositoryMock.findOneOrFail).toHaveBeenCalledTimes(1);
  });

  it('should find a user by email', async () => {
    const user = userTest;
    repositoryMock.findOneOrFail.mockResolvedValue(user);

    const result = await service.findOneByEmail('test@gmail.com');

    expect(result).toEqual(user);
    expect(repositoryMock.findOneOrFail).toHaveBeenCalledTimes(1);
  });

  it('should say if email is in use', async () => {
    repositoryMock.findOneOrFail.mockResolvedValue(userTest);

    const result = await service.isEmailInUse('test.@gmail.com');

    expect(result).toBe(true);
  });

  it('should say if email is not in use', async () => {
    repositoryMock.findOneOrFail.mockRejectedValue(
      new EntityNotFoundError(User, 1),
    );

    const result = await service.isEmailInUse('test.@gmail.com');

    expect(result).toBe(false);
  });

  it('should create a user', async () => {
    const user = userTest;
    const authUserDto: AuthUserDto = { ...user };
    repositoryMock.create.mockReturnValue(user);
    repositoryMock.save.mockResolvedValue(user);

    const result = await service.create(authUserDto);

    expect(result).toEqual(user);
    expect(repositoryMock.create).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
  });

  it('should update a user', async () => {
    const user = userTest;
    repositoryMock.findOne.mockResolvedValue(user);
    const updateUserDto: UpdateUserDto = { email: 'newEmail@mail.com' };
    const updatedUser: User = { ...user, ...updateUserDto } as User;
    repositoryMock.merge.mockReturnValue(updatedUser);
    repositoryMock.save.mockResolvedValue(updatedUser);

    const result = await service.update(1, updateUserDto);

    expect(result).toEqual(updatedUser);
    expect(repositoryMock.findOneOrFail).toHaveBeenCalledTimes(1);
    expect(repositoryMock.merge).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
  });

  it('should remove a user', async () => {
    const user = userTest;
    repositoryMock.findOne.mockResolvedValue(user);
    repositoryMock.remove.mockResolvedValue(user);

    const result = await service.remove(1);

    expect(result).toEqual(user);
    expect(repositoryMock.findOneOrFail).toHaveBeenCalledTimes(1);
    expect(repositoryMock.remove).toHaveBeenCalledTimes(1);
  });
});
