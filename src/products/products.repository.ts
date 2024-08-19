import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Product, Prisma } from "@prisma/client";

@Injectable()
export class ProductRepository {
    constructor(private prisma: PrismaService) {}

    async findById(id: number): Promise<Product> {
        return await this.prisma.product.findUnique({
            where: {
                id
            }
        });
    }

    async findAll(): Promise<Product[]> {
        return await this.prisma.product.findMany();
    }

    async create(data: Prisma.ProductCreateInput): Promise<Product> {
        return await this.prisma.product.create({
            data: {
                ...data,
                categories: {
                    create: [{ categoryId: data.categories[0] }, { categoryId: data.categories[1] }]
                }
            }
        });
    }

    async update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
        return await this.prisma.product.update({
            where: { id },
            data: {
                ...data
            }
        });
    }

    async delete(id: number): Promise<Product> {
        return await this.prisma.product.delete({
            where: {
                id
            }
        });
    }
}
