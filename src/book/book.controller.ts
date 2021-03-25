import { 
    Controller, 
    Put, 
    Get, 
    Post, 
    Inject, 
    Query, 
    Body, 
    Param, 
    Delete ,
    UseInterceptors, 
    UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { BookService } from './book.service';

@Controller('api/v1/book')
export class BookController {
    constructor(
        @Inject(BookService)
        private readonly bookService: BookService,
    ){}

    @Get()
    async index(
        @Query() query: any, 
        @Body() body: any
    ) {
        const page = query.page ? query.page : 1;
        const limit = query.limit ? query.limit : 10;
        return await this.bookService.index({ page, limit }, query);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async store(
        @Body() body: any,
        @UploadedFile() file: Express.Multer.File
    ) {
        console.log("file upload", file)
        return await this.bookService.store(body);
    }

    @Get('/:id')
    async show(
        @Param('id') id: number,
    ) {
        return await this.bookService.show(id);
    }

    @Put('/:id')
    async update(
        @Param('id') id: number,
    ) {
        return await this.bookService.update(id);
    }

    @Delete('/:id')
    async Delete(
        @Param('id') id: number,
    ) {
        return await this.bookService.delete(id);
    }

}
