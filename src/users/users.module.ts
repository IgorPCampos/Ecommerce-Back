import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { UserRepository } from "./users.repository";
import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthRepository } from "../auth/auth.repository";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [PrismaModule, forwardRef(() => AuthModule), JwtModule],
    controllers: [UserController],
    providers: [UserService, UserRepository, AuthRepository],
    exports: [UserService]
})
export class UsersModule {}
