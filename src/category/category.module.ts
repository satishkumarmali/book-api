import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
        Category,
    ])
],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [
    TypeOrmModule.forFeature([
      Category,
    ]),
    CategoryService
  ]
})
export class CategoryModule {}
