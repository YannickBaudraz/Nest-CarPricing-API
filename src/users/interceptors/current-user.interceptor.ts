import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const sessionUserId = request.session.userId;
    if (!sessionUserId)
      throw new UnauthorizedException('You are not logged in');
    request.currentUser = await this.usersService.findOne(sessionUserId);

    return next.handle();
  }
}
