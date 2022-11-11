import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import { TypeOrmFilter } from './filters/type-orm.filter';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './models/users/users.module';
import { ReportsModule } from './models/reports/reports.module';
import { ErrorFilter } from './filters/error.filter';
import { HttpFilter } from './filters/http.filter';

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
      useClass: ErrorFilter,
    },
    {
      provide: 'APP_FILTER',
      useClass: HttpFilter,
    },
    {
      provide: 'APP_FILTER',
      useClass: TypeOrmFilter,
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  // noinspection JSUnusedGlobalSymbols
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: this.configService.get('SESSION_SECRET'),
          resave: false,
          saveUninitialized: false,
          store: new FileStore(),
        }),
      )
      .forRoutes('*');
  }
}
