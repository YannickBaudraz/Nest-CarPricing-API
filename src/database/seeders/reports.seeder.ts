import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import ReportsFactory from '../factories/report.factory';
import { User } from '../../models/users/user.entity';

export default class ReportsSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const users: User[] = await dataSource.manager.getRepository(User).find();
    await new ReportsFactory(dataSource, users).createMany(50_000);
  }
}
