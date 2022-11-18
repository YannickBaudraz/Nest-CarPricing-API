import { FactorizedAttrs, Factory } from '@jorgebodega/typeorm-factory';
import { User } from '../../models/users/user.entity';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { hashSync } from 'bcrypt';

export default class UserFactory extends Factory<User> {
  protected entity = User;

  constructor(protected dataSource: DataSource) {
    super();
  }

  protected attrs(): FactorizedAttrs<User> {
    return {
      isAdmin: faker.datatype.boolean(),
      email: faker.internet.email(),
      password: hashSync('password', 10),
    };
  }
}
