import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Product, Prisma } from "@prisma/client";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductRepository {
    constructor(private prisma: PrismaService) {}

    async exists(id: number): Promise<boolean> {
        const count = await this.prisma.product.count({
            where: {
                id
            }
        });
        return count > 0;
    }

    async findById(id: number): Promise<Product> {
        return this.prisma.product.findUnique({
            where: {
                id
            }
        });
    }

    async findAll(): Promise<Product[]> {
        return this.prisma.product.findMany({
            include: {
                categories: true
            }
        });
    }

    async findAllByUser(userId: number) {
        return this.prisma.product.findMany({
            where: {
                userId: userId,
            },
        });
    }

    async findAllByCategory(categoryName: string) {
        return this.prisma.product.findMany({
            where: {
                categories: {
                    some: {
                        category: {
                            name: categoryName
                        }
                    }
                }
            },
            include: {
                categories: true
            }
        });
    }

    async findLatest() {
        return this.prisma.product.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 8,
            include: {
                categories: true,
            },
        });
    }
    
    async create(createProductDto: CreateProductDto, userId: number) {
        const { categories, ...productData } = createProductDto;
        return this.prisma.product.create({
            data: {
                ...productData,
                userId,
                categories: {
                    create: categories.map((categoryId) => ({
                        category: { connect: { id: categoryId } }
                    }))
                }
            },
            include: { categories: true }
        });
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        const { categories, ...productData } = updateProductDto;

        await this.prisma.product.update({
            where: { id },
            data: productData
        });

        if (categories) {
            await this.prisma.categoriesOnProducts.deleteMany({
                where: { productId: id }
            });

            await this.prisma.categoriesOnProducts.createMany({
                data: categories.map((categoryId) => ({
                    productId: id,
                    categoryId: categoryId
                }))
            });
        }

        return this.prisma.product.findUnique({
            where: { id },
            include: { categories: true }
        });
    }

    async delete(id: number): Promise<Product> {
        await this.prisma.categoriesOnProducts.deleteMany({
            where: { productId: id }
        });

        return this.prisma.product.delete({
            where: {
                id
            }
        });
    }
}
