import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductService } from "../products/products.service";
import { Product, Prisma } from "@prisma/client";
import { ParamId } from "../decorators/param-id.decorator";

@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get(":id")
    async findById(@ParamId("id") id: number): Promise<Product | null> {
        const product = await this.productService.findById(id);
        return product;
    }

    @Get()
    async findAll(): Promise<Product[]> {
        const products = await this.productService.findAll();
        return products;
    }

    @Post()
    async create(@Body() productData: Prisma.ProductCreateInput): Promise<Product> {
        const product = await this.productService.create(productData);
        return product;
    }
}
