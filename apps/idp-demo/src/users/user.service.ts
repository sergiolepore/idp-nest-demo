import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  getUserFromToken(token: string) {
    return new User(1, 'John Doe', 'jdoe@test.com', token, ['admin']);
  }
}
