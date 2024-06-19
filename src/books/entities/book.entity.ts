import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'books' })
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  author: string;

  @Column({ name: 'publication_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publicationDate: Date;

  @Column('simple-array')
  genres: string[];

  @ManyToOne(() => UserEntity, (user) => user.books, { eager: true })
  user: UserEntity;
}
