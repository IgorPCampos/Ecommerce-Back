import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { User, Prisma } from "@prisma/client";
import { CreateUserDTO } from "./dto/create-user.dto";
import { AuthGuard } from "../utility/guards/auth.guard";
import { UpdateUserDTO } from "./dto/update-user.dto";

//@UseGuards(AuthGuard)
@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("email/:email")
    async findByEmail(@Param("email") email: string): Promise<User | null> {
        return this.userService.findByEmail(email);
    }

    @Get("id/:id")
    async findById(@Param("id") id: number): Promise<User | null> {
        return this.userService.findById(+id);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post()
    async create(@Body() data: CreateUserDTO): Promise<User> {
        return this.userService.create(data);
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() data: UpdateUserDTO): Promise<User> {
        return this.userService.update(+id, data);
    }

    @Delete(":id")
    async delete(@Param("id") id: number): Promise<User> {
        return this.userService.delete(+id);
    }
}
