import { Injectable, NestMiddleware,HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import * as jwt from 'jsonwebtoken';
import { UserService } from './user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService
  ){}

  async use(req: any, res: any, next: () => void) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: any = jwt.verify(token, process.env.SECRET);
      let user = await this.userService.show(decoded.id);
      console.log('decode', decoded)
      if (!user) {
        throw new HttpException(
          { error: 'User not found.' },
          HttpStatus.NOT_FOUND,
        );
      }
      req.authUser = user;
      next();
    } else {
      throw new HttpException(
        { error: 'User not found.' },
        HttpStatus.NOT_FOUND,
      );
    } 
  }
}
