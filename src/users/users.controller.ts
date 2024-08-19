import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { User, Prisma } from "@prisma/client";
import { ParamId } from "../decorators/param-id.decorator";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(":email")
    async findByEmail(@Param("email") email: string): Promise<User | null> {
        return await this.userService.findByEmail(email);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Post()
    async create(@Body() data: Prisma.UserCreateInput): Promise<User> {
        return await this.userService.create(data);
    }

    @Put(":id")
    async update(@ParamId() id: number, @Body() data: Prisma.UserUpdateInput): Promise<User> {
        return await this.userService.update(id, data);
    }

    @Delete(":id")
    async delete(@ParamId() id: number): Promise<User> {
        return await this.userService.delete(id);
    }
}
