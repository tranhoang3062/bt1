import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entities';
import { EntityRepository } from 'typeorm';

@Injectable()
@EntityRepository(ProductEntity)

export class ProductReposity {
    
}