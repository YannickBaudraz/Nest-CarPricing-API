import { FactorizedAttrs, Factory } from '@jorgebodega/typeorm-factory';
import { DataSource } from 'typeorm';
import { Report } from '../../models/reports/report.entity';
import { faker } from '@faker-js/faker';
import { User } from '../../models/users/user.entity';

export default class ReportsFactory extends Factory<Report> {
  protected entity = Report;

  constructor(protected dataSource: DataSource, private users: User[]) {
    super();
  }

  protected attrs(): FactorizedAttrs<Report> {
    return {
      approved: faker.datatype.boolean(),
      price: Number(faker.commerce.price(1_000, 1_000_000)),
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      year: faker.date.between('2000-01-01', '2022-01-01').getFullYear(),
      latitude: Number(faker.address.latitude()),
      longitude: Number(faker.address.longitude()),
      mileage: Number(faker.datatype.number({ min: 10_000, max: 1_000_000 })),
      user: faker.helpers.arrayElement(this.users),
    };
  }
}
