import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto} from './dto/create_user.dto';

@Controller('api/v1')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    @Post('/signup')
    async store(
        @Body() userData: CreateUserDto
    ) {
        return this.userService.store(userData);
    }
}
