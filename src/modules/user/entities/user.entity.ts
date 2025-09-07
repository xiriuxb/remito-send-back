import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, length: 32 })
  username: string;
  @Column({ unique: true, length: 256 })
  email: string;
  @Column({ length: 256 })
  passwordHash: string;
}
