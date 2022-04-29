import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Logger } from '@nestjs/common';
import * as Bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  hashPassword() {
    Logger.log('Hashing password...');
    this.password = Bcrypt.hashSync(this.password, Bcrypt.genSaltSync(10));
  }

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
