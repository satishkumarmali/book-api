import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';

@Entity('books')

export class Book{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column()
    price: string;

    @Column()
    image: string;

    @Column()
    author: string;

    @Column({type: 'decimal'})
    rating: number;

    @Column()
    category_id: number;

    @Column()
    description: string;

    @Column()
    created_by: number;

    @OneToMany(() => Category, category => category.book)
    categories: Category[];
    
    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    deleted_at: Date;
}