import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Param, 
    Body,
    HttpCode,
    HttpStatus,
    Request,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from '../common/Response';
import { Paging } from '../common/Paging';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('product')
export class ProductController {
    constructor(private proService: ProductService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    // @ApiResponse({ status: 200, description: 'Success' })
    async getProducts(
        @Request() req: any
    ) {
        try {
            const filter = await this.buildFilter(req);

            const paging = {
                page: req.query.page || 1,
                page_size: req.query.page_size || 5,
            }

            let products: any = await this.proService.getProducts(filter, paging, req);
            let pagingRes = new Paging(paging.page, paging.page_size, products[1]);
            
            return new Response(HttpStatus.OK, products[0], 'success', pagingRes);
        } catch (e) {
            console.log('[ Product --- getListProducts ]: ', e.message);
            return new Response(HttpStatus.BAD_REQUEST, {}, e.message);
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getProductById(@Param('id') productId: number) {
        try {
            const response = await this.proService.getProductById(productId);
            return new Response(HttpStatus.OK, response, 'success');
        } catch (e) {
            return new Response(HttpStatus.BAD_REQUEST, {}, e.message);
        }
    }

    @Post('create')
    @HttpCode(HttpStatus.OK)
    async addProduct(@Body() createProDto: CreateProductDto) {
        try {
            return new Response(
                HttpStatus.CREATED, 
                await this.proService.createProduct(createProDto),
                'Create successfully!'
            );
        } catch (e) {
            return new Response(HttpStatus.BAD_REQUEST, {}, e.message);
        }
    }

    @Put('edit/:id')
    @HttpCode(HttpStatus.OK)
    async updateProduct(@Param('id') productId: number, @Body() updateProDto: UpdateProductDto) {
        try {
            return new Response(
                HttpStatus.OK,
                await this.proService.updateProduct(productId, updateProDto),
                'Update successfully!'
            );
        } catch (e) {
            return new Response(HttpStatus.BAD_REQUEST, {}, e.message);
        }
    }

    @Delete('delete/:id')
    async deleteProduct(@Param('id') id: number) {
        try {
            let message;
            let product = await this.proService.getProductById(id);

            if (!product)
                message = 'Product does not exist!';
            else
                message = 'Delete successfully!';

            await this.proService.deleteProduct(id);
            return new Response(
                HttpStatus.OK,
                {},
                message
            )
        } catch (e) {
            return new Response(HttpStatus.BAD_REQUEST, {}, e.message);
        }
    }

    async buildFilter(@Request() req: any)
    {
        const filter = {
            id: req.query.id || null,
            name: req.query.name || '',
            description: req.query.description || '',
            price: req.query.description || '',
        };

        return filter;
    }
}
