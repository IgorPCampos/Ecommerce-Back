import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    createToken(user: User) {
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

        return accessToken;
    }

    verifyToken(token: string) {
        try {
            return this.jwtService.verify(token, {
                audience: "users",
                issuer: "login"
            });
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                throw new UnauthorizedException("Token expirado. Por favor, faça login novamente.");
            }
            throw new UnauthorizedException("Token inválido. Por favor, forneça um token válido.");
        }
    }
}
