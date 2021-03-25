import {
    IsNotEmpty,
  } from 'class-validator';

  export class CreateBookDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    price: string;

    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    category_id: number;

  }