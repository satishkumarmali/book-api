import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ validationError: { target: false }, transform: true }),
  );
  //Serve static files
  app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
