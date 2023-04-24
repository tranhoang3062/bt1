import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateProductDto {

    name: string;
    description: string;
    price: number;

}

export default UpdateProductDto;