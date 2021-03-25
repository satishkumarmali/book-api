import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Category } from './category.entity';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ){}

    public async index({page, limit}, params: any = {})
    {
        const book = await this.bookRepository.findOne(1);
    }

    public async show(id: number)
    {
        const book = await this.bookRepository.findOne(id);
        return book;
    }

    public async store(dto)
    {
        const newBook = new Book();
        newBook.title = dto.title;
        newBook.price = dto.price;
        newBook.image = dto.image;
        newBook.author = dto.author;
        newBook.rating = dto.rating;
        newBook.category_id = dto.category_id;
        newBook.description = dto.description;
        newBook.created_by = dto.created_by;
        newBook.created_at = dto.created_at;
        const saveNewBook = await this.bookRepository.save(newBook);
        
        return this.show(saveNewBook.id);
    }

    public async update(id: number, params: any = {})
    {
        const book = await this.bookRepository.findOne(id);
        book.title = params.title;
        book.price = params.price;
        book.image = params.image;
        book.author = params.author;
        book.rating = params.rating;
        book.category_id = params.category_id;
        book.description = params.description;
        book.created_by = params.created_by;
        book.updated_at = new Date();
        const saveUpdateBook = await this.bookRepository.save(book);

        return this.show(book.id);
    }

    public async delete(id: number)
    {
        const book = await this.bookRepository.findOne(id);
        book.deleted_at = new Date();
        const saveUpdateBook = await this.bookRepository.save(book);
    }

    private getQB()
    {
        const queryBuilder = this.bookRepository.createQueryBuilder().where('Book.deleted_at IS NULL');
        return queryBuilder;
    }
   
}
