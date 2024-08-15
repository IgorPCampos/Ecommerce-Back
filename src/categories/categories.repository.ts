import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Category, Prisma } from "@prisma/client";

@Injectable()
export class CategoryRepository {
    constructor(private prisma: PrismaService) {}

    async findById(id: number): Promise<Category> {
        return await this.prisma.category.findUnique({
            where: {
                id
            }
        });
    }

    async findAll(): Promise<Category[]> {
        return await this.prisma.category.findMany();
    }

    async create(data: Prisma.CategoryCreateInput): Promise<Category> {
        return await this.prisma.category.create({ data });
    }

    // async update ( params: {
    //     id: number;
    //     data: any;
    // } ): Promise<Categorys>
    // {
    //     const { id, data } = params;
    //     const numberId = Number( id );

    //     return await this.prisma.Category.update( {
    //         data,
    //         where: {
    //             id: numberId
    //         },
    //     } );
    // };

    // async delete ( id: number ): Promise<Categorys>
    // {
    //     const numberId = Number( id );
    //     return await this.prisma.Category.delete( {
    //         where: {
    //             id: numberId
    //         },
    //     } );
    // };
}
