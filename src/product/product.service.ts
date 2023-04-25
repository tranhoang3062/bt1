import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product) 
        private proRepo: Repository<Product>,
    ) { }

    async getProducts(filter: any, paging: any, req: any) {
        
        return await this.proRepo.findAndCount({
            order: {
                id: 'ASC'
            },
            take: paging.page_size,
            skip: ((paging.page - 1) * paging.page_size),
        });

        // const conditions: any = { };
        // conditions.status = Equal(1);
        // return this.proRepo.findAndCount({
        //     where: conditions,
        // });
    }

    async getProductById(productId: number): Promise<Product | null> {
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
        }

        await this.proRepo.update(productId, dataUpdate);
        return this.proRepo.findOneBy({ id: productId })
    }

    async deleteProduct(productId: number): Promise<void> {
        await this.proRepo.delete(productId);
    }
}   
