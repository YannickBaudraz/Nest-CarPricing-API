import { ConfigModule } from '@nestjs/config';
import databaseConfig from './src/database/database-config';
import { DataSource } from 'typeorm';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `.env.${process.env.NODE_ENV}`,
  load: [databaseConfig],
});

export default new DataSource(databaseConfig());
