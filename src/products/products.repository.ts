import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Product, Prisma } from "@prisma/client";

@Injectable()
export class ProductRepository {
    constructor(private prisma: PrismaService) {}

    async findById(id: number): Promise<Product> {
        return await this.prisma.product.findUnique({
            where: {
                id
            }
        });
    }

    async findAll(): Promise<Product[]> {
        return await this.prisma.product.findMany();
    }

    async create(data: Prisma.ProductCreateInput): Promise<Product> {
        return await this.prisma.product.create({ data });
    }

    // async update ( params: {
    //     id: number;
    //     data: any;
    // } ): Promise<Products>
    // {
    //     const { id, data } = params;
    //     const numberId = Number( id );

    //     return await this.prisma.product.update( {
    //         data,
    //         where: {
    //             id: numberId
    //         },
    //     } );
    // };

    // async delete ( id: number ): Promise<Products>
    // {
    //     const numberId = Number( id );
    //     return await this.prisma.product.delete( {
    //         where: {
    //             id: numberId
    //         },
    //     } );
    // };
}
