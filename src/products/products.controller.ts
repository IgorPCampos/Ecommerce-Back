import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { ProductService } from "../products/products.service";
import { Product } from "@prisma/client";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { FileService } from "../files/files.service";
import { AuthGuard } from "../utility/guards/auth.guard";

@Controller("products")
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly fileService: FileService
    ) {}

    
    @Get("id/:id")
    async findById(@Param("id", ParseIntPipe) id: number): Promise<Product | null> {
        return this.productService.findById(id);
    }

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get(":userId")
    async findAllByUser(@Req() req): Promise<Product[]> {
        const user = req.user
        return this.productService.findAllByUser(user.id);
    }

    @Get("category/:name")
    async findAllByCategory(@Param("name") categoryName: string): Promise<Product[]> {
        return this.productService.findAllByCategory(categoryName);
    }

    @Get("latest")
    async findLatest(): Promise<Product[]> {
        return this.productService.findLatest();
    }

    @UseGuards(AuthGuard)
    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto, @Req() req) {
        const user = req.user
        return this.productService.create(createProductDto, user.id);
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
    async update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateProductDto): Promise<Product> {
        return this.productService.update(id, data);
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number): Promise<Product> {
        return this.productService.delete(id);
    }
}
