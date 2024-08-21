import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Category, Prisma } from "@prisma/client";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryRepository {
    constructor(private prisma: PrismaService) {}

    async exists(id: number): Promise<boolean> {
        const count = await this.prisma.category.count({
            where: {
                id
            }
        });
        return count > 0;
    }

    async findById(id: number): Promise<Category> {
        return await this.prisma.category.findUnique({
            where: {
                id
            }
        });
    }

    async findAll(): Promise<Category[]> {
        return await this.prisma.category.findMany();
    }

    async create(data: CreateCategoryDto): Promise<Category> {
        return await this.prisma.category.create({ data });
    }

    async update(id: number, data: UpdateCategoryDto): Promise<Category> {
        return await this.prisma.category.update({
            where: { id },
            data: {
                ...data
            }
        });
    }

    async delete(id: number): Promise<Category> {
        return await this.prisma.category.delete({
            where: {
                id
            }
        });
    }
}
