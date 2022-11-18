import { DataSource } from 'typeorm';
import databaseConfig from './database-config';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `.env.${process.env.NODE_ENV}`,
  load: [databaseConfig],
});

export default new DataSource(databaseConfig());
