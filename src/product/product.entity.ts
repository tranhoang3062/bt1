import { Category } from 'src/categories/category.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column()
    category_id: number | 0;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn([{ name: "category_id", referencedColumnName: "id"}])
    category: Category;
}
