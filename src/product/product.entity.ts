import { Category } from 'src/categories/category.entity';
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, UpdateQueryBuilder } from 'typeorm';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    name: string | null;

    @Column({type: 'json', nullable: true})
    description: string | null;

    @Column()
    price: number | null;

    @Column({type: 'json', nullable: true})
    avatar: string;

    @Column({type: 'json', nullable: true})
    hot: number | 0;

    @CreateDateColumn()
    created_at: Date | null;

    @UpdateDateColumn()
    updated_at: Date | null;

    @Column()
    category_id: number | 0;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn([{ name: "category_id", referencedColumnName: "id"}])
    category: Category;
}
