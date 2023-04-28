import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository, Raw, MoreThan, LessThan, Equal } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product) 
        private proRepo: Repository<Product>,
    ) { }

    async getProducts(filter: any, paging: any, req: any) {
        
        let conditions = await this.buildConditions(filter);

        return await this.proRepo.findAndCount({
            where: conditions,
            relations: {
                category: true
            },
            order: {
                id: 'ASC'
            },
            take: paging.page_size,
            skip: ((paging.page - 1) * paging.page_size),
        });
    }

    async getProductById(productId: number): Promise<Product> {
        // return await this.proRepo.find({
        //     where: { id: productId }
        // });
        return await this.proRepo.findOneBy({ id: productId });
    }

    async createProduct(newProduct) {
        let newPro = await this.proRepo.create({
            ...newProduct
        });
        await this.proRepo.save(newPro);
        return newPro;
    }

    async updateProduct(productId: number, updateProduct) {
        let dataUpdate = {
            name: updateProduct.name,
            description: updateProduct.description,
            price: updateProduct.price,
            category_id: updateProduct.category_id
        }

        await this.proRepo.update(productId, dataUpdate);
        return this.proRepo.findOneBy({ id: productId })
    }

    async deleteProduct(productId: number): Promise<void> {
        await this.proRepo.delete(productId);
    }

    async buildConditions(filter: any)
    {
        const conditions: any = {};

        if (filter.id)
            conditions.id = Equal(filter.id);

        if (filter.name) 
            conditions.name = Raw(alias => `${alias} ILIKE '%${filter.name}%'`);

        if(filter.priceMin)
            conditions.price = MoreThan(filter.priceMin);

        if(filter.priceMax)
            conditions.price = LessThan(filter.priceMax);

        return conditions;
    }
}   
