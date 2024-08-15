import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User, Prisma } from "@prisma/client";

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    async findByEmail(email: string): Promise<User | null> {
        const findOne = await this.prisma.user.findFirst({
            where: {
                email
            }
        });
        return findOne;
    }

    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }

    async create(data: any): Promise<User> {
        return await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        });
    }

    async update(params: { id: number; data: Prisma.UserUpdateInput }): Promise<User> {
        const { id, data } = params;
        const numberId = Number(id);
        return await this.prisma.user.update({
            data,
            where: {
                id: numberId
            }
        });
    }

    async delete(id: number): Promise<User> {
        const numberId = Number(id);
        return await this.prisma.user.delete({
            where: {
                id: numberId
            }
        });
    }
}
