import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(account: any): Promise<any> {
        const user = await this.userService.getUser(account.username);
        if (!user) return null;
        const passwordValid = await bcrypt.compare(account.password, user.password)
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, password: user.password };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
