import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    name: string | null;

    @Column()
    description: string | null;

    @Column()
    price: number | null;
}
