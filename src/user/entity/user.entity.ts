import { Exclude, Transform } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  constructor(login, password) {
    this.login = login;
    this.password = password;
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  @Transform(({ value }) => +value)
  createdAt: number;

  @UpdateDateColumn()
  @Transform(({ value }) => +value)
  updatedAt: number;
}
