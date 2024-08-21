import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Category, Prisma } from "@prisma/client";
import { CategoryRepository } from "./categories.repository";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async findById(id: number): Promise<Category | null> {
        const exists = await this.categoryRepository.exists(id);
        if (!exists) {
            throw new NotFoundException(`Category with id ${id} not found`);
        }

        return await this.categoryRepository.findById(id);
    }

    async findAll(): Promise<Category[]> {
        try {
            return await this.categoryRepository.findAll();
        } catch (error) {
            throw new NotFoundException(`Failed to find all category: ${error.message}`);
        }
    }

    async create(data: CreateCategoryDto): Promise<Category> {
        try {
            return await this.categoryRepository.create(data);
        } catch (error) {
            throw new BadRequestException(`Failed to create category: ${error.message}`);
        }
    }

    async update(id: number, data: UpdateCategoryDto): Promise<Category> {
        const exists = await this.categoryRepository.exists(id);
        if (!exists) {
            throw new NotFoundException(`Category with id ${id} not found`);
        }

        return await this.categoryRepository.update(id, data);
    }

    async delete(id: number): Promise<Category> {
        const exists = await this.categoryRepository.exists(id);
        if (!exists) {
            throw new NotFoundException(`Category with id ${id} not found`);
        }

        return await this.categoryRepository.delete(id);
    }
}
