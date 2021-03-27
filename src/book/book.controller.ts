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
import * as multer from 'multer';
import { BookService } from './book.service';
import { validateFile, imageDestination } from '../utils/file_upload.util';
import { CreateBookDto, UpdateBookDto } from './dto';

@Controller('api/v1/book')
export class BookController {
    constructor(
        @Inject(BookService)
        private readonly bookService: BookService,
    ){}

    @Get()
    async index(
        @Query() query: any
    ) {
        const page = query.page ? query.page : 1;
        const limit = query.limit ? query.limit : 10;
        return await this.bookService.index({ page, limit }, query);
    }

    @Post()
    @UseInterceptors(FileInterceptor('media[0]', {
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                imageDestination(req, file, cb)
            },
            filename: function (req, file, cb) {
                let fileName = file.originalname.split('.').slice(0, -1).join('') 
                + '-' + Date.now() + '.' + file.originalname.split('.').pop()
                cb(null, fileName)
            },
        }),
        fileFilter: function (req, file, cb) {
            let options = { allowedExt: ['.jpg', '.jpeg', '.png'] };
            validateFile(req, file, cb, options);
        },
        limits:{
        fileSize:1024*500 //max file size Bytes
        },
    }))
    async store(
        @Body() bookData: CreateBookDto,
        @UploadedFile() media
    ) {
        if(media) {
            bookData.image = media.filename;
        }
        return await this.bookService.store(bookData);
    }

    @Get('/:id')
    async show(
        @Param('id') id: number,
    ) {
        return await this.bookService.show(id);
    }

    @Put('/:id')
    @UseInterceptors(FileInterceptor('media[0]', {
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                imageDestination(req, file, cb)
            },
            filename: function (req, file, cb) {
                let fileName = file.originalname.split('.').slice(0, -1).join('') 
                + '-' + Date.now() + '.' + file.originalname.split('.').pop()
                cb(null, fileName)
            },
        }),
        fileFilter: function (req, file, cb) {
            let options = { allowedExt: ['.jpg', '.jpeg', '.png'] };
            validateFile(req, file, cb, options);
        },
        limits:{
        fileSize:1024*500 //max file size Bytes
        },
    }))
    async update(
        @Param('id') id: number,
        @UploadedFile() media,
        @Body() data: UpdateBookDto,
    ) {
        if(media) {
            data.image = media.filename;
        }
        return await this.bookService.update(id, data);
    }

    @Delete('/:id')
    async Delete(
        @Param('id') id: number,
    ) {
        return await this.bookService.delete(id);
    }

}
