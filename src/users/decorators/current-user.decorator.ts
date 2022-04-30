import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data, req: ExecutionContext) => {
    return req.switchToHttp().getRequest().currentUser;
  },
);
