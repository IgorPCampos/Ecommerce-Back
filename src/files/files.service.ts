import { BadRequestException, Injectable } from "@nestjs/common";
import { FileRepository } from "./file.repository";

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
}
