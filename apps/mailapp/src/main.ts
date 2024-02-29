import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MailappModule } from './mailapp.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailappModule,
    {
      transport: Transport.TCP,
      options: {
        port: 4242,
      },
    },
  );

  await app.listen();
}
bootstrap();
