import { Module } from "@nestjs/common";
import { FileService } from "./files.service";
import { PrismaService } from "../prisma/prisma.service";
import { FileRepository } from "./file.repository";
import { FileController } from "./files.controller";

@Module({
    providers: [FileService, PrismaService, FileRepository],
    controllers: [FileController],
    exports: [FileService, FileRepository]
})
export class FileModule {}
