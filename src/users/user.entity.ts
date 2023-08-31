import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'timestamp',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column({ nullable: true, default: true })
  status: Boolean;
}
