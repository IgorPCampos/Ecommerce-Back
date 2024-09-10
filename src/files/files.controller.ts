import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { File } from "@prisma/client";
import { FileService } from "../files/files.service";

@Controller("files")
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Get(":id")
    async findById(@Param("id", ParseIntPipe) id: number): Promise<File | null> {
        return this.fileService.findById(id);
    }

    @Get()
    async findAll(): Promise<File[]> {
        return this.fileService.findAll();
    }
}
