import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUser } from './requestwithuser.interface';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('Executing RolesGuard...');
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      console.log('No roles specified, handler unprotected. Proceed!');
      return true;
    }

    const request = context.switchToHttp().getRequest() as RequestWithUser;
    const user = request.user;

    return (
      user && user.roles && user.roles.some((role) => roles.includes(role))
    );
  }
}
