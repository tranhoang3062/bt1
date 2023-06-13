import { Product } from 'src/product/product.entity';
import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    name: string | null;

    @Column()
    description: string | null;

    @Column({type: 'json', nullable: true})
    avatar: string;

    @Column({type: 'json', nullable: true})
    status: number | 0;

    @CreateDateColumn()
    created_at: Date | null;

    @UpdateDateColumn()
    updated_at: Date | null;

    @OneToMany(() => Product, (products) => products.category)
    products: Product[];
}
