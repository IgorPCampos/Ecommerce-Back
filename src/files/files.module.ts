import { Module } from "@nestjs/common";
import { FileService } from "./files.service";
import { PrismaService } from "../prisma/prisma.service";
import { FileRepository } from "./file.repository";

@Module({
    providers: [FileService, PrismaService, FileRepository],
    exports: [FileService, FileRepository]
})
export class FileModule {}
