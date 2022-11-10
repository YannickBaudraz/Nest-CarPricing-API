import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Logger } from '@nestjs/common';
import { Report } from '../reports/report.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isAdmin: boolean;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  afterInsert() {
    Logger.log(`User created with id: ${this.id}; email: ${this.email}`);
  }

  @AfterUpdate()
  afterUpdate() {
    Logger.log(`User updated with id: ${this.id}; email: ${this.email}`);
  }

  @AfterRemove()
  afterRemove() {
    Logger.log(`User removed with id: ${this.id}; email: ${this.email}`);
  }
}
