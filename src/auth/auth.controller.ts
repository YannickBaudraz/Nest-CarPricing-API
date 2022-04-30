import { Body, Controller, Post, Session } from '@nestjs/common';
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
  async register(
    @Body() createUserDto: AuthUserDto,
    @Session() session,
  ): Promise<User> {
    const user = await this.authService.register(createUserDto);
    session.userId = user.id;
    return user;
  }

  @Post('login')
  async login(
    @Body() createUserDto: AuthUserDto,
    @Session() session,
  ): Promise<User> {
    const user = await this.authService.authenticate(createUserDto);
    session.userId = user.id;
    return user;
  }

  @Post('logout')
  async logout(@Session() session): Promise<void> {
    session.userId = undefined;
  }
}
