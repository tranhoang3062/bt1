import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
import { create } from 'domain';

@Controller('product')
export class ProductController {
    constructor(private proService: ProductService) { }

    @Get()
    async getProducts() {
        const products = await this.proService.getProducts();
        return products;
    }

    @Get(':productId')
    async getProduct(@Param('productId') productId) {
        const product = await this.proService.getProductById(productId);
        return product;
    }

    @Post('create')
    async addProduct(@Body() createProDto: ProductDto) {
        const product = await this.proService.addProduct(createProDto);
        return product;
    }

    @Put('edit/:productId')
    async updateProduct(@Param('productId') productId, @Body() updateProDto: ProductDto) {
        const product = await this.proService.updateProduct(productId, updateProDto);
        return product;
    }

    @Delete('delete/:productId')
    async deleteProduct(@Query() query) {
        const product = await this.proService.deleteProduct(query.productId);
        return product;
    }
}
