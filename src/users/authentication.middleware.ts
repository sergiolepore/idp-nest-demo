// A bit more complex middleware that has Nest-specific features
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from './requestwithuser.interface';
import { UserService } from './user.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  use(req: RequestWithUser, res: Response, next: NextFunction) {
    console.log('Executing Authentication middleware');

    if (!req.headers.authorization) {
      console.log('No token provided');
      return next();
    }

    const [, token] = req.headers.authorization.split(' ');

    if (token) {
      const user = this.userService.getUserFromToken(token);
      console.log(`Welcome, ${user.email}!`);
      req.user = user;
    }

    next();
  }
}
