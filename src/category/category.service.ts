import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ){}

    public async show(id: number)
    {
        const category = await this.categoryRepository.findOne(id);
        return category;
    }
}
