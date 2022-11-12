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
    synchronize: Boolean(process.env.DB_SYNC),
    logger: process.env.DB_LOGGER as DataSourceOptions['logger'],
    logging,
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  } as DataSourceOptions;
});
