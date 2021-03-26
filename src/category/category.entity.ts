import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Book } from '../book/book.entity';

@Entity('categories')

export class Category{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
   /*  @OneToMany(() => Book, book => book.categories)
    @JoinColumn({ name: 'id' })
    book: Book; */
    @OneToMany(type => Book, Book => Book.categories)
    book: Book[];

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    deleted_at: Date;
}