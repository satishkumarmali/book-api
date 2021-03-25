import { 
  Module, 
  MiddlewareConsumer,
  NestModule,
  Global
 } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthMiddleware } from './auth.middleware';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ]),
  ],
  controllers: [AuthController, UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule implements NestModule{
  public configure(consumer: MiddlewareConsumer) {

  }
}
