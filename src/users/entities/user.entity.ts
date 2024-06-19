import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const enum UserRole {
  USER = 1 << 0,
  ADMIN = 1 << 1,
}

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  username: string;

  @Column({ name: 'password_hash', nullable: false, select: false })
  passwordHash: string;

  @Column({ default: UserRole.USER })
  roles: number;
}
