import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { User, Prisma } from "@prisma/client";
import { CreateUserDTO } from "./dto/create-user.dto";
import { AuthGuard } from "../utility/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("email/:email")
    async findByEmail(@Param("email") email: string): Promise<User | null> {
        return await this.userService.findByEmail(email);
    }

    @Get("id/:id")
    async findById(@Param("id") id: number): Promise<User | null> {
        return await this.userService.findById(+id);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Post()
    async create(@Body() data: CreateUserDTO): Promise<User> {
        return await this.userService.create(data);
    }

    @Put(":id")
    async update(@Param() id: number, @Body() data: Prisma.UserUpdateInput): Promise<User> {
        return await this.userService.update(+id, data);
    }

    @Delete(":id")
    async delete(@Param() id: number): Promise<User> {
        return await this.userService.delete(+id);
    }
}
