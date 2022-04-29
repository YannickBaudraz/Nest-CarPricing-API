import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserDto } from './auth-user.dto';
import { User } from '../users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: AuthUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: AuthUserDto): Promise<User> {
    return this.authService.authenticate(createUserDto);
  }
}
