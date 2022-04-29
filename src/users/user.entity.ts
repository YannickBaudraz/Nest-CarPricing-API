import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Logger } from '@nestjs/common';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

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
