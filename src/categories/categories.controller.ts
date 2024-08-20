import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Category, Prisma, Product } from "@prisma/client";
import { CategoryService } from "./categories.service";

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
    async create(@Body() categoryData: Prisma.ProductCreateInput): Promise<Category> {
        const categories = await this.categoryService.create(categoryData);
        return categories;
    }

    @Put(":id")
    async update(@Param() id: number, @Body() data: Prisma.CategoryUpdateInput): Promise<Category> {
        return this.categoryService.update(+id, data);
    }

    @Delete(":id")
    async delete(@Param() id: number): Promise<Category> {
        return this.categoryService.delete(+id);
    }
}
