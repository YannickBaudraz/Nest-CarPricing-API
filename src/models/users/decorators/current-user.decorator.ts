import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '../../../guards/auth.guard';

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    new AuthGuard().canActivate(ctx);

    return ctx.switchToHttp().getRequest().currentUser;
  },
);
