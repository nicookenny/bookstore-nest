import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDetails } from './user.details.entity';

@Entity('users')
export class User extends BaseEntity {
  @OneToOne((type) => UserDetails, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinTable({ name: 'detail_id' })
  details: UserDetails;
  @PrimaryGeneratedColumn('identity')
  ID: string;
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;
  @Column({ type: 'varchar', nullable: false })
  password: string;
  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
