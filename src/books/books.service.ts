import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createBook(user: UserEntity, createBookDto: CreateBookDto): Promise<BookEntity> {
    try {
      const book = this.bookRepository.create({ user, ...createBookDto });
      return await this.bookRepository.save(book);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException('Failed to create book', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async findListOfBooks(): Promise<BookEntity[]> {
    try {
      return await this.bookRepository.find({
        relations: ['user'],
        order: {
          publicationDate: 'DESC',
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw new HttpException('Failed to get list of books', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async findBookById(id: string): Promise<BookEntity | null> {
    try {
      const book = await this.bookRepository.findOne({ where: { id } });

      if (!book) {
        throw new HttpException(`No book with ${id} id`, HttpStatus.NOT_FOUND);
      }

      return book;
    } catch (err) {
      this.logger.error(err);
      throw new HttpException('Failed to find book', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteBookById(id: string): Promise<DeleteResult> {
    try {
      const book = await this.findBookById(id);

      if (!book) {
        throw new HttpException(`No book with ${id} id`, HttpStatus.NOT_FOUND);
      }

      return await this.bookRepository.delete({ id });
    } catch (err) {
      this.logger.error(err);
      throw new HttpException('Failed to delete book', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async updateBookById(id: string, attrs: Partial<BookEntity>): Promise<BookEntity | null> {
    try {
      const book = await this.findBookById(id);

      if (!book) {
        throw new HttpException(`No book with ${id} id`, HttpStatus.NOT_FOUND);
      }

      Object.assign(book, attrs);
      return await this.bookRepository.save(book);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException('Failed to update book', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
