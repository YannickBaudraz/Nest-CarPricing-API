import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import UserFactory from '../factories/user.factory';

export default class UsersSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await new UserFactory(dataSource).createMany(10);
  }
}
