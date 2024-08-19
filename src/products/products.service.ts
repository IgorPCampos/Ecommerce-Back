import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Product, Prisma } from "@prisma/client";
import { ProductRepository } from "./products.repository";

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async findById(id: number): Promise<Product | null> {
        try {
            const product = await this.productRepository.findById(id);
            if (!product) {
                throw new NotFoundException(`Product with id ${id} not found.`);
            }
            return product;
        } catch (error) {
            throw new NotFoundException(`Failed to find product: ${error.message}`);
        }
    }

    async findAll(): Promise<Product[]> {
        try {
            return await this.productRepository.findAll();
        } catch (error) {
            throw new NotFoundException(`Failed to find all products: ${error.message}`);
        }
    }

    async create(data: Prisma.ProductCreateInput): Promise<Product> {
        try {
            return await this.productRepository.create(data);
        } catch (error) {
            throw new BadRequestException(`Failed to create product: ${error.message}`);
        }
    }

    async update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
        try {
            return await this.productRepository.update(id, data);
        } catch (error) {
            throw new BadRequestException(`Failed to update product: ${error.message}`);
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            return await this.productRepository.delete(id);
        } catch (error) {
            throw new BadRequestException(`Failed to delete product: ${error.message}`);
        }
    }
}
