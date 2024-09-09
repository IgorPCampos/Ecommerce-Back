import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { FileRepository } from "./file.repository";
import { File } from "@prisma/client";

@Injectable()
export class FileService {
    constructor(private readonly fileRepository: FileRepository) {}

    async saveFileForProduct(filename: string, mimetype: string, path: string, productId: number) {
        try {
            return await this.fileRepository.saveFileForProduct(filename, mimetype, path, productId);
        } catch (error) {
            throw new BadRequestException(`Failed to create file: ${error.message}`);
        }
    }

    async findById(id: number): Promise<File | null> {
        const exists = await this.fileRepository.exists(id);
        if (!exists) {
            throw new NotFoundException(`File with id ${id} not found`);
        }

        return await this.fileRepository.findById(id);
    }

    async findAll(): Promise<File[]> {
        try {
            return await this.fileRepository.findAll();
        } catch (error) {
            throw new NotFoundException(`Failed to find all files: ${error.message}`);
        }
    }
}
