import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "../products/products.service";
import { Product, Prisma, User } from "@prisma/client";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

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
    async create(@Body() data: CreateProductDto): Promise<Product> {
        return this.productService.create(data);
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() data: UpdateProductDto): Promise<Product> {
        return this.productService.update(+id, data);
    }

    @Delete(":id")
    async delete(@Param("id") id: number): Promise<Product> {
        return this.productService.delete(+id);
    }
}
