import { Body, Controller, Inject, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
        const token = await this.userService.generateJWT(userRes);
        let userResponse = <any>{};
        userResponse = { token, ...userRes };
        return userResponse;
    }
}
