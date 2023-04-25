import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    desciption: string;

    @IsNotEmpty()
    @ApiProperty()
    price: number;

}

export default CreateProductDto;