import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUsersDto } from './dto/search-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findAllBy(query: SearchUsersDto): Promise<User[]> {
    console.log(query);
    return this.repository.find(query);
  }

  findOne(id: number): Promise<User | undefined> {
    return this.repository.findOneOrFail(id);
  }

  create(user: CreateUserDto): Promise<User> {
    const entity = this.repository.create(user);

    return this.repository.save(entity);
  }

  async update(id: number, partialUser: Partial<User>): Promise<User> {
    const user = this.repository.merge(await this.findOne(id), partialUser);

    return this.repository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);

    return this.repository.remove(user);
  }
}
