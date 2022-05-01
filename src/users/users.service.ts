import { Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto } from '../auth/auth-user.dto';
import { SearchUsersDto } from './dto/search-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findAllBy(query: SearchUsersDto): Promise<User[]> {
    return this.repository.find(query);
  }

  async findOne(userId: number): Promise<User> {
    return this.repository.findOneOrFail(userId);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.repository.findOneOrFail({ where: { email } });
  }

  async isEmailInUse(email: string): Promise<boolean> {
    try {
      await this.findOneByEmail(email);
      return true;
    } catch (e) {
      if (e instanceof EntityNotFoundError) return false;
      throw e;
    }
  }

  async create(user: AuthUserDto): Promise<User> {
    const entity = this.repository.create(user);

    return this.repository.save(entity);
  }

  async update(userId: number, partialUser: Partial<User>): Promise<User> {
    const user = this.repository.merge(await this.findOne(userId), partialUser);

    return this.repository.save(user);
  }

  async remove(userId: number): Promise<User> {
    const user = await this.findOne(userId);

    return this.repository.remove(user);
  }
}
