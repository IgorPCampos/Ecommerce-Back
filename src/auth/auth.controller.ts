import {
    Body,
    Controller,
    Get,
    Post,

} from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post("login")
    async login(@Body() { email, password }: AuthLoginDTO) {
        return this.authService.login(email, password);
    }

    // @Post("forget")
    // async forget(@Body() { email }: AuthForgetDTO) {
    //     return this.authService.forget(email);
    // }

    // @Post("reset")
    // async reset(@Body() { password, token }: AuthResetDTO) {
    //     return this.authService.reset(password, token);
    // }

    // @UseGuards(AuthGuard)
    // @Post("me")
    // async me(@UserFilter("email") user) {
    //     return { user };
    // }

}
