import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { LoggerOptions } from 'typeorm';
import { join } from 'path';

@Module({
  imports: [
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
          entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
          synchronize: config.get('DB_SYNC'),
          logger: config.get('DB_LOGGER'),
          logging,
          keepConnectionAlive: config.get('DB_KEEP_ALIVE'),
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
