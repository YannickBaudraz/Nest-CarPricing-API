import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TypeOrmFilter } from './filters/type-orm.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions: {
        exposeUnsetFields: false,
      },
    }),
  );
  app.useGlobalFilters(new TypeOrmFilter());

  await app.listen(3000);
}

bootstrap()
  .then(() =>
    Logger.log('Server is running on http://localhost:3000', 'Bootstrap'),
  )
  .catch((err) => Logger.error(err));
