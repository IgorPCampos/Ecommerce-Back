import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProductService } from "../products/products.service";
import { Product, Prisma, User } from "@prisma/client";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { FileService } from "../files/files.service";

@Controller("products")
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly fileService: FileService
    ) {}

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
    async createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Post(":productId/upload")
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./uploads", 
                filename: (req, file, callback) => {
                    const uniqueSuffix = `${Date.now()}${extname(file.originalname)}`;
                    callback(null, uniqueSuffix); 
                }
            })
        })
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Param("productId") productId: number) {
        const { filename, mimetype, path } = file;
        const filePath = `/uploads/${filename}`;

        const savedFile = await this.fileService.saveFileForProduct(filename, mimetype, filePath, +productId);
        return { file: savedFile };
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
