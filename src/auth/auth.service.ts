import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { Response } from "express";
import { AuthLoginDTO } from "./dto/auth-login.dto";

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {}

    async login(loginDTO: AuthLoginDTO, res: Response) {
        try {
            await this.authRepository.login(loginDTO, res);
            return res.status(200).json({ message: "Login realizado com sucesso" });
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }

    async logout(res: Response): Promise<string> {
        try {
            return this.authRepository.removeToken(res);
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
