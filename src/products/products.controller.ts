import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "../products/products.service";
import { Product, Prisma, User } from "@prisma/client";
import { ParamId } from "../decorators/param-id.decorator";

@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get(":id")
    async findById(@ParamId("id") id: number): Promise<Product | null> {
        return this.productService.findById(id);
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
    async update(@ParamId() id: number, @Body() data: Prisma.ProductUpdateInput): Promise<Product> {
        return this.productService.update(id, data);
    }

    @Delete(":id")
    async delete(@ParamId() id: number): Promise<Product> {
        return this.productService.delete(id);
    }
}
