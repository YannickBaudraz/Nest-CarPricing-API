import { CurrentUserMiddleware } from './current-user.middleware';
import { UsersService } from '../users.service';
import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

describe('CurrentUserMiddleware', () => {
  let currentUserMiddleware: CurrentUserMiddleware;
  const usersServiceMock = createMock<UsersService>();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CurrentUserMiddleware,
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compile();

    currentUserMiddleware = module.get(CurrentUserMiddleware);
  });

  it('should be defined', () => {
    expect(currentUserMiddleware).toBeDefined();
  });
});
