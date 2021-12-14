import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_details')
export class UserDetails extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  ID: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  last_name: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
