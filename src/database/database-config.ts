import { join } from 'path';
import { DataSourceOptions, LoggerOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  let logging: LoggerOptions;
  try {
    logging = JSON.parse(process.env.DB_LOGGING);
  } catch (error) {
    logging = process.env.DB_LOGGING as LoggerOptions;
  }

  return {
    type: 'sqlite',
    database: process.env.DB_NAME,
    entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, './migrations/*{.ts,.js}')],
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
    synchronize: process.env.DB_SYNC === 'true',
    logger: process.env.DB_LOGGER as DataSourceOptions['logger'],
    logging,
    keepConnectionAlive: process.env.DB_KEEP_ALIVE === 'true',
  } as DataSourceOptions;
});
