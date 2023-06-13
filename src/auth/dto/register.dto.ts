import { IsString, MaxLength, MinLength } from "class-validator";


export class RegisterDto {

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    username: string;

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    email: string;

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    phone_number: string;

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    password: string;

    @IsString()
    @MinLength(5)
    @MaxLength(100)
    password_confirmation: string;

    gender?: string | 'other';
    dob?: Date | '01/01/1999';
}