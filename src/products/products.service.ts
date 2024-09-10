import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Product, Prisma } from "@prisma/client";
import { ProductRepository } from "./products.repository";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async findById(id: number): Promise<Product | null> {
        const exists = await this.productRepository.exists(id);
        if (!exists) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        return await this.productRepository.findById(id);
    }

    async findAll(): Promise<Product[]> {
        try {
            return await this.productRepository.findAll();
        } catch (error) {
            throw new NotFoundException(`Failed to find all products: ${error.message}`);
        }
    }

    async findAllByUser(userId: number): Promise<Product[]> {
        try {
            return await this.productRepository.findAllByUser(userId);
        } catch (error) {
            throw new NotFoundException(`Failed to find all products: ${error.message}`);
        }
    }

    async findAllByCategory(categoryName: string): Promise<Product[]> {
        try {
            return await this.productRepository.findAllByCategory(categoryName);
        } catch (error) {
            throw new NotFoundException(`Failed to find all products: ${error.message}`);
        }
    }

    async findLatest(): Promise<Product[]> {
        try {
            return await this.productRepository.findLatest();
        } catch (error) {
            throw new NotFoundException(`Failed to find all products: ${error.message}`);
        }
    }

    async create(data: CreateProductDto, userId: number): Promise<Product> {
        try {
            return await this.productRepository.create(data, userId);
        } catch (error) {
            throw new BadRequestException(`Failed to create product: ${error.message}`);
        }
    }

    async update(id: number, data: UpdateProductDto): Promise<Product> {
        const exists = await this.productRepository.exists(id);
        if (!exists) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        return await this.productRepository.update(id, data);
    }

    async delete(id: number): Promise<Product> {
        const exists = await this.productRepository.exists(id);
        if (!exists) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        return await this.productRepository.delete(id);
    }
}
