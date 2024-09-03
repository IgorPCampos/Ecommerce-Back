import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProductService } from "../products/products.service";
import { Product, Prisma, User } from "@prisma/client";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get("id/:id")
    async findById(@Param("id") id: number): Promise<Product | null> {
        return this.productService.findById(+id);
    }

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get("name/:name")
    async findAllByCategory(@Param("name") categoryName: string): Promise<Product[]> {
        return this.productService.findAllByCategory(categoryName);
    }

    @Get("latest")
    async findLatest(): Promise<Product[]> {
        return this.productService.findLatest();
    }

    @Post()
    @UseInterceptors(FileInterceptor("image"))
    async createProduct(@Body() createProductDto: CreateProductDto, @UploadedFile() image: Express.Multer.File) {
        return this.productService.create(createProductDto, image);
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
