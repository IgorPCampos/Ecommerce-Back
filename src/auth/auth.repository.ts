import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthRepository {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    createToken(user: User) {
        return {
            accessToken: this.jwtService.sign(
                {
                    id: user.id,
                },
                {
                    expiresIn: "7 days",
                    subject: String(user.id),
                    issuer: "login",
                    audience: "users"
                }
            )
        };
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            throw new UnauthorizedException("Email e/ou senha incorretos");
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException("Email e/ou senha incorretos");
        }

        return this.createToken(user);
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
}
