import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { AuthMiddleware } from '../user/auth.middleware';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Book
        ])
    ],
    controllers: [BookController],
    providers: [BookService]
})
export class BookModule implements NestModule{
    public configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(AuthMiddleware)
        .forRoutes({ path: 'api/v1/book', method: RequestMethod.ALL});
    }
}
