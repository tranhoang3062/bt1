import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateProductDto {

    name: string;
    desciption: string;
    price: number;

}

export default CreateProductDto;