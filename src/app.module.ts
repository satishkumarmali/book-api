import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, BookController],
  providers: [AppService, UserService, BookService],
})
export class AppModule {}
