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
    Res,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'src/common/Response';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('product')
export class ProductController {
    constructor(private proService: ProductService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    // @ApiResponse({ status: 200, description: 'Success' })
    async getProducts() {
        try {
            const response = await this.proService.getProducts();
            return new Response(HttpStatus.OK, response, 'Successful!');
        } catch (e) {
            return new Response(HttpStatus.BAD_REQUEST, {}, e.message);
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getProductById(@Param('id') productId) {
        try {
            const response = await this.proService.getProductById(productId);
            return new Response(HttpStatus.OK, response, 'Successful!');
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
                'Created successfully!'
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
    async deleteProduct(@Param() param) {
        try {
            let message;
            let product = await this.proService.getProductById(param.id);

            if (!product)
                message = 'Product does not exist!';
            else
                message = 'Delete successfully!';

            await this.proService.deleteProduct(param.id);
            return new Response(
                HttpStatus.OK,
                {},
                message
            )
        } catch (e) {
            return new Response(HttpStatus.BAD_REQUEST, {}, e.message);
        }
    }
}
