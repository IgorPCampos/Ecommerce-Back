import { Module } from "@nestjs/common";
import { ProductService } from "./products.service";
import { ProductController } from "./products.controller";
import { PrismaService } from "../prisma/prisma.service";
import { ProductRepository } from "./products.repository";
import { MulterModule } from "@nestjs/platform-express";

@Module({
    imports: [
        MulterModule.register({
            dest: "./uploads"
        })
    ],
    providers: [ProductService, ProductRepository, PrismaService],
    controllers: [ProductController]
})
export class ProductsModule {}
