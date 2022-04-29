import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  store(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
