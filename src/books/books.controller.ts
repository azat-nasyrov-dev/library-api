import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookEntity } from './entities/book.entity';
import { UserDecorator } from '../users/decorators/user.decorator';
import { UserEntity, UserRole } from '../users/entities/user.entity';
import { DeleteResult } from 'typeorm';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from '../users/guards/auth.guard';
import { RolesGuard } from '../users/guards/roles.guard';
import { RolesDecorator } from '../users/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Create book' })
  @ApiResponse({ status: 201, description: 'The book has been successfully created' })
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @RolesDecorator(UserRole.ADMIN)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async createBook(
    @UserDecorator() currentUser: UserEntity,
    @Body() createBookDto: CreateBookDto,
  ): Promise<BookEntity> {
    return await this.booksService.createBook(currentUser, createBookDto);
  }

  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Books has been successfully received' })
  @Get()
  public async findListOfBooks(): Promise<BookEntity[]> {
    return await this.booksService.findListOfBooks();
  }

  @ApiOperation({ summary: 'Get particular book' })
  @ApiResponse({ status: 200, description: 'The book has been successfully received' })
  @Get(':id')
  public async findBookById(@Param('id') id: string): Promise<BookEntity> {
    return await this.booksService.findBookById(id);
  }

  @ApiOperation({ summary: 'Delete particular book' })
  @ApiResponse({ status: 200, description: 'The book has been successfully deleted' })
  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @RolesDecorator(UserRole.ADMIN)
  public async deleteBookById(@Param('id') id: string): Promise<DeleteResult> {
    return await this.booksService.deleteBookById(id);
  }

  @ApiOperation({ summary: 'Update particular book' })
  @ApiResponse({ status: 200, description: 'The book has been successfully updated' })
  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @RolesDecorator(UserRole.ADMIN)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  public async updateBookById(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookEntity> {
    return await this.booksService.updateBookById(id, updateBookDto);
  }
}
