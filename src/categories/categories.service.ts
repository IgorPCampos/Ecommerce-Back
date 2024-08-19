import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Category, Prisma } from "@prisma/client";
import { CategoryRepository } from "./categories.repository";

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async findById(id: number): Promise<Category | null> {
        try {
            const category = await this.categoryRepository.findById(id);
            if (!category) {
                throw new NotFoundException(`category with id ${id} not found.`);
            }
            return category;
        } catch (error) {
            throw new NotFoundException(`Failed to find category: ${error.message}`);
        }
    }

    async findAll(): Promise<Category[]> {
        try {
            return await this.categoryRepository.findAll();
        } catch (error) {
            throw new NotFoundException(`Failed to find all category: ${error.message}`);
        }
    }

    async create(data: Prisma.CategoryCreateInput): Promise<Category> {
        try {
            return await this.categoryRepository.create(data);
        } catch (error) {
            throw new BadRequestException(`Failed to create category: ${error.message}`);
        }
    }

    async update(id: number, data: Prisma.CategoryUpdateInput): Promise<Category> {
        try {
            return await this.categoryRepository.update(id, data);
        } catch (error) {
            throw new BadRequestException(`Failed to update Category: ${error.message}`);
        }
    }

    async delete(id: number): Promise<Category> {
        try {
            return await this.categoryRepository.delete(id);
        } catch (error) {
            throw new BadRequestException(`Failed to delete Category: ${error.message}`);
        }
    }
}
