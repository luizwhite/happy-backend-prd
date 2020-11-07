import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Orphanage from './Orphanage';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @CreateDateColumn()
  created_at: Date; // eslint-disable-line camelcase

  @UpdateDateColumn()
  updated_at: Date; // eslint-disable-line camelcase

  @ManyToOne(() => Orphanage, (orphanage) => orphanage.images)
  @JoinColumn({ name: 'orphanage_id' })
  orphanage: Orphanage;
}
