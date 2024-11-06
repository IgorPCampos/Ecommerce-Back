import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthRepository } from "../../auth/auth.repository";
import { UserRepository } from "../../users/users.repository";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly userRepository: UserRepository
    ) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies["token"];

        if (!token) {
            throw new UnauthorizedException("Token não encontrado");
        }

        try {
            const data = this.authRepository.checkToken(token);
            request.user = await this.userRepository.findById(data.id); 
            return true;
        } catch (error) {
            throw new UnauthorizedException("Token inválido ou expirado");
        }
    }
}
