import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthenticationMiddleware } from '../users/authentication.middleware';
import { UsersModule } from '../users/users.module';
import { DevelopersService } from './developers.service';
import { DevelopersController } from './developers.controller';

@Module({
  imports: [UsersModule],
  controllers: [DevelopersController],
  providers: [DevelopersService],
})
export class DevelopersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(DevelopersController);
  }
}
