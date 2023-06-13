import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'src/common/Response';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200 })
    async registerAccount(@Body() registerDto: RegisterDto) {
        try {

        } catch (e) {
            return new Response(HttpStatus.BAD_REQUEST, {}, e.message);
        }
    }
}
