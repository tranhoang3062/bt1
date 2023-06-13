import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    dob: Date;

    @IsString()
    @ApiProperty()
    gender: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly phone: string;

    @IsString()
    @ApiProperty()
    address: string;
}

export default CreateUserDto;