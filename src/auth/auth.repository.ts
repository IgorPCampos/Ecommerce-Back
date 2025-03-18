import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { TokenService } from "./token.service";

@Injectable()
export class AuthRepository {
    constructor(
        private readonly prisma: PrismaService,
        private readonly tokenService: TokenService
    ) {}

    async login(loginDTO: AuthLoginDTO, res: Response) {
        const { email, password } = loginDTO;
        const user = await this.prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            throw new UnauthorizedException("Email e/ou senha incorretos");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Email e/ou senha incorretos");
        }

        const accessToken = this.tokenService.createToken(user);

        res.cookie("token", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 7000
        });

        return { accessToken };
    }

    removeToken(res: Response): any {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        return res.status(200).json({ message: "Logout realizado com sucesso" });
    }
}
