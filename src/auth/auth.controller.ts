import { Body, Controller, Post, Session } from '@nestjs/common';
import { AuthUserDto } from './auth-user.dto';
import { User } from '../models/users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../models/users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerUserDto: AuthUserDto,
    @Session() session,
  ): Promise<User> {
    const user = await this.authService.register(registerUserDto);
    session.userId = user.id;
    return user;
  }

  @Post('login')
  async login(
    @Body() loginUserDto: AuthUserDto,
    @Session() session,
  ): Promise<User> {
    const user = await this.authService.authenticate(loginUserDto);
    session.userId = user.id;
    return user;
  }

  @Post('logout')
  async logout(@Session() session): Promise<void> {
    session.userId = undefined;
  }
}
