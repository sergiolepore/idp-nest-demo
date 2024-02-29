import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { RequestWithUser } from './requestwithuser.interface';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as RequestWithUser;
    return request.user;
  },
);
