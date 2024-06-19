import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { UserEntity } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, UserEntity]), UsersModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
