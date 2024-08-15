import { Module } from "@nestjs/common";
import { CategoryService } from "./categories.service";
import { PrismaService } from "../prisma/prisma.service";
import { CategoryController } from "./categories.controller";
import { CategoryRepository } from "./categories.repository";

@Module({
    providers: [CategoryService, PrismaService, CategoryRepository],
    controllers: [CategoryController]
})
export class CategoriesModule {}
