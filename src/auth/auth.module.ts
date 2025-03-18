import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersModule } from "../users/users.module";
import { AuthRepository } from "./auth.repository";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TokenService } from "./token.service";

@Module({
    imports: [
        ConfigModule, 
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService], 
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET') || 'chave_padrao',
                signOptions: { expiresIn: '1h' },
            }),
        }),
        forwardRef(() => UsersModule),
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, TokenService],
    exports: [AuthService, JwtModule, AuthRepository, TokenService]
})
export class AuthModule {}
