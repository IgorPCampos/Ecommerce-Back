import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersModule } from "../users/users.module";
import { AuthRepository } from "./auth.repository";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET
        }),
        forwardRef(() => UsersModule),
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}
