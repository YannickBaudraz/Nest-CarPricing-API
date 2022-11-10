import { CurrentUserInterceptor } from './current-user.interceptor';
import { Test } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { createMock } from '@golevelup/ts-jest';

describe('CurrentUserInterceptor', () => {
  let interceptor: CurrentUserInterceptor;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CurrentUserInterceptor,
        { provide: UsersService, useValue: createMock<UsersService>() },
      ],
    }).compile();

    interceptor = module.get<CurrentUserInterceptor>(CurrentUserInterceptor);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
});
