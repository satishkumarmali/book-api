import { Body, Controller, Inject, Injectable, Post, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';

@Controller('api/v1')
export class AuthController {
    constructor(
        @Inject(UserService)
        private readonly userService: UserService
    ){}

    @Post('/login')
    async login(
        @Body() loginDto: LoginDto
    )
    {
        const userRes = await this.userService.login(loginDto);
        if(!userRes) {
            throw new HttpException(
                { error: 'User not found.' },
                HttpStatus.NOT_FOUND,
              );
        }
        const token = await this.userService.generateJWT(userRes);
        let userResponse = <any>{};
        userResponse = { token, ...userRes };
        return userResponse;
    }
}
