import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Param, 
    Body,
    HttpCode,
    HttpStatus,
    Request,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'src/common/Response';
import { Paging } from 'src/common/Paging';
import { UserService } from './user.service';
import CreateUserDto from './dto/createUser.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    async buildProfile(@Request() req: any)
    {
        const filter = {

        };

        return filter;
    }

    @Post('/signup')
    async register(@Body('createUser') createUser: CreateUserDto) {
        try {
            if (!createUser) return new Response(404, {}, 'No data to post');
            if (!createUser.username) return new Response(400, {}, 'Username is null');
            if (!createUser.password) return new Response(400, {}, 'Password is null');

            return new Response(
                HttpStatus.CREATED,
                await this.userService.registerUser(createUser),
                'Sign up successfully!'
            );
        } catch (e) {
            return new Response(HttpStatus.BAD_REQUEST, {}, e.message);
        }
    }

    @Post('/signin')
    async login() {

    }
}
