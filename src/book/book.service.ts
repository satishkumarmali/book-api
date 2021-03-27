import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
    paginate,
    Pagination,
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';
import { Book } from './book.entity';
import { Category } from '../category/category.entity';
import { CategoryService } from '../category/category.service';
import { DTtoTS} from '../utils/date_time.utils';
import { imgUrl } from '../utils/file_upload.util';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @Inject(CategoryService)
        private readonly categoryService: CategoryService
    ){}

    public async index(options: IPaginationOptions, params: any = {})
    {   
        const qb = this.getQB();
        qb.leftJoinAndSelect(
            'categories',
            'categories',
            'categories.id = Book.category_id'
        );
        //Filter result
        if (params.filters) {
            const filters = params.filters;
            if (filters.rating) {
                qb.andWhere(`Book.rating >= ${filters.rating}`);
            }
            if(filters.category_id) {
                qb.andWhere(`Book.category_id = ${filters.category_id}`)
            }
        }
        //Sorting result
        if(params.sort) {
            if(params.sort.price) {
                qb.orderBy('Book.price', params.sort.price)
            }
            if(params.sort.rating) {
                qb.orderBy('Book.rating', params.sort.rating)
            }
        } else {
            qb.orderBy('Book.id', 'DESC');
        }
        const bookRes = await paginate<Book>(qb, options);
        return bookRes;
    }

    public async show(id: number)
    {
        const bookRes = await this.bookRepository.findOne(id);
        let book = <any>{};
        book = {...bookRes}
        book.category = await this.categoryService.show(bookRes.category_id)
        return this.buildBookRO(book);
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
        book.updated_at = new Date();
        const saveUpdateBook = await this.bookRepository.save(book);

        return this.show(book.id);
    }

    public async buildBookRO(book: Book)
    {
        return new Promise(async resolve => {
            let bookRO = <any>{};
            bookRO = {...book};
            //Append image url
            if(book.image) {
                bookRO.image = await imgUrl(book.image);
            }
            bookRO.created_at = DTtoTS(book.created_at);
            bookRO.updated_at = DTtoTS(book.updated_at);
            resolve(bookRO);
        });
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
