import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import { TypeOrmFilter } from './filters/type-orm.filter';
import { LoggerOptions } from 'typeorm';

const FileStore = sessionFileStore(session);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        let logging: LoggerOptions;
        try {
          logging = JSON.parse(config.get('DB_LOGGING'));
        } catch (error) {
          logging = config.get('DB_LOGGING');
        }

        return {
          type: 'sqlite',
          database: config.get('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: config.get('DB_SYNC'),
          logger: config.get('DB_LOGGER'),
          logging,
          keepConnectionAlive: config.get('DB_KEEP_ALIVE'),
        };
      },
    }),
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
