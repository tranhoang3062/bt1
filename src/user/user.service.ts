import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRepo: Repository<User>,
    ) { }

    async registerUser(newUser) {
        let newAccount = await this.userRepo.create({ ...newUser });
        await this.userRepo.save(newAccount);
        return newAccount;
    }

    async getUser(data) {
        return this.userRepo.findOne(data);
    }
}
