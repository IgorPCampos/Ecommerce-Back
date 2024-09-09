import { Injectable } from "@nestjs/common";
import { File } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FileRepository {
    constructor(private prisma: PrismaService) {}

    async saveFileForProduct(filename: string, mimetype: string, path: string, productId: number) {
        return this.prisma.file.create({
            data: {
                filename,
                mimetype,
                path,
                product: {
                    connect: { id: productId }
                }
            }
        });
    }

    async exists(id: number): Promise<boolean> {
        const count = await this.prisma.file.count({
            where: {
                id
            }
        });
        return count > 0;
    }

    async findById(id: number): Promise<File> {
        return this.prisma.file.findUnique({
            where: {
                id
            }
        });
    }

    async findAll(): Promise<File[]> {
        return this.prisma.file.findMany({
            include: {
                product: true
            }
        });
    }
}
