import { Injectable } from "@nestjs/common";
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
}
