import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}

bootstrap()
  .then(() =>
    Logger.log('Server is running on http://localhost:3000', 'Bootstrap'),
  )
  .catch((err) => Logger.error(err));
