import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  admin: boolean;

  compareHash(hash: string): Promise<boolean> {
    return bcrypt.compare(hash, this.password);
  }

  generateToken(): string {
    return jwt.sign({ id: this.id }, 'secret', {
      expiresIn: 86400,
    });
  }
}
