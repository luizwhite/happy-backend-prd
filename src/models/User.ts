import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  admin: boolean;

  @CreateDateColumn()
  created_at: Date; // eslint-disable-line camelcase

  @UpdateDateColumn()
  updated_at: Date; // eslint-disable-line camelcase

  compareHash(hash: string): Promise<boolean> {
    return compare(hash, this.password);
  }

  generateToken(): string {
    const { secret, expiresIn } = authConfig.jwt;

    return sign({ id: this.id }, secret, {
      expiresIn,
    });
  }
}
