import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "../products/products.service";
import { Product, Prisma, User } from "@prisma/client";

@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get(":id")
    async findById(@Param("id") id: number): Promise<Product | null> {
        return this.productService.findById(+id);
    }

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Post()
    async create(@Body() productData: Prisma.ProductCreateInput): Promise<Product> {
        return this.productService.create(productData);
    }

    @Put(":id")
    async update(@Param() id: number, @Body() data: Prisma.ProductUpdateInput): Promise<Product> {
        return this.productService.update(+id, data);
    }

    @Delete(":id")
    async delete(@Param() id: number): Promise<Product> {
        return this.productService.delete(+id);
    }
}
