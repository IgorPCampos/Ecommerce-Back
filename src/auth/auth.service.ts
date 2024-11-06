import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";
import { AuthRepository } from "./auth.repository";
import { Response } from "express";

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {}

    async checkToken(token: string): Promise<boolean> {
        try {
            const teste = await this.authRepository.checkToken(token);
            console.log("teste", teste)
            return teste
        } catch (error) {
            throw new UnauthorizedException('Token inválido ou expirado');
        }
    }

    async login(email: string, password: string, res: Response) {
        try {
            await this.authRepository.login(email, password, res);
            return res.status(200).json({ message: "Login realizado com sucesso" });
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async logout(res: Response): Promise<string> {
        try {
            return this.authRepository.removeToken(res);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
