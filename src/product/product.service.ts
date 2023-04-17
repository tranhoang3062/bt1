import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { data } from './product-data';
import { ProductReposity } from './product.repository';

@Injectable()
export class ProductService {

    // constructor(
    //     @InjectRepository(ProductReposity)
    //     private readonly proRepo: ProductReposity,
    // ) { }

    productData = data;

    async getProducts() {
        return this.productData;
    }

    async getProductById(productId) {
        const product = this.productData.find(item => item.id == productId);
        if (!product) {
            throw new HttpException('Product does not exist', 404);
        }
        return product;
    }

    async addProduct(newProduct) {
        const product = this.productData.find(item => item.id == newProduct.id)
        if (!product)
            this.productData.push(newProduct);
        else
            throw new HttpException('Product already exist', 404)
        return this.productData;
    }

    async updateProduct(productId, updateProduct) {
        const product = this.productData.find(item => {
            if (item.id == productId) {
                item.name = updateProduct.name || null;
                item.description = updateProduct.description || null;
                item.price = updateProduct.price || null;
                return item;
            }
        });
        if (!product) {
            throw new HttpException('Product does not exist', 404);
        }
        return product;
    }

    async deleteProduct(productId) {
        let index = this.productData.findIndex(item => item.id == productId);
        if (index === -1)
            throw new HttpException('Product does not exist', 404);
        this.productData.splice(index, 1);
        return this.productData;
    }
}   
