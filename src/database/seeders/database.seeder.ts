import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import UsersSeeder from './users.seeder';
import ReportsSeeder from './reports.seeder';

export default class DatabaseSeeder extends Seeder {
  private seeders = [UsersSeeder, ReportsSeeder];

  async run(dataSource: DataSource): Promise<void> {
    for (const seeder of this.seeders) {
      await new seeder().run(dataSource);
    }
  }
}
