import { Module } from "@nestjs/common";
import { ProductService } from "./products.service";
import { ProductController } from "./products.controller";
import { PrismaService } from "../prisma/prisma.service";
import { ProductRepository } from "./products.repository";
import { MulterModule } from "@nestjs/platform-express";
import { FileService } from "../files/files.service";
import { FileModule } from "../files/files.module";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [
        MulterModule,
        FileModule,
        AuthModule,
        UsersModule  
    ],
    providers: [ProductService, ProductRepository, PrismaService, FileService],
    controllers: [ProductController]
})
export class ProductsModule {}
