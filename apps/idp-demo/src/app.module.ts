import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { DevelopersModule } from './developers/developers.module';
import { CorsMiddleware } from './cors.middleware';
import { UserService } from './users/user.service';

@Module({
  imports: [TestModule, DevelopersModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
