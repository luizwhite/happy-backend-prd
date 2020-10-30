import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate,  } from "typeorm";
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
  
  compareHash(hash: string) {
    return bcrypt.compare(hash, this.password);
  }

  generateToken() {
    return jwt.sign({ id: this.id }, "secret", {
      expiresIn: 86400
    });
  }
}
