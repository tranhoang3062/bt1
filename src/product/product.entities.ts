import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class ProductEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "name" })
    name: string;

    @Column({ name: "description" })
    description: string;

    @Column({ name: "price" })
    price: number;
}