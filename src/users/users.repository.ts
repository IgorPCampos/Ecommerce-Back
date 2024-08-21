import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User, Prisma } from "@prisma/client";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    async exists(id: number): Promise<boolean> {
        const count = await this.prisma.user.count({
            where: {
                id
            }
        });
        return count > 0;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: {
                email
            }
        });
    }

    async findById(id: number): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: {
                id
            }
        });
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data: {
                ...data
            }
        });
    }

    async update(id: number, data: UpdateUserDTO): Promise<User> {
        return this.prisma.user.update({
            data,
            where: {
                id
            }
        });
    }

    async delete(id: number): Promise<User> {
        return this.prisma.user.delete({
            where: {
                id
            }
        });
    }
}
