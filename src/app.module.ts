import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { AuthModule } from './auth/auth.module';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import { TypeOrmFilter } from './filters/type-orm.filter';
import { DatabaseModule } from './database/database.module';

const FileStore = sessionFileStore(session);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    UsersModule,
    ReportsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_PIPE',
      useValue: new ValidationPipe({
        whitelist: true,
        transformOptions: {
          exposeUnsetFields: false,
        },
      }),
    },
    {
      provide: 'APP_FILTER',
      useClass: TypeOrmFilter,
    },
  ],
})
export class AppModule {
  // noinspection JSUnusedGlobalSymbols
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: 'my-secret',
          resave: false,
          saveUninitialized: false,
          store: new FileStore(),
        }),
      )
      .forRoutes('*');
  }
}
