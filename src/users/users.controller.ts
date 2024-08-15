import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { User, Prisma } from "@prisma/client";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(":email")
    async findByEmail(@Param("email") email: string): Promise<User | null> {
        const user = await this.userService.findByEmail(email);
        return user;
    }

    @Get()
    async findAll(): Promise<User[]> {
        const users = await this.userService.findAll();
        return users;
    }

    @Post()
    async create(@Body() userData: Prisma.UserCreateInput): Promise<User> {
        const user = await this.userService.create(userData);
        return user;
    }
}
