import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {

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

export default UpdateProductDto;