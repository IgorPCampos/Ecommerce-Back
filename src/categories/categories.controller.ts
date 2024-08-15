import { Body, Controller, Get, Post } from "@nestjs/common";
import { Category, Prisma } from "@prisma/client";
import { ParamId } from "../decorators/param-id.decorator";
import { CategoryService } from "./categories.service";

@Controller("categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get(":id")
    async findById(@ParamId("id") id: number): Promise<Category | null> {
        const category = await this.categoryService.findById(id);
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
}
