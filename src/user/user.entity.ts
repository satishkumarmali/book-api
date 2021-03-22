import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as crypto from 'crypto';

@Entity('users')

export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    deleted_at: Date;
}