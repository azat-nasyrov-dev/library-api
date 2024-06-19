import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookEntity } from '../../books/entities/book.entity';
import { ApiProperty } from '@nestjs/swagger';

export const enum UserRole {
  USER = 1 << 0,
  ADMIN = 1 << 1,
}

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({
    example: 'a635a326-f394-4744-a998-90514a777e71',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'james.bond@gmail.com', description: 'Email' })
  @Column({ nullable: false })
  email: string;

  @ApiProperty({ example: 'James Bond', description: 'Username' })
  @Column({ nullable: false })
  username: string;

  @ApiProperty({ example: 'qwerty12345', description: 'User password' })
  @Column({ name: 'password_hash', nullable: false, select: false })
  passwordHash: string;

  @ApiProperty({ example: 'ADMIN', description: 'User role' })
  @Column({ default: UserRole.USER })
  roles: number;

  @OneToMany(() => BookEntity, (book) => book.user)
  books: BookEntity[];
}
