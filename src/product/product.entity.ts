import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
