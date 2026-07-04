import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    async findByEmail(email:string): Promise<User | null> {
        return this.userRepository.findOne({
            where: {email: email},
        });
    }

    async findById(id:string): Promise<User | null> {
        return this.userRepository.findOne({
            where: {id: id},
        });
    }

    async createUser(name: string, email: string, hashedPassword: string): Promise<User> {
        const user = this.userRepository.create({
            name:name,
            email: email,
            password: hashedPassword,
        });
        return this.userRepository.save(user)
    }
}
