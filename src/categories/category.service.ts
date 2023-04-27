import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category) 
        private cateRepo: Repository<Category>,
    ) { }

    async getCategories(filter: any, paging: any, req: any) {
        
        return await this.cateRepo.findAndCount({
            order: {
                id: 'ASC'
            },
            take: paging.page_size,
            skip: ((paging.page - 1) * paging.page_size),
        });
    }

    async getCategoryById(categoryId: number): Promise<Category> {
        // return await this.proRepo.find({
        //     where: { id: productId }
        // });
        return await this.cateRepo.findOneBy({ id: categoryId });
    }

    async createCategory(newCategory) {
        let newCate = await this.cateRepo.create({
            ...newCategory
        });
        await this.cateRepo.save(newCate);
        return newCate;
    }
}