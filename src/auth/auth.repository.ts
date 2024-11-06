import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class AuthRepository {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    createToken(user: User, res: Response) {
        const accessToken = this.jwtService.sign(
            {
                id: user.id
            },
            {
                expiresIn: "7d",
                subject: String(user.id),
                issuer: "login",
                audience: "users"
            }
        );

        res.cookie("token", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 7000
        });

        return { accessToken };
    }

    async login(email: string, password: string, res: Response) {
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

        return this.createToken(user, res);
    }

    checkToken(token: string) {
        try {
            return this.jwtService.verify(token, {
                audience: "users",
                issuer: "login"
            });
        } catch (error) {
            throw new UnauthorizedException("Token inválido ou expirado");
        }
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
