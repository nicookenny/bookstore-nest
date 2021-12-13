import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
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
