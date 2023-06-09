import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsString()
    @ApiProperty()
    avatar: string;

    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsNotEmpty()
    @ApiProperty()
    hot: number;

    @ApiProperty()
    category_id: number;
}

export default CreateProductDto;