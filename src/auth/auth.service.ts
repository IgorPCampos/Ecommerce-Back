import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {}

    createToken(user: User) {
        try {
            return this.authRepository.createToken(user);
        } catch (error) {
            throw new NotFoundException(`Failed to create token: ${error.message}`);
        }
    }

    async login(email: string, password: string) {
        try {
            return await this.authRepository.login(email, password);
        } catch (error) {
            throw new NotFoundException(`Failed to login: ${error.message}`);
        }
        
    }
}
