import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, OneToMany } from 'typeorm';
import { Category } from '../category/category.entity';

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

    /* @ManyToMany(type => Category, category => category.id)
    @JoinColumn({ name: 'category_id' })
    categories: Category; */
    /* @OneToMany(type => Category, category => category.book)
    @JoinColumn({ name: 'category_id' })
    categories: Category; */
    /* @ManyToMany(() => Category)
    @JoinColumn({ name: 'category_id' })
    categories!: Category[]; */
    @OneToMany(type => Category, category => category.book)
    categories: Category[];
    
    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    deleted_at: Date;
}