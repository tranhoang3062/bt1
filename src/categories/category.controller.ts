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
import { CategoryService } from './category.service';
import CreateCategoryDto from './dto/createCategory.dto';

@Controller('category')
export class CategoryController {

    constructor(
        private cateService: CategoryService,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'success' })
    async getCategory(
        @Request() req: any
    ) {
        try {

            const filter = await this.buildFilter(req);

            const paging = {
                page: req.query.page || 1,
                page_size: req.query.page_size || 5,
            }

            let categories: any = await this.cateService.getCategories(filter, paging, req);
            let pagingRes = new Paging(paging.page, paging.page_size, categories[1]);
            
            return new Response(HttpStatus.OK, categories[0], 'success', pagingRes);
        } catch (e) {
            console.log('[ Category --- getListCategories ]: ', e.message);
            return new Response(HttpStatus.BAD_REQUEST, {}, e.message);
        }
    }

    @Post('create')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'success' })
    async addProduct(@Body() createCateDto: CreateCategoryDto) {
        try {
            return new Response(
                HttpStatus.CREATED, 
                await this.cateService.createCategory(createCateDto),
                'Create successfully!'
            );
        } catch (e) {
            return new Response(HttpStatus.BAD_REQUEST, {}, e.message);
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'success' })
    async getProductById(@Param('id') cateId: number) {
        try {
            const response = await this.cateService.getCategoryById(cateId);
            return new Response(HttpStatus.OK, response, 'success');
        } catch (e) {
            return new Response(HttpStatus.BAD_REQUEST, {}, e.message);
        }
    }

    async buildFilter(@Request() req: any)
    {
        const filter = {
            id: req.query.id || null,
            name: req.query.name || '',
        };

        return filter;
    }

}