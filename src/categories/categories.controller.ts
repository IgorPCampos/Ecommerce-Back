import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Category, Prisma, Product } from "@prisma/client";
import { CategoryService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get(":id")
    async findById(@Param("id") id: number): Promise<Category | null> {
        const category = await this.categoryService.findById(+id);
        return category;
    }

    @Get()
    async findAll(): Promise<Category[]> {
        const categories = await this.categoryService.findAll();
        return categories;
    }

    @Post()
    async create(@Body() data: CreateCategoryDto): Promise<Category> {
        const categories = await this.categoryService.create(data);
        return categories;
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() data: UpdateCategoryDto): Promise<Category> {
        return this.categoryService.update(+id, data);
    }

    @Delete(":id")
    async delete(@Param("id") id: number): Promise<Category> {
        return this.categoryService.delete(+id);
    }
}
