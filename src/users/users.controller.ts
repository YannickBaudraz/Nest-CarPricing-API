import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SearchUsersDto } from './dto/search-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async index(@Query() searchUsersDto?: SearchUsersDto) {
    return !searchUsersDto
      ? this.usersService.findAll()
      : this.usersService.findAllBy(searchUsersDto);
  }

  @Get('me')
  async me(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':id')
  async destroy(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.remove(userId);
  }
}
