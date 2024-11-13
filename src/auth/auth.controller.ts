import { Body, Controller, Post, Res, Get, Req } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get("checkToken")
    async checkToken(@Req() req: Request, @Res() res: Response) {
        const token = req.cookies?.token;
        try {
            const isValid = await this.authService.checkToken(token);
            return res.status(200).json({ isAuthenticated: isValid });
        } catch (error) {
            return res.status(200).json({ isAuthenticated: false });
        }
    }

    @Post("login")
    async login(@Body() { email, password }: AuthLoginDTO, @Res() res: Response) {
        return this.authService.login(email, password, res);
    }

    @Post("logout")
    async logout(@Res() res: Response) {
        return this.authService.logout(res);
    }
}
