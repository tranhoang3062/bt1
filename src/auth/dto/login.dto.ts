import { IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    @MinLength(5)
    @MaxLength(100)
    username: string;
  
    @IsString()
    @MinLength(5)
    @MaxLength(100)
    password: string;
}