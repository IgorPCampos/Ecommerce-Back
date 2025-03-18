import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../../users/users.repository";
import { TokenService } from "src/auth/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly tokenService: TokenService,
        private readonly userRepository: UserRepository
    ) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies["token"];

        if (!token) {
            throw new UnauthorizedException("Token não encontrado");
        }

        try {
            const data = this.tokenService.verifyToken(token);
            request.user = await this.userRepository.findById(data.id); 
            return true;
        } catch (error) {
            throw new UnauthorizedException("Token inválido ou expirado");
        }
    }
}
