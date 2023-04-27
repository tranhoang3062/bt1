import { NotFoundException } from '@nestjs/common';

class ProductsNotFoundException extends NotFoundException {
    constructor(proId: number) {
        super(`Product with id ${proId} not found`);
    }
}

export default ProductsNotFoundException;