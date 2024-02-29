import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthenticationMiddleware } from '../users/authentication.middleware';
import { UsersModule } from '../users/users.module';
import { DevelopersService } from './developers.service';
import { DevelopersController } from './developers.controller';

@Module({
  imports: [
    UsersModule,
    ClientsModule.register([
      {
        name: 'MAIL_SERVICE',
        transport: Transport.TCP,
        options: { port: 4242 },
      },
    ]),
  ],
  controllers: [DevelopersController],
  providers: [DevelopersService],
})
export class DevelopersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(DevelopersController);
  }
}
