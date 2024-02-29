import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestWithUser } from './requestwithuser.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('Executing AuthGuard...');
    const request = context.switchToHttp().getRequest() as RequestWithUser;
    const user = request.user;

    if (!user) {
      console.log('No logged in user found. Abort!');
      return false;
    }

    console.log('Logged in user found, can proceed.');

    return true;
  }
}
