import { Module } from "@nestjs/common";
import { ProductService } from "./products.service";
import { ProductController } from "./products.controller";
import { PrismaService } from "../prisma/prisma.service";
import { ProductRepository } from "./products.repository";

@Module({
    providers: [ProductService, ProductRepository, PrismaService],
    controllers: [ProductController]
})
export class ProductsModule {}
