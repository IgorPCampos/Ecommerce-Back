import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
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
        const { authorization } = request.headers;
        try {
            const data = this.authRepository.checkToken((authorization ?? "").split(" ")[1]);

            request.token = data;
            request.user = await this.userRepository.findById(data.id);
            return true;
        } catch (error) {
            return false;
        }
    }
}
