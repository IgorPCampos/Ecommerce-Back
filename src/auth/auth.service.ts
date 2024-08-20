import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
    ) {}

    createToken(user: User) {
        return this.authRepository.createToken(user)
    }

    async login(email: string, password: string) {
        return this.authRepository.login(email, password) 
    }

    

}
