import { Product } from 'src/product/product.entity';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    name: string | null;

    @Column()
    image: string | null;

    @OneToMany(() => Product, (products) => products.category)
    products: Product[];
}
