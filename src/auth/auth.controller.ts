import { Body, Controller, Post, Res, Get, Req } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly tokenService: TokenService
    ) {}

    @Get("verifyToken")
    async verifyToken(@Req() req: Request, @Res() res: Response) {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ isAuthenticated: false, message: "Token não encontrado." });
        }

        try {
            const isValid = await this.tokenService.verifyToken(token);
            return res.status(200).json({ isAuthenticated: isValid });
        } catch (error) {
            return res.status(401).json({ isAuthenticated: false, message: error.message });
        }
    }

    @Post("login")
    async login(@Body() loginDTO: AuthLoginDTO, @Res() res: Response) {
        return this.authService.login(loginDTO, res);
    }

    @Post("logout")
    async logout(@Res() res: Response) {
        return this.authService.logout(res);
    }
}
