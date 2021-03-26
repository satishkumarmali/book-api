import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { User } from './user.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository : Repository<User>
    ){}

    public async store(dto)
    {
        const newUser = new User();
        newUser.name = dto.name;
        newUser.email = dto.email;
        newUser.password = dto.password;
        newUser.created_at = new Date();
        const savedNewUser = await this.userRepository.save(newUser);
        
        return {
            status: true,
            message: 'User registered successfully.'
        }
    }

    public async show(id: number)
    {
        const user = await this.userRepository.findOne(id);
        return user;
    }

    public async login(loginUserDto: any)
    {
        const findOneOptions = {
            email: loginUserDto.email,
            password: crypto
              .createHmac('sha256', loginUserDto.password)
              .digest('hex'),
          };
          const userRes = await this.userRepository.findOne(findOneOptions);
          let user = <any>{};
          user = {...userRes};
          return user;
    }

    public async generateJWT(user)
    {
        const today = new Date();
        today.setDate(today.getDate() + 60);

        return jwt.sign(
        {
            id: user.id,
            email: user.email,
            exp: today.getTime() / 1000
            },
            process.env.SECRET,
        );
    }
}
