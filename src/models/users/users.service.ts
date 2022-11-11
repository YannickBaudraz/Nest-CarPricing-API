import { Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto } from '../../auth/auth-user.dto';
import { SearchUsersDto } from './dto/search-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findAllBy(query: SearchUsersDto): Promise<User[]> {
    return this.repository.find({ where: { email: query.email } });
  }

  async findOne(userId: number): Promise<User> {
    return this.repository.findOneOrFail({ where: { id: userId } });
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

  async update(userId: number, partialUser: UpdateUserDto): Promise<User> {
    const foundUser = await this.findOne(userId);
    const updatedUser = this.repository.merge(foundUser, partialUser);

    return this.repository.save(updatedUser);
  }

  async remove(userId: number): Promise<User> {
    const user = await this.findOne(userId);

    return this.repository.remove(user);
  }
}
