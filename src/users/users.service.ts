import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User, Prisma } from "@prisma/client";
import { UserRepository } from "./users.repository";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async findByEmail(email: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new NotFoundException(`User with email ${email} not found.`);
            }
            return user;
        } catch (error) {
            throw new NotFoundException(`Failed to find user: ${error.message}`);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            return await this.userRepository.findAll();
        } catch (error) {
            throw new NotFoundException(`Failed to find all users: ${error.message}`);
        }
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        try {
            const saltOrRounds = 10;
            const password = data.password;
            const hash = await bcrypt.hash(password, saltOrRounds);
            const param = {
                name: data.name,
                email: data.email,
                password: hash
            };
            return await this.userRepository.create(param);
        } catch (error) {
            throw new BadRequestException(`Failed to create user: ${error.message}`);
        }
    }
}
