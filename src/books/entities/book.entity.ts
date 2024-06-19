import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'books' })
export class BookEntity {
  @ApiProperty({
    example: '913c68bd-0000-41a0-ac05-a0eb7dbcb86b',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Clean Code', description: 'Title' })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({ example: 'Robert Martin', description: 'Author' })
  @Column({ nullable: false })
  author: string;

  @ApiProperty({ example: '2024-07-20', description: 'Date of publication' })
  @Column({ name: 'publication_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publicationDate: Date;

  @ApiProperty({ example: 'Programmer library', description: 'Genre' })
  @Column('simple-array')
  genres: string[];

  @ManyToOne(() => UserEntity, (user) => user.books, { eager: true })
  user: UserEntity;
}
