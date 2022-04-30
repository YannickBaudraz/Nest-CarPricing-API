import session from 'express-session';
import sessionFileStore from 'session-file-store';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TypeOrmFilter } from './filters/type-orm.filter';

const FileStore = sessionFileStore(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      store: new FileStore(),
    }),
  );

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
