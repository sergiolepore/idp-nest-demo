import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { DevelopersModule } from './developers/developers.module';

@Module({
  imports: [TestModule, DevelopersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
