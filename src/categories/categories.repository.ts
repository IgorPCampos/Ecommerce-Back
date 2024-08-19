import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Category, Prisma } from "@prisma/client";

@Injectable()
export class CategoryRepository {
    constructor(private prisma: PrismaService) {}

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

    async create(data: Prisma.CategoryCreateInput): Promise<Category> {
        return await this.prisma.category.create({ data });
    }

    async update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category> {
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
